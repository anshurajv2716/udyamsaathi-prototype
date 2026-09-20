"""
FastAPI backend — exposes the Financial Engine and Feasibility Engine over HTTP
so the React frontend can call them.

Run locally with:
    uvicorn main:app --reload --port 8000

Interactive docs auto-available at http://localhost:8000/docs
"""

import base64
import os
import re

import resend
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dataclasses import asdict

from engines.financial_engine import build_financial_plan
from engines.feasibility_engine import get_feasibility_report, compare_all_sectors
from engines.bootstrap_engine import build_capital_structure
from engines.profitability_outlook import get_profitability_outlook
from llm.narrator import generate_narrative

app = FastAPI(
    title="UdyamSaathi API",
    description="Hyper-local business advisory + financial structuring assistant (PS 26091)",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class FinancialPlanRequest(BaseModel):
    margin_capital: float = Field(..., gt=0, example=100000, description="Beneficiary's available margin capital in INR")


class AdvisoryRequest(BaseModel):
    district: str = Field(..., example="pune", description="Data key: 'pune' or 'ahmednagar'")
    sector: str = Field(..., example="dairy", description="One of: dairy, retail, tailoring")
    margin_capital: float = Field(..., gt=0, example=100000)
    language: str = Field("en", example="en", description="'en', 'hi', or 'mr'")


# ---------------------------------------------------------------------------
# Email export — sends the report as a PDF attachment via Resend.
#
# Deliberately does NOT regenerate the report server-side: the frontend
# already renders the exact same report the user sees on screen (via
# html2canvas + jsPDF in exportUtils.ts) for the existing PNG/PDF download
# buttons. This endpoint just relays that already-built PDF as an email
# attachment, so there is no second report-rendering code path to keep in
# sync with the real one.
# ---------------------------------------------------------------------------

class EmailReportRequest(BaseModel):
    email: str = Field(..., example="entrepreneur@example.com")
    pdf_base64: str = Field(..., description="Base64-encoded PDF bytes (no data-URI prefix)")
    filename: str = Field("UdyamSaathi_report", description="Attachment filename, without the .pdf extension")
    language: str = Field("en", example="en", description="'en', 'hi', or 'mr' — controls the email's subject/body only")


_EMAIL_REGEX = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

_EMAIL_SUBJECTS = {
    "en": "Your UdyamSaathi business advisory report",
    "hi": "आपकी उद्यमसाथी व्यवसाय सलाहकार रिपोर्ट",
    "mr": "तुमचा उद्यमसाथी व्यवसाय सल्ला अहवाल",
}
_EMAIL_BODIES = {
    "en": "<p>Hi,</p><p>Please find attached your UdyamSaathi business financial structuring report.</p>",
    "hi": "<p>नमस्ते,</p><p>कृपया संलग्न अपनी उद्यमसाथी व्यावसायिक वित्तीय संरचना रिपोर्ट देखें।</p>",
    "mr": "<p>नमस्कार,</p><p>कृपया संलग्न तुमचा उद्यमसाथी व्यवसाय आर्थिक संरचना अहवाल पहा.</p>",
}


@app.post("/send-report-email")
def send_report_email(payload: EmailReportRequest):
    """Emails the client-rendered report PDF as an attachment via Resend."""
    if not _EMAIL_REGEX.match(payload.email):
        raise HTTPException(status_code=400, detail="Invalid email address.")

    resend_api_key = os.getenv("RESEND_API_KEY")
    if not resend_api_key:
        raise HTTPException(status_code=500, detail="Email service is not configured on the server.")
    resend.api_key = resend_api_key

    try:
        pdf_bytes = base64.b64decode(payload.pdf_base64)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid PDF data.")

    lang = payload.language if payload.language in _EMAIL_SUBJECTS else "en"

    try:
        resend.Emails.send(
            {
                "from": os.getenv("EMAIL_FROM_ADDRESS", "UdyamSaathi <onboarding@resend.dev>"),
                "to": [payload.email],
                "subject": _EMAIL_SUBJECTS[lang],
                "html": _EMAIL_BODIES[lang],
                "attachments": [
                    {
                        "filename": f"{payload.filename}.pdf",
                        "content": list(pdf_bytes),
                        "content_type": "application/pdf",
                    }
                ],
            }
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to send email: {e}")

    return {"status": "sent"}


@app.get("/")
def health_check():
    return {"status": "ok", "service": "UdyamSaathi API"}


@app.post("/financial-plan")
def financial_plan(payload: FinancialPlanRequest):
    """Deterministic financial structuring: project cost, loan, scheme, EMI schedule."""
    try:
        plan = build_financial_plan(payload.margin_capital)
        return asdict(plan)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/feasibility-report")
def feasibility_report(district: str, sector: str, language: str = "en"):
    """Single-sector feasibility score + reasoning for a given district."""
    try:
        result = get_feasibility_report(district, sector, language)
        return asdict(result)
    except (FileNotFoundError, ValueError) as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/feasibility-compare")
def feasibility_compare(district: str, language: str = "en"):
    """All sectors in a district, ranked best-to-worst — for the 'which business is best here' view."""
    try:
        results = compare_all_sectors(district, language)
        return [asdict(r) for r in results]
    except FileNotFoundError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/capital-structure")
def capital_structure(sector: str, capital: float, language: str = "en"):
    """
    Standalone endpoint: breaks any given capital amount into fixed/working/
    rolling buckets with sector-specific example line items.
    """
    try:
        result = build_capital_structure(sector, capital, language)
        return asdict(result)
    except (ValueError, FileNotFoundError) as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/advisory-report")
def advisory_report(payload: AdvisoryRequest):
    """
    Combined endpoint. Returns, in the order the frontend should present them:

    1. capital_structure_now — how to allocate the user's CURRENT margin
       capital (fixed/working/rolling), for use while a loan is pending.
    2. sources_and_uses — Sources (margin capital + eligible loan) vs Uses
       (full-scale fixed/working/rolling allocation).
    3. feasibility_report — local opportunity score and reasoning.
    4. profitability_outlook — qualitative, score-band-based outlook.
    5. financial_plan — the MSME loan/scheme details, an ADDITIONAL option.
    6. narrative — AI-generated plain-language summary, bootstrap-first order.

    All text content respects payload.language ("en"/"hi"/"mr") — sector
    notes and capital-structuring text come from pre-translated static data,
    the narrative is generated live by the LLM in the requested language.
    """
    try:
        fin_plan = build_financial_plan(payload.margin_capital)
        feas_result = get_feasibility_report(payload.district, payload.sector, payload.language)
        outlook = get_profitability_outlook(feas_result.recommendation, payload.language)
        capital_structure_now = build_capital_structure(payload.sector, payload.margin_capital, payload.language)
        full_scale_structure = build_capital_structure(payload.sector, fin_plan.project_cost, payload.language)
    except (ValueError, FileNotFoundError) as e:
        raise HTTPException(status_code=400, detail=str(e))

    fin_plan_dict = asdict(fin_plan)
    feas_result_dict = asdict(feas_result)
    outlook_dict = asdict(outlook)
    capital_now_dict = asdict(capital_structure_now)
    full_scale_dict = asdict(full_scale_structure)

    sources_and_uses = {
        "sources": {
            "own_margin_capital": fin_plan_dict["margin_capital"],
            "eligible_loan_amount": fin_plan_dict["loan_amount"],
            "total": fin_plan_dict["margin_capital"] + fin_plan_dict["loan_amount"],
        },
        "uses": {
            "fixed_capital": full_scale_dict["fixed_capital_amount"],
            "working_capital": full_scale_dict["working_capital_amount"],
            "rolling_capital": full_scale_dict["rolling_capital_amount"],
            "total": (
                full_scale_dict["fixed_capital_amount"]
                + full_scale_dict["working_capital_amount"]
                + full_scale_dict["rolling_capital_amount"]
            ),
        },
        "evidence_tag": "expert_rule",
    }

    narrative = generate_narrative(
        financial_plan=fin_plan_dict,
        feasibility_report=feas_result_dict,
        profitability_outlook=outlook_dict,
        capital_structure=capital_now_dict,
        language=payload.language,
    )

    return {
        "capital_structure_now": capital_now_dict,
        "sources_and_uses": sources_and_uses,
        "feasibility_report": feas_result_dict,
        "profitability_outlook": outlook_dict,
        "financial_plan": fin_plan_dict,
        "narrative": narrative,
    }