"""
Feasibility Engine — Module 1 of PS 26091.

This engine is a TRANSPARENT WEIGHTED FORMULA, not a machine-learning model.
That is a deliberate choice: every score this produces can be explained by
pointing at the exact numbers that went into it (from the district JSON
files). No black box. If a judge asks "why did dairy score 82 and tailoring
score 61," this file has the answer in plain arithmetic.

It reads from backend/data/<district>.json — so the quality of the score is
entirely a function of the quality of that dataset. Improving this feature
later mostly means improving the data files, not rewriting this code.

MULTILINGUAL NOTE: each sector's "notes" field is English by default, with
optional "notes_hi" / "notes_mr" sibling fields holding pre-translated
Hindi/Marathi versions. This function picks the requested language and
falls back to the English "notes" field if a translated version doesn't
exist for that sector, so a missing translation can never cause a crash —
it just silently shows English for that one field.
"""

import json
from dataclasses import dataclass, field
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"

WEIGHTS = {
    "demand_proxy": 0.35,
    "competition_proxy": 0.25,
    "seasonality_risk": 0.15,
    "logistics_access": 0.25,
}

RECOMMENDATION_BANDS = [
    (75, 100, "High Potential"),
    (50, 74, "Moderate Potential"),
    (0, 49, "Caution"),
]


@dataclass
class FeasibilityResult:
    district: str
    sector: str
    score: float
    recommendation: str
    investment_range_min: float = 0.0
    investment_range_max: float = 0.0
    factor_breakdown: dict = field(default_factory=dict)
    strongest_factor: str = ""
    weakest_factor: str = ""
    swot_notes: str = ""
    evidence_tag: str = "expert_rule"


def _load_district_data(district_key: str) -> dict:
    file_path = DATA_DIR / f"{district_key}.json"
    if not file_path.exists():
        raise FileNotFoundError(
            f"No data file found for district '{district_key}'. "
            f"Available files: {[f.stem for f in DATA_DIR.glob('*.json')]}"
        )
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


def _classify(score: float) -> str:
    for low, high, label in RECOMMENDATION_BANDS:
        if low <= score <= high:
            return label
    return "Caution"


def _pick_notes(sector_data: dict, language: str) -> str:
    """Returns notes_hi/notes_mr if present and requested, else falls back
    to the base English 'notes' field."""
    if language == "hi" and "notes_hi" in sector_data:
        return sector_data["notes_hi"]
    if language == "mr" and "notes_mr" in sector_data:
        return sector_data["notes_mr"]
    return sector_data.get("notes", "")


def compute_sector_score(sector_data: dict) -> tuple[float, dict]:
    demand = sector_data["demand_proxy"]
    competition = sector_data["competition_proxy"]
    seasonality = sector_data["seasonality_risk"]
    logistics = sector_data["logistics_access"]

    contributions = {
        "demand_proxy": demand * WEIGHTS["demand_proxy"],
        "competition_proxy": (100 - competition) * WEIGHTS["competition_proxy"],
        "seasonality_risk": (100 - seasonality) * WEIGHTS["seasonality_risk"],
        "logistics_access": logistics * WEIGHTS["logistics_access"],
    }

    total_score = round(sum(contributions.values()), 1)
    return total_score, contributions


def get_feasibility_report(district_key: str, sector: str, language: str = "en") -> FeasibilityResult:
    """Single entry point: given a district key, a sector name, and a
    language code ("en"/"hi"/"mr"), returns the full feasibility result
    with swot_notes in the requested language."""
    data = _load_district_data(district_key)

    if sector not in data["sectors"]:
        raise ValueError(
            f"Sector '{sector}' not found for district '{district_key}'. "
            f"Available sectors: {list(data['sectors'].keys())}"
        )

    sector_data = data["sectors"][sector]
    score, contributions = compute_sector_score(sector_data)

    strongest = max(contributions, key=contributions.get)
    weakest = min(contributions, key=contributions.get)

    return FeasibilityResult(
        district=data["district"],
        sector=sector,
        score=score,
        recommendation=_classify(score),
        investment_range_min=sector_data.get("investment_range_min", 0.0),
        investment_range_max=sector_data.get("investment_range_max", 0.0),
        factor_breakdown=contributions,
        strongest_factor=strongest,
        weakest_factor=weakest,
        swot_notes=_pick_notes(sector_data, language),
        evidence_tag=sector_data.get("evidence_tag", "expert_rule"),
    )


def compare_all_sectors(district_key: str, language: str = "en") -> list[FeasibilityResult]:
    """Returns feasibility results for every sector in a district, sorted
    best-to-worst — this powers the 'top businesses for you' style view."""
    data = _load_district_data(district_key)
    results = [
        get_feasibility_report(district_key, sector, language) for sector in data["sectors"]
    ]
    return sorted(results, key=lambda r: r.score, reverse=True)


if __name__ == "__main__":
    for lang in ["en", "hi", "mr"]:
        print(f"=== {lang}: Pune, Dairy ===")
        result = get_feasibility_report("pune", "dairy", language=lang)
        print(f"Score: {result.score} -> {result.recommendation}")
        print(f"Notes: {result.swot_notes[:70]}...")
        print()