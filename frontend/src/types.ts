// Shared TypeScript types used across the whole frontend.
// Every component/screen imports from here instead of redefining these
// shapes — keeps the data structure consistent everywhere.

export interface InstallmentRow {
  period_number: number;
  period_label: string;
  is_moratorium: boolean;
  opening_balance: number;
  interest_component: number;
  principal_component: number;
  installment_amount: number;
  closing_balance: number;
}

export interface FinancialPlan {
  margin_capital: number;
  project_cost: number;
  loan_amount: number;
  scheme_name: string;
  interest_rate: number;
  tenure_years: number;
  moratorium_months: number;
  quarterly_schedule: InstallmentRow[];
  evidence_tag: string;
  notes: string;
}

export interface FeasibilityResult {
  district: string;
  sector: string;
  score: number;
  recommendation: string;
  investment_range_min: number;
  investment_range_max: number;
  factor_breakdown: Record<string, number>;
  strongest_factor: string;
  weakest_factor: string;
  swot_notes: string;
  evidence_tag: string;
}

export interface ProfitabilityOutlook {
  recommendation: string;
  outlook_text: string;
  typical_stabilization_window: string;
  evidence_tag: string;
  disclaimer: string;
}

export interface CapitalStructure {
  sector: string;
  total_capital: number;
  fixed_capital_amount: number;
  working_capital_amount: number;
  rolling_capital_amount: number;
  fixed_items: string[];
  working_items: string[];
  rolling_items: string[];
  cash_flow_note: string;
  notes: string;
  evidence_tag: string;
}

export interface SourcesAndUses {
  sources: {
    own_margin_capital: number;
    eligible_loan_amount: number;
    total: number;
  };
  uses: {
    fixed_capital: number;
    working_capital: number;
    rolling_capital: number;
    total: number;
  };
  evidence_tag: string;
}

export interface AdvisoryResponse {
  capital_structure_now: CapitalStructure;
  sources_and_uses: SourcesAndUses;
  feasibility_report: FeasibilityResult;
  profitability_outlook: ProfitabilityOutlook;
  financial_plan: FinancialPlan;
  narrative: string;
}

// The districts we currently support — matches the .json files in
// backend/data/. If you add a new district file, add it here too.
export const DISTRICTS = [
  { key: "pune", label: "Pune (Rural Talukas)" },
  { key: "ahmednagar", label: "Ahmednagar" },
];