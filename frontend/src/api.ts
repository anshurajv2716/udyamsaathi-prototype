import type { AdvisoryResponse, FeasibilityResult } from "./types";
import type { Language } from "./translations";

const API_BASE = "http://localhost:8000";

export async function getSectorBuffet(district: string, language: Language = "en"): Promise<FeasibilityResult[]> {
  const res = await fetch(`${API_BASE}/feasibility-compare?district=${district}&language=${language}`);
  if (!res.ok) {
    throw new Error("Could not load business options for this district.");
  }
  return res.json();
}

export async function getAdvisoryReport(
  district: string,
  sector: string,
  marginCapital: number,
  language: Language = "en"
): Promise<AdvisoryResponse> {
  const res = await fetch(`${API_BASE}/advisory-report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      district,
      sector,
      margin_capital: marginCapital,
      language,
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Could not generate the advisory report.");
  }
  return res.json();
}