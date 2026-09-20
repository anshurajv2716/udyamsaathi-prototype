"""
Financial Engine — Module 2 of PS 26091.

Everything in this file is PURE DETERMINISTIC MATH. No AI, no external calls,
no randomness. This is intentional: loan eligibility and scheme routing must
be 100% reproducible and auditable — the same input always gives the same
output. This is the part of the system you should point to when someone
asks "how do you make sure the AI isn't making up financial numbers?"
The answer: the AI never touches this file at all.
"""

from dataclasses import dataclass, field
from typing import Literal

# --- Scheme rules, taken directly from the PS 26091 problem statement text ---

MARGIN_CONTRIBUTION_RATIO = 0.10   # beneficiary must contribute 10% of project cost
LOAN_SHARE_RATIO = 0.90            # scheme covers 90% of project cost

MICRO_FINANCE_MAX_PROJECT_COST = 140_000       # ₹1.40 lakh
MICRO_FINANCE_MAX_LOAN = 125_000               # ₹1.25 lakh cap
MICRO_FINANCE_INTEREST_RATE = 0.065            # 6.5% per annum
MICRO_FINANCE_TENURE_YEARS = 3
MICRO_FINANCE_MORATORIUM_MONTHS = 3

TERM_LOAN_MAX_PROJECT_COST = 5_000_000         # ₹50 lakh
TERM_LOAN_MAX_LOAN = 4_500_000                 # ₹45 lakh cap
TERM_LOAN_INTEREST_RATE = 0.08                 # 8% per annum
TERM_LOAN_TENURE_YEARS = 7
TERM_LOAN_MORATORIUM_MONTHS = 6

SchemeName = Literal["Micro Finance Scheme", "Term Loan Scheme"]


@dataclass
class InstallmentRow:
    period_number: int
    period_label: str          # e.g. "Q1", "Q2"...
    is_moratorium: bool
    opening_balance: float
    interest_component: float
    principal_component: float
    installment_amount: float
    closing_balance: float


@dataclass
class FinancialPlan:
    margin_capital: float
    project_cost: float
    loan_amount: float
    scheme_name: SchemeName
    interest_rate: float
    tenure_years: int
    moratorium_months: int
    quarterly_schedule: list[InstallmentRow] = field(default_factory=list)
    evidence_tag: str = "direct_data"  # this whole block is deterministic PS-defined math
    notes: str = ""


def compute_project_cost(margin_capital: float) -> float:
    """Project cost = beneficiary's margin capital / 10%.
    Example: ₹1,00,000 margin -> ₹10,00,000 project cost."""
    if margin_capital <= 0:
        raise ValueError("Margin capital must be a positive number.")
    return round(margin_capital / MARGIN_CONTRIBUTION_RATIO, 2)


def compute_loan_amount(project_cost: float, scheme_name: SchemeName) -> float:
    """Loan = 90% of project cost, capped at the scheme's maximum."""
    raw_loan = round(project_cost * LOAN_SHARE_RATIO, 2)
    cap = MICRO_FINANCE_MAX_LOAN if scheme_name == "Micro Finance Scheme" else TERM_LOAN_MAX_LOAN
    return min(raw_loan, cap)


def route_scheme(project_cost: float) -> SchemeName:
    """Routes to the correct scheme purely based on project cost thresholds
    from the problem statement. No AI involved."""
    if project_cost <= MICRO_FINANCE_MAX_PROJECT_COST:
        return "Micro Finance Scheme"
    elif project_cost <= TERM_LOAN_MAX_PROJECT_COST:
        return "Term Loan Scheme"
    else:
        raise ValueError(
            f"Project cost ₹{project_cost:,.0f} exceeds the maximum supported "
            f"project cost of ₹{TERM_LOAN_MAX_PROJECT_COST:,.0f} for these schemes."
        )


def _scheme_terms(scheme_name: SchemeName):
    if scheme_name == "Micro Finance Scheme":
        return (
            MICRO_FINANCE_INTEREST_RATE,
            MICRO_FINANCE_TENURE_YEARS,
            MICRO_FINANCE_MORATORIUM_MONTHS,
        )
    return (
        TERM_LOAN_INTEREST_RATE,
        TERM_LOAN_TENURE_YEARS,
        TERM_LOAN_MORATORIUM_MONTHS,
    )


def generate_quarterly_schedule(
    loan_amount: float, interest_rate: float, tenure_years: int, moratorium_months: int
) -> list[InstallmentRow]:
    """
    Generates a quarterly repayment schedule.

    During the moratorium period: only interest may accrue (no principal
    repayment demanded), which is standard for these scheme structures.
    After moratorium: equal-principal quarterly installments plus interest
    on the reducing balance (simple reducing-balance method — easy to
    explain and audit, which matters more here than exotic amortization math).
    """
    quarters_total = tenure_years * 4
    moratorium_quarters = round(moratorium_months / 3)
    repayment_quarters = quarters_total - moratorium_quarters

    if repayment_quarters <= 0:
        raise ValueError("Moratorium period cannot exceed total tenure.")

    quarterly_rate = interest_rate / 4
    principal_per_quarter = round(loan_amount / repayment_quarters, 2)

    schedule: list[InstallmentRow] = []
    balance = loan_amount

    for q in range(1, quarters_total + 1):
        interest_amt = round(balance * quarterly_rate, 2)
        if q <= moratorium_quarters:
            installment = interest_amt
            principal_amt = 0.0
            closing = balance
            is_moratorium = True
        else:
            principal_amt = principal_per_quarter
            installment = round(principal_amt + interest_amt, 2)
            closing = round(balance - principal_amt, 2)
            is_moratorium = False

        schedule.append(
            InstallmentRow(
                period_number=q,
                period_label=f"Q{q}",
                is_moratorium=is_moratorium,
                opening_balance=round(balance, 2),
                interest_component=interest_amt,
                principal_component=principal_amt,
                installment_amount=installment,
                closing_balance=max(closing, 0.0),
            )
        )
        balance = closing

    return schedule


def build_financial_plan(margin_capital: float) -> FinancialPlan:
    """Single entry point: given margin capital, returns the full financial plan."""
    project_cost = compute_project_cost(margin_capital)
    scheme_name = route_scheme(project_cost)
    loan_amount = compute_loan_amount(project_cost, scheme_name)
    interest_rate, tenure_years, moratorium_months = _scheme_terms(scheme_name)
    schedule = generate_quarterly_schedule(
        loan_amount, interest_rate, tenure_years, moratorium_months
    )

    return FinancialPlan(
        margin_capital=margin_capital,
        project_cost=project_cost,
        loan_amount=loan_amount,
        scheme_name=scheme_name,
        interest_rate=interest_rate,
        tenure_years=tenure_years,
        moratorium_months=moratorium_months,
        quarterly_schedule=schedule,
        notes=(
            f"Deterministic calculation per PS 26091 scheme rules: "
            f"{MARGIN_CONTRIBUTION_RATIO*100:.0f}% margin -> "
            f"{LOAN_SHARE_RATIO*100:.0f}% loan share, routed by project cost threshold."
        ),
    )


if __name__ == "__main__":
    plan = build_financial_plan(margin_capital=100_000)
    print(f"Scheme: {plan.scheme_name}")
    print(f"Project cost: ₹{plan.project_cost:,.0f}")
    print(f"Loan amount: ₹{plan.loan_amount:,.0f}")
    print(f"Interest rate: {plan.interest_rate*100}% | Tenure: {plan.tenure_years} yrs | "
          f"Moratorium: {plan.moratorium_months} months")
    print("\nFirst 4 quarters of schedule:")
    for row in plan.quarterly_schedule[:4]:
        print(row)