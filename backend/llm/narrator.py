"""
LLM Narrator — the ONLY place in this backend where an AI model is used.

Strict rule followed throughout this project: the LLM never calculates or
decides anything. It only receives already-computed, already-verified
numbers and phrases them into a readable paragraph, in the same
bootstrap-first order the rest of the report follows: capital structuring
(what to do with current money) first, loan/scheme details last, as an
additional scaling option — never the other way round.

MULTILINGUAL NOTE: this is the ONE place where translation genuinely has
to happen live (the narrative text is different every time, depending on
the user's numbers, so it cannot be pre-translated like the static sector
data). If the API call fails for any reason, we fall back to a simple
templated sentence — pre-written in all 3 supported languages, so a
translation failure never silently reverts a Hindi/Marathi user to English.

LABEL LOCALIZATION NOTE: feasibility_engine.py and financial_engine.py are
deliberately kept as pure English-only deterministic logic (see their own
docstrings) — they always return exactly one of a small fixed set of
English labels ("High Potential" / "Moderate Potential" / "Caution" for
recommendation, "Micro Finance Scheme" / "Term Loan Scheme" for scheme
name). Left as-is, those raw English labels would get embedded verbatim
inside the LLM prompt below, and the model — correctly following the
instruction not to invent or change any fact — reproduces them verbatim
inside an otherwise Hindi/Marathi paragraph. RECOMMENDATION_LABELS and
SCHEME_NAME_LABELS below translate just those two fields, in a LOCAL COPY
of the input dicts, before they ever reach the prompt or the fallback
template. The original dicts passed in by main.py are never mutated, and
no number or calculation is touched — this is presentation-only.
"""

import os
from google import genai
from dotenv import load_dotenv

load_dotenv()  # reads backend/.env

API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-3.6-flash")

client = genai.Client(api_key=API_KEY) if API_KEY else None

LANGUAGE_NAMES = {"en": "English", "hi": "Hindi", "mr": "Marathi"}

# Mirrors frontend/src/translations.ts RECOMMENDATION_LABELS exactly —
# keep both in sync if feasibility_engine.py's RECOMMENDATION_BANDS labels
# ever change.
RECOMMENDATION_LABELS = {
    "High Potential": {"en": "High Potential", "hi": "उच्च संभावना", "mr": "उच्च क्षमता"},
    "Moderate Potential": {"en": "Moderate Potential", "hi": "मध्यम संभावना", "mr": "मध्यम क्षमता"},
    "Caution": {"en": "Caution", "hi": "सावधानी आवश्यक", "mr": "सावधगिरी आवश्यक"},
}

# Mirrors frontend/src/translations.ts SCHEME_NAME_LABELS exactly — keep
# both in sync if financial_engine.py's scheme names ever change.
SCHEME_NAME_LABELS = {
    "Micro Finance Scheme": {"en": "Micro Finance Scheme", "hi": "सूक्ष्म वित्त योजना", "mr": "सूक्ष्म वित्त योजना"},
    "Term Loan Scheme": {"en": "Term Loan Scheme", "hi": "टर्म लोन योजना", "mr": "मुदत कर्ज योजना"},
}


def _localize_label(labels: dict, value: str, language: str) -> str:
    """Looks up `value` in `labels`, falling back to the raw English value
    unchanged if it's not a recognized key or the language isn't found —
    so an unexpected label never crashes anything, it just stays English."""
    return labels.get(value, {}).get(language, value)


def _localized_copies(financial_plan: dict, feasibility_report: dict, language: str) -> tuple[dict, dict]:
    """Returns NEW dicts with recommendation/scheme_name localized, leaving
    the original dicts (and every number in them) completely untouched."""
    localized_feasibility = dict(feasibility_report)
    if "recommendation" in localized_feasibility:
        localized_feasibility["recommendation"] = _localize_label(
            RECOMMENDATION_LABELS, localized_feasibility["recommendation"], language
        )

    localized_financial = dict(financial_plan)
    if "scheme_name" in localized_financial:
        localized_financial["scheme_name"] = _localize_label(
            SCHEME_NAME_LABELS, localized_financial["scheme_name"], language
        )

    return localized_financial, localized_feasibility


def _build_prompt(financial_plan: dict, feasibility_report: dict, capital_structure: dict | None, profitability_outlook: dict, language: str) -> str:
    lang_name = LANGUAGE_NAMES.get(language, "English")
    return f"""
You are writing a short, plain-language explanation for a rural micro-entrepreneur
in India who is not familiar with financial jargon. You will be given ALREADY
COMPUTED data. Do not invent or change any number. Do not add facts not present
below.

Write your ENTIRE response in {lang_name}. Do not mix languages. Every label and
word in the data below is already provided in {lang_name} where applicable —
use it exactly as given, do not translate it back or substitute an English term.

Capital structuring plan (what to do with their OWN money right now): {capital_structure}
Feasibility report: {feasibility_report}
Profitability outlook: {profitability_outlook}
Financial plan / loan scheme details (an ADDITIONAL scaling option, not the primary path): {financial_plan}

Write EXACTLY 3 bullet points, one per line, each starting with "• " (a bullet
character followed by a space), with NOTHING else on the line — no intro
sentence before the first bullet, no closing sentence after the last one.
Each bullet should be 1-2 short sentences, warm and encouraging but honest
about risks. Cover, IN THIS EXACT ORDER, one bullet per point:
(1) What the capital structuring plan suggests they do RIGHT NOW with their own
    money — fixed capital, working capital, rolling reserve, and roughly when
    cash flow is expected to begin.
(2) The local feasibility score and what it means, plus the profitability
    outlook and any caution needed.
(3) LAST, framed explicitly as an ADDITIONAL option for scaling up later: the
    loan amount and scheme they are eligible for, if they choose to apply.

Do not lead with the loan or project cost. Do not use any bullet character
other than "•". Do not number the bullets. Output only the 3 bullet lines,
entirely in {lang_name}.
"""


_FALLBACK_TEMPLATES = {
    "en": (
        "• Right now, out of your Rs.{total:,.0f}, plan to spend Rs.{fixed:,.0f} on fixed assets and "
        "Rs.{working:,.0f} on working capital, keeping Rs.{rolling:,.0f} as a reserve.\n"
        "• This sector shows a feasibility score of {score}/100 ({recommendation}). {outlook}\n"
        "• As an additional option to scale up later, you are eligible for a loan of Rs.{loan:,.0f} "
        "under the {scheme}."
    ),
    "hi": (
        "• अभी, आपके कुल {total:,.0f} रुपये में से, स्थायी संपत्ति पर {fixed:,.0f} रुपये और "
        "कार्यशील पूंजी पर {working:,.0f} रुपये खर्च करने की योजना बनाएं, और {rolling:,.0f} रुपये "
        "आरक्षित निधि के रूप में रखें।\n"
        "• इस क्षेत्र का व्यवहार्यता स्कोर {score}/100 है ({recommendation})। {outlook}\n"
        "• बाद में विस्तार के लिए एक अतिरिक्त विकल्प के रूप में, आप {scheme} के तहत "
        "{loan:,.0f} रुपये के ऋण के पात्र हैं।"
    ),
    "mr": (
        "• सध्या, तुमच्या एकूण {total:,.0f} रुपयांपैकी, स्थिर मालमत्तेवर {fixed:,.0f} रुपये आणि "
        "खेळत्या भांडवलावर {working:,.0f} रुपये खर्च करण्याचे नियोजन करा, आणि {rolling:,.0f} रुपये "
        "राखीव निधी म्हणून ठेवा.\n"
        "• या क्षेत्राचा व्यवहार्यता गुणांक {score}/100 आहे ({recommendation}). {outlook}\n"
        "• नंतर विस्तारासाठी एक अतिरिक्त पर्याय म्हणून, तुम्ही {scheme} अंतर्गत "
        "{loan:,.0f} रुपयांच्या कर्जासाठी पात्र आहात."
    ),
}


def _fallback_narrative(financial_plan: dict, feasibility_report: dict, profitability_outlook: dict, capital_structure: dict | None, language: str) -> str:
    """Used only if the AI call fails — built from the same numbers, no AI
    needed, in the same bootstrap-first order, pre-written in all 3
    supported languages so it never silently falls back to English. Takes
    already-localized financial_plan/feasibility_report (see
    generate_narrative below) so {recommendation} and {scheme} interpolate
    correctly instead of leaving English words inside the sentence."""
    template = _FALLBACK_TEMPLATES.get(language, _FALLBACK_TEMPLATES["en"])
    cap = capital_structure or {}
    return template.format(
        total=cap.get("total_capital", 0),
        fixed=cap.get("fixed_capital_amount", 0),
        working=cap.get("working_capital_amount", 0),
        rolling=cap.get("rolling_capital_amount", 0),
        score=feasibility_report.get("score", 0),
        recommendation=feasibility_report.get("recommendation", ""),
        outlook=profitability_outlook.get("outlook_text", ""),
        loan=financial_plan.get("loan_amount", 0),
        scheme=financial_plan.get("scheme_name", ""),
    )


def generate_narrative(
    financial_plan: dict,
    feasibility_report: dict,
    profitability_outlook: dict,
    capital_structure: dict | None = None,
    language: str = "en",
) -> str:
    """Single entry point: returns a plain-language narrative paragraph in
    the requested language, always in bootstrap-first order regardless of
    whether the AI call succeeds or falls back."""
    localized_financial, localized_feasibility = _localized_copies(
        financial_plan, feasibility_report, language
    )

    if not client:
        return _fallback_narrative(localized_financial, localized_feasibility, profitability_outlook, capital_structure, language)

    try:
        prompt = _build_prompt(localized_financial, localized_feasibility, capital_structure, profitability_outlook, language)
        response = client.models.generate_content(model=MODEL_NAME, contents=prompt)
        return response.text.strip()
    except Exception as e:
        print(f"[narrator] LLM call failed, using fallback. Reason: {e}")
        return _fallback_narrative(localized_financial, localized_feasibility, profitability_outlook, capital_structure, language)


if __name__ == "__main__":
    sample_financial = {"project_cost": 1000000, "loan_amount": 900000, "scheme_name": "Term Loan Scheme"}
    sample_feasibility = {"score": 71.0, "recommendation": "Moderate Potential"}
    sample_outlook = {"outlook_text": "Cash flow stabilization may take 6-9 months."}
    sample_capital = {
        "total_capital": 100000,
        "fixed_capital_amount": 55000,
        "working_capital_amount": 30000,
        "rolling_capital_amount": 15000,
    }
    for lang in ["en", "hi", "mr"]:
        print(f"--- {lang} ---")
        print(generate_narrative(sample_financial, sample_feasibility, sample_outlook, sample_capital, language=lang))
        print()