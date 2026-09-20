"""
Bootstrap/Capital-Structuring Engine — additional module, not part of the
original PS modules but directly useful given the PS's own mention of
"working capital requirements" alongside the financial calculator.

Purpose: while the loan (financial_engine.py) is being processed — which
can take weeks or months — this engine tells the entrepreneur how to
structure the capital they ALREADY have, so they can start operating at a
smaller scale immediately rather than waiting idle for loan disbursal.

Like the other engines, this is pure deterministic math (percentages from
a data file), not AI. No new precision is invented: item lists are
descriptive guidance, not exact prices, because exact local prices vary
too much to state as fact.

MULTILINGUAL NOTE: text fields in capital_structuring.json (fixed_items,
working_items, rolling_items, cash_flow_note, notes) are stored as
{"en": ..., "hi": ..., "mr": ...} dictionaries — pre-translated ONCE and
saved as static content (not translated live per request). This function
picks the requested language and falls back to English if the requested
language key is somehow missing, so a malformed/incomplete translation can
never cause a crash.
"""

import json
from dataclasses import dataclass, field
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"


@dataclass
class CapitalStructure:
    sector: str
    total_capital: float
    fixed_capital_amount: float
    working_capital_amount: float
    rolling_capital_amount: float
    fixed_items: list[str] = field(default_factory=list)
    working_items: list[str] = field(default_factory=list)
    rolling_items: list[str] = field(default_factory=list)
    cash_flow_note: str = ""
    notes: str = ""
    evidence_tag: str = "expert_rule"


def _load_structuring_data() -> dict:
    file_path = DATA_DIR / "capital_structuring.json"
    if not file_path.exists():
        raise FileNotFoundError("capital_structuring.json not found in backend/data/")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


def _pick_language(value, language: str):
    """Given either a plain value or a {'en':..,'hi':..,'mr':..} dict,
    return the text/list in the requested language, falling back to
    English if the language key is missing."""
    if isinstance(value, dict):
        return value.get(language, value.get("en"))
    return value


def build_capital_structure(sector: str, total_capital: float, language: str = "en") -> CapitalStructure:
    """
    Single entry point: given a sector, a capital amount, and a language
    code ("en"/"hi"/"mr"), returns a breakdown of how to allocate the
    capital across fixed/working/rolling buckets, with item lists and
    notes in the requested language.
    """
    if total_capital <= 0:
        raise ValueError("Capital must be a positive number.")

    data = _load_structuring_data()
    if sector not in data:
        raise ValueError(
            f"Sector '{sector}' not found in capital structuring data. "
            f"Available sectors: {list(data.keys())}"
        )

    sector_data = data[sector]

    fixed_amount = round(total_capital * sector_data["fixed_capital_pct"], 2)
    working_amount = round(total_capital * sector_data["working_capital_pct"], 2)
    rolling_amount = round(total_capital * sector_data["rolling_capital_pct"], 2)

    return CapitalStructure(
        sector=sector,
        total_capital=total_capital,
        fixed_capital_amount=fixed_amount,
        working_capital_amount=working_amount,
        rolling_capital_amount=rolling_amount,
        fixed_items=_pick_language(sector_data.get("fixed_items", []), language),
        working_items=_pick_language(sector_data.get("working_items", []), language),
        rolling_items=_pick_language(sector_data.get("rolling_items", []), language),
        cash_flow_note=_pick_language(sector_data.get("cash_flow_note", ""), language),
        notes=_pick_language(sector_data.get("notes", ""), language),
        evidence_tag=sector_data.get("evidence_tag", "expert_rule"),
    )


if __name__ == "__main__":
    for lang in ["en", "hi", "mr"]:
        result = build_capital_structure("dairy", 100_000, language=lang)
        print(f"--- {lang} ---")
        print(f"Fixed: Rs.{result.fixed_capital_amount:,.0f} -> {result.fixed_items}")
        print(f"Cash flow note: {result.cash_flow_note[:60]}...")
        print()
        