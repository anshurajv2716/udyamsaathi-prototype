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

SWOT PANEL: the same four scoring factors (demand_proxy, competition_proxy,
seasonality_risk, logistics_access) are reused to build a structured
strengths/weaknesses/opportunities/threats panel — no new inputs, no new
data pipeline.

Only 2 factors feed each quadrant-pair (demand_proxy + logistics_access ->
Strengths/Weaknesses; competition_proxy + seasonality_risk ->
Opportunities/Threats), and each factor lands in exactly one quadrant of
its pair. That means whenever both factors in a pair happen to agree —
both land "strong", or both land "favourable" — the opposite quadrant
mathematically gets zero contributions from the scoring factors. Which
quadrant goes empty varies sector to sector, depending on that sector's
own numbers; it isn't the same quadrant every time.

GENERIC FALLBACK (Option A): rather than ever showing a quadrant with
nothing in it, any quadrant that ends up empty after the factor loop gets
exactly one clearly-labelled generic line — tagged evidence_tag=
"generic_note", NOT "expert_rule" or "direct_data" — so the frontend and
the person reading the report can always tell a data-driven bullet apart
from a generic one. This keeps the "every line traces to a real signal"
honesty the rest of this engine is built on: nothing pretends to be
sector-specific insight that it isn't.

Every bullet — factor-driven or generic fallback — carries its own
evidence_tag so the frontend's existing EvidenceTag component can render
it with no new UI work.

THREATS (standalone): `FeasibilityResult.threats` is just an alias for
`swot["threats"]` — same list, no duplicated logic — so the API can expose
it directly without the frontend needing to unpack the full panel.

STRUCTURAL THREATS (optional): some threats aren't visible in the four
numeric factors at all — e.g. "dairy farmers are price-takers under the
cooperative." If a district JSON sector adds a "structural_threats" list
(plain strings, or {"text":..., "evidence_tag":...} dicts), those get
folded into the same threats list before the empty-quadrant check runs —
so a sector with a structural threat defined never triggers the generic
fallback for Threats; only sectors with neither a factor-driven threat nor
a structural one do.

COMPETITOR MAPPING (deliberately NOT in this file): point 5 of Module 1
needs real establishment-density data per sector/district, which doesn't
exist in the current JSON schema and the dataset isn't ready yet. When it
lands, it slots in as its own function reading an optional data field,
same pattern as structural_threats.

MULTILINGUAL NOTE: the short "notes" blurb (English by default, optional
notes_hi/notes_mr siblings) is unchanged and still feeds the Screen 2
buffet card. Every other piece of SWOT text — factor bullets AND the
generic fallback lines — follows the same fallback rule: pick the
requested language's template, fall back to English if that language's
phrasing isn't defined, so a missing translation can never crash the
report, it just silently shows English for that one bullet.

FACTOR BANDS (added — Phase 6 prep for the qualitative feasibility grid):
build_swot() already classifies each of the 4 factors into a band
("strong" / "moderate" / "weak") internally, via _band(), purely to pick
which SWOT quadrant and text template to use — but it never returned that
classification itself. compute_factor_bands() below reuses the exact same
_band() calls and FACTOR_CONFIG thresholds to expose that classification
directly, so the frontend can render a plain "Market Demand: High /
Competition: Moderate / ..." style grid without re-deriving the bands
itself. This is read-only and additive: it doesn't change build_swot(),
compute_sector_score(), or anything already working — it just exposes a
classification that was already being computed, unused, every single call.

Deliberately NOT exposed as raw 0-100 numbers for this purpose: the
existing `factor_breakdown` field holds each factor's WEIGHTED CONTRIBUTION
to the total score (e.g. demand_proxy's contribution maxes at 100 * 0.35 =
35, since its weight is 0.35, while seasonality_risk's maxes at 100 * 0.15
= 15). Those weighted numbers are not comparable to each other on a flat
0-100 scale, so a frontend threshold applied directly to factor_breakdown
would misclassify factors with different weights. factor_bands solves this
by returning the already-correct classification instead of a number the
frontend would have to (mis)interpret itself.
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

# --- SWOT panel config -----------------------------------------------------

# Each factor: strong/weak thresholds, which quadrant "moderate" values
# fold into (moderate_quadrant), and per-language text for all three bands.
FACTOR_CONFIG = {
    "demand_proxy": {
        "strong_quadrant": "strengths",
        "weak_quadrant": "weaknesses",
        "moderate_quadrant": "weaknesses",
        "strong_threshold": 65,
        "weak_threshold": 40,
        "text": {
            "strong": {
                "en": "Strong, steady local demand for {sector}.",
                "hi": "{sector} के लिए स्थानीय मांग मजबूत और स्थिर है।",
                "mr": "{sector} साठी स्थानिक मागणी मजबूत आणि स्थिर आहे.",
            },
            "moderate": {
                "en": "Demand for {sector} is moderate — steady but not exceptional; validate locally before scaling up fully.",
                "hi": "{sector} की मांग मध्यम है — स्थिर लेकिन असाधारण नहीं; पूरी पूंजी लगाने से पहले स्थानीय स्तर पर पुष्टि करें।",
                "mr": "{sector} ची मागणी मध्यम आहे — स्थिर पण असाधारण नाही; पूर्ण भांडवल गुंतवण्यापूर्वी स्थानिक पातळीवर पडताळणी करा.",
            },
            "weak": {
                "en": "Local demand for {sector} looks limited based on current indicators.",
                "hi": "मौजूदा संकेतकों के अनुसार {sector} की स्थानीय मांग सीमित दिखाई देती है।",
                "mr": "सध्याच्या निर्देशकांनुसार {sector} साठी स्थानिक मागणी मर्यादित दिसते.",
            },
        },
    },
    "logistics_access": {
        "strong_quadrant": "strengths",
        "weak_quadrant": "weaknesses",
        "moderate_quadrant": "weaknesses",
        "strong_threshold": 65,
        "weak_threshold": 40,
        "text": {
            "strong": {
                "en": "Good road/market connectivity — easy to move inputs in and goods out.",
                "hi": "अच्छी सड़क/बाज़ार कनेक्टिविटी — सामग्री लाना और माल भेजना आसान।",
                "mr": "चांगली रस्ता/बाजार जोडणी — साहित्य आणणे आणि माल पाठवणे सोपे.",
            },
            "moderate": {
                "en": "Road/market connectivity is workable but not ideal — factor in some delay or extra transport cost.",
                "hi": "सड़क/बाज़ार कनेक्टिविटी ठीक है पर आदर्श नहीं — कुछ देरी या अतिरिक्त परिवहन लागत का ध्यान रखें।",
                "mr": "रस्ता/बाजार जोडणी ठीक आहे पण आदर्श नाही — काही विलंब किंवा अतिरिक्त वाहतूक खर्च गृहीत धरा.",
            },
            "weak": {
                "en": "Limited logistics/connectivity could slow down supply and distribution.",
                "hi": "सीमित लॉजिस्टिक्स/कनेक्टिविटी आपूर्ति और वितरण को धीमा कर सकती है।",
                "mr": "मर्यादित लॉजिस्टिक्स/जोडणीमुळे पुरवठा आणि वितरण मंदावू शकते.",
            },
        },
    },
    "competition_proxy": {
        "strong_quadrant": "threats",
        "weak_quadrant": "opportunities",
        "moderate_quadrant": "threats",
        "strong_threshold": 60,
        "weak_threshold": 45,
        "text": {
            "strong": {
                "en": "Several existing {sector} businesses already operate in this area — expect direct competition.",
                "hi": "इस क्षेत्र में पहले से ही कई {sector} व्यवसाय काम कर रहे हैं — सीधी प्रतिस्पर्धा की उम्मीद करें।",
                "mr": "या भागात आधीच अनेक {sector} व्यवसाय कार्यरत आहेत — थेट स्पर्धेची अपेक्षा ठेवा.",
            },
            "moderate": {
                "en": "Moderate competition from existing {sector} businesses in the area — worth watching, though not a dealbreaker.",
                "hi": "क्षेत्र में मौजूदा {sector} व्यवसायों से मध्यम प्रतिस्पर्धा — ध्यान देने योग्य, लेकिन बाधा नहीं।",
                "mr": "भागातील विद्यमान {sector} व्यवसायांकडून मध्यम स्पर्धा — लक्ष ठेवण्यासारखे, पण अडथळा नाही.",
            },
            "weak": {
                "en": "Few existing {sector} businesses nearby — room to capture market share early.",
                "hi": "आस-पास बहुत कम {sector} व्यवसाय हैं — जल्दी बाज़ार हिस्सेदारी हासिल करने का मौका।",
                "mr": "जवळपास {sector} व्यवसाय फार कमी आहेत — लवकर बाजारातील वाटा मिळवण्याची संधी.",
            },
        },
    },
    "seasonality_risk": {
        "strong_quadrant": "threats",
        "weak_quadrant": "opportunities",
        "moderate_quadrant": "threats",
        "strong_threshold": 60,
        "weak_threshold": 45,
        "text": {
            "strong": {
                "en": "Demand for {sector} swings sharply by season — plan cash flow for lean months.",
                "hi": "{sector} की मांग मौसम के अनुसार तेज़ी से बदलती है — कमज़ोर महीनों के लिए नकदी प्रवाह की योजना बनाएं।",
                "mr": "{sector} ची मागणी हंगामानुसार झपाट्याने बदलते — कमी उत्पन्नाच्या महिन्यांसाठी रोख प्रवाहाचे नियोजन करा.",
            },
            "moderate": {
                "en": "Demand for {sector} shifts somewhat by season — keep a small buffer for slower months.",
                "hi": "{sector} की मांग मौसम के साथ थोड़ी बदलती है — धीमे महीनों के लिए थोड़ा बफर रखें।",
                "mr": "{sector} ची मागणी हंगामानुसार थोडी बदलते — मंद महिन्यांसाठी थोडा बफर ठेवा.",
            },
            "weak": {
                "en": "Demand for {sector} stays fairly stable across the year, easing cash-flow planning.",
                "hi": "{sector} की मांग पूरे वर्ष काफी स्थिर रहती है, जिससे नकदी प्रवाह की योजना आसान हो जाती है।",
                "mr": "{sector} ची मागणी वर्षभर बऱ्यापैकी स्थिर राहते, ज्यामुळे रोख प्रवाह नियोजन सोपे होते.",
            },
        },
    },
}

# --- Option A: generic fallback lines --------------------------------------
# Used ONLY when a quadrant ends up with zero entries after the factor loop
# (and, for threats, zero structural_threats too). Tagged "generic_note" so
# it is always visually/semantically distinguishable from a data-driven
# bullet — never disguised as sector-specific insight.
GENERIC_FALLBACK_EVIDENCE_TAG = "generic_note"

GENERIC_FALLBACK_TEXT = {
    "strengths": {
        "en": "No standout strength beyond the general feasibility score for {sector} in this area.",
        "hi": "इस क्षेत्र में {sector} के लिए सामान्य व्यवहार्यता स्कोर के अलावा कोई विशेष मजबूती सामने नहीं आई।",
        "mr": "या भागात {sector} साठी सामान्य व्यवहार्यता स्कोअर व्यतिरिक्त कोणतीही विशेष बलस्थान दिसून आली नाही.",
    },
    "weaknesses": {
        "en": "No specific weakness stood out in current data for {sector}; usual early-stage risks (customer acquisition, learning curve) still apply.",
        "hi": "{sector} के लिए मौजूदा आंकड़ों में कोई विशेष कमज़ोरी सामने नहीं आई; शुरुआती दौर के सामान्य जोखिम (ग्राहक जुटाना, सीखने की प्रक्रिया) फिर भी लागू होते हैं।",
        "mr": "{sector} साठी सध्याच्या आकडेवारीत कोणतीही विशिष्ट कमकुवत बाजू दिसून आली नाही; सुरुवातीच्या टप्प्यातील सामान्य जोखीम (ग्राहक मिळवणे, शिकण्याची प्रक्रिया) तरीही लागू होतात.",
    },
    "opportunities": {
        "en": "No distinct edge stood out beyond the general feasibility score for {sector} in this area.",
        "hi": "इस क्षेत्र में {sector} के लिए सामान्य व्यवहार्यता स्कोर के अलावा कोई विशेष अवसर सामने नहीं आया।",
        "mr": "या भागात {sector} साठी सामान्य व्यवहार्यता स्कोअर व्यतिरिक्त कोणतीही विशेष संधी दिसून आली नाही.",
    },
    "threats": {
        "en": "No specific threat stood out in current data for {sector}; usual market risks (demand shifts, new entrants) still apply.",
        "hi": "{sector} के लिए मौजूदा आंकड़ों में कोई विशेष खतरा सामने नहीं आया; सामान्य बाज़ार जोखिम (मांग में बदलाव, नए प्रतिस्पर्धी) फिर भी लागू होते हैं।",
        "mr": "{sector} साठी सध्याच्या आकडेवारीत कोणताही विशिष्ट धोका दिसून आला नाही; सामान्य बाजार जोखीम (मागणीतील बदल, नवीन स्पर्धक) तरीही लागू होतात.",
    },
}


@dataclass
class FeasibilityResult:
    district: str
    sector: str
    score: float
    recommendation: str
    investment_range_min: float = 0.0
    investment_range_max: float = 0.0
    factor_breakdown: dict = field(default_factory=dict)
    factor_bands: dict = field(default_factory=dict)  # NEW — see docstring
    strongest_factor: str = ""
    weakest_factor: str = ""
    swot_notes: str = ""  # short multilingual blurb — unchanged, still feeds the Screen 2 card
    swot: dict = field(default_factory=dict)  # {strengths, weaknesses, opportunities, threats}
    threats: list = field(default_factory=list)  # alias for swot["threats"], for direct API access
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


def _band(value: float, strong_threshold: float, weak_threshold: float) -> str:
    if value >= strong_threshold:
        return "strong"
    if value <= weak_threshold:
        return "weak"
    return "moderate"


def _pick_template(text_templates: dict, language: str) -> str:
    """Same fallback rule as _pick_notes: requested language if defined,
    else English, so a missing translation never crashes the report."""
    return text_templates.get(language, text_templates["en"])


def _structural_threat_text(item, language: str) -> str:
    """Structural threats are plain domain facts supplied by the dataset
    team. A dict item may carry per-language text (text_hi/text_mr) using
    the same sibling-field convention as notes_hi/notes_mr; a plain string
    has no translation available and is shown as-is in any language."""
    if isinstance(item, str):
        return item
    key = f"text_{language}" if language in ("hi", "mr") else "text"
    return item.get(key, item.get("text", ""))


def compute_factor_bands(sector_data: dict) -> dict:
    """
    NEW (Phase 6 prep). Returns {factor_name: "strong"|"moderate"|"weak"}
    for all 4 scoring factors, using the exact same _band() logic and
    FACTOR_CONFIG thresholds that build_swot() already uses internally —
    just returned directly instead of being consumed only to pick SWOT
    text. Read-only: does not touch sector_data, does not change any
    existing function's behavior.

    "strong"/"moderate"/"weak" are directionally raw — e.g. for
    competition_proxy and seasonality_risk, "strong" means a HIGH value
    (more competition / more seasonal swing), which is unfavourable, not
    favourable. Translating this raw band into a display word appropriate
    for that specific factor (e.g. "High" for demand vs "Good" for
    logistics) is presentation logic and belongs in the frontend
    translation layer, not here — this function's job is only to expose
    the correct underlying classification.
    """
    return {
        factor: _band(sector_data[factor], cfg["strong_threshold"], cfg["weak_threshold"])
        for factor, cfg in FACTOR_CONFIG.items()
    }


def build_swot(sector_data: dict, sector: str, language: str = "en") -> dict:
    """
    Builds the structured, language-aware SWOT panel from the same four
    factors that drive the feasibility score. Every bullet carries its own
    evidence_tag so the frontend can render it with the existing
    EvidenceTag component. After the factor loop and structural threats
    are folded in, ANY quadrant still empty gets exactly one generic
    fallback line (evidence_tag="generic_note") — so no quadrant in any
    sector, in any language, ever renders blank.
    """
    swot = {"strengths": [], "weaknesses": [], "opportunities": [], "threats": []}
    evidence_tag = sector_data.get("evidence_tag", "expert_rule")
    display_name = sector_data.get("display_name", sector.replace("_", " ").title())

    for factor, cfg in FACTOR_CONFIG.items():
        value = sector_data[factor]
        band = _band(value, cfg["strong_threshold"], cfg["weak_threshold"])

        if band == "moderate":
            quadrant = cfg["moderate_quadrant"]
            text_key = "moderate"
        else:
            quadrant = cfg["strong_quadrant"] if band == "strong" else cfg["weak_quadrant"]
            text_key = band

        template = _pick_template(cfg["text"][text_key], language)
        swot[quadrant].append({
            "text": template.format(sector=display_name),
            "evidence_tag": evidence_tag,
            "factor": factor,
        })

    # Optional dataset-supplied structural threats — domain facts that
    # aren't visible in the four scoring factors (e.g. single-buyer
    # dependency). Missing field = skipped, never crashes.
    for item in sector_data.get("structural_threats", []):
        text = _structural_threat_text(item, language)
        if not text:
            continue
        swot["threats"].append({
            "text": text,
            "evidence_tag": item.get("evidence_tag", evidence_tag) if isinstance(item, dict) else evidence_tag,
            "factor": "structural",
        })

    # Option A: guarantee every quadrant has at least one line.
    for quadrant, items in swot.items():
        if items:
            continue
        fallback_template = _pick_template(GENERIC_FALLBACK_TEXT[quadrant], language)
        swot[quadrant].append({
            "text": fallback_template.format(sector=display_name),
            "evidence_tag": GENERIC_FALLBACK_EVIDENCE_TAG,
            "factor": "none",
        })

    return swot


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
    including the structured, language-aware, always-populated SWOT panel,
    standalone threats list, and per-factor qualitative bands."""
    data = _load_district_data(district_key)

    if sector not in data["sectors"]:
        raise ValueError(
            f"Sector '{sector}' not found for district '{district_key}'. "
            f"Available sectors: {list(data['sectors'].keys())}"
        )

    sector_data = data["sectors"][sector]
    score, contributions = compute_sector_score(sector_data)
    swot = build_swot(sector_data, sector, language)
    factor_bands = compute_factor_bands(sector_data)

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
        factor_bands=factor_bands,
        strongest_factor=strongest,
        weakest_factor=weakest,
        swot_notes=_pick_notes(sector_data, language),
        swot=swot,
        threats=swot["threats"],
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
    data = _load_district_data("pune")
    for sector in data["sectors"]:
        result = get_feasibility_report("pune", sector, language="en")
        empty_check = [q for q, items in result.swot.items() if not items]
        print(f"{sector}: score={result.score}  empty_quadrants={empty_check or 'none'}  bands={result.factor_bands}")