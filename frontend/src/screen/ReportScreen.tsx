
import { useEffect, useRef, useState } from "react";
import { Building2, RefreshCw, ArrowRightLeft } from "lucide-react";
import type { AdvisoryResponse } from "../types";
import { getAdvisoryReport } from "../api";
import { ErrorBanner } from "../components/ErrorBanner";
import { EvidenceTag } from "../components/EvidenceTag";
import { CapitalSplitChart } from "../components/CapitalSplitChart";
import { EMIScheduleChart } from "../components/EMIScheduleChart";
import { ExportMenu } from "../components/ExportMenu";
import { type Language, getTranslation, getSectorName, getRecommendationLabel, getSchemeName } from "../translations";

interface ReportScreenProps {
  district: string;
  sector: string;
  capital: number;
  onBack: () => void;
  language: Language;
}

const INR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const sectionStyle: React.CSSProperties = {
  marginBottom: "2rem",
  padding: "1.25rem",
  backgroundColor: "#FFFFFF",
  border: "1px solid #E2DCC9",
  borderRadius: "10px",
};

const headingStyle: React.CSSProperties = { marginTop: 0, fontFamily: "Lora, serif", color: "#2B2B22" };

// Splits the Gemini narrative into bullet points for display. Handles
// three shapes gracefully: (1) narrator.py's new bullet-per-line output
// ("• sentence\n• sentence..."), (2) a plain paragraph with no bullet
// markers (falls back to showing it as a single bullet, still renders
// fine), (3) sentences separated only by ". " (splits those into
// separate bullets too, as an extra safety net for the AI path where the
// model might not follow the bullet-per-line instruction exactly).
function splitNarrativeIntoBullets(narrative: string): string[] {
  const lines = narrative
    .split("\n")
    .map((l) => l.replace(/^[•\-*]\s*/, "").trim())
    .filter(Boolean);
  if (lines.length > 1) return lines;

  // No newlines came back — try splitting the single paragraph on sentence
  // boundaries so it still reads as bullets rather than one dense block.
  const sentences = narrative
    .split(/(?<=[.!?।])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return sentences.length > 1 ? sentences : [narrative];
}

export function ReportScreen({ district, sector, capital, onBack, language }: ReportScreenProps) {
  const t = getTranslation(language);
  const [data, setData] = useState<AdvisoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  function loadReport() {
    setLoading(true);
    setError(null);
    getAdvisoryReport(district, sector, capital, language)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district, sector, capital, language]);

  return (
    <div style={{ maxWidth: "740px", margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#5C5A4C", cursor: "pointer", marginBottom: "1rem", padding: 0 }}>
        {t.backButton}
      </button>

      {loading && <p>{t.generatingReport}</p>}
      {error && <ErrorBanner message={error} onRetry={loadReport} />}

      {data && (
        <div ref={reportRef} style={{ backgroundColor: "#F6F2E9", padding: "0.5rem" }}>
          <h2 style={{ fontFamily: "Lora, serif", color: "#2B2B22", lineHeight: 1.3, marginBottom: "1.5rem" }}>
            {t.reportTitle}
          </h2>

          <ExportMenu reportRef={reportRef} filename={`UdyamSaathi_${sector}_report`} language={language} />

          <section style={sectionStyle}>
            <h3 style={headingStyle}>{t.whatThisMeans}</h3>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.6, color: "#2B2B22" }}>
              {splitNarrativeIntoBullets(data.narrative).map((line, i) => (
                <li key={i} style={{ marginBottom: "0.5rem" }}>{line}</li>
              ))}
            </ul>
          </section>

          <section style={sectionStyle}>
            <h3 style={headingStyle}>{t.yourInputs}</h3>
            <p>{t.districtLine}: <strong>{district}</strong></p>
            <p>{t.businessTypeLine}: <strong style={{ textTransform: "capitalize" }}>{getSectorName(sector, language)}</strong></p>
            <p>{t.availableCapitalLine}: <strong>{INR(capital)}</strong></p>
          </section>

          <section style={sectionStyle}>
            <h3 style={headingStyle}>{t.financialPosition}</h3>
            <p>
              {t.rollingReserveText
                .replace("{total}", INR(data.capital_structure_now.total_capital))
                .replace("{rolling}", INR(data.capital_structure_now.rolling_capital_amount))}
            </p>
            <CapitalSplitChart
              fixedAmount={data.capital_structure_now.fixed_capital_amount}
              workingAmount={data.capital_structure_now.working_capital_amount}
              rollingAmount={data.capital_structure_now.rolling_capital_amount}
              language={language}
            />
            <ul style={{ marginTop: "0.5rem" }}>
              {data.capital_structure_now.rolling_items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Unified Fixed Capital / Working Capital / Cash Flow Cycle card —
              previously three separate near-identical boxes; now one card,
              three columns, with an icon anchoring each column. */}
          <section style={sectionStyle}>
            <h3 style={headingStyle}>{t.howToUseCapitalTitle}</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1.5rem",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Building2 size={26} color="#2F5233" aria-hidden="true" style={{ marginBottom: "0.5rem" }} />
                <p style={{ fontWeight: 600, margin: "0 0 0.2rem" }}>{t.fixedCapitalLegend}</p>
                <p style={{ fontSize: "1.15rem", fontWeight: 700, color: "#2F5233", margin: "0 0 0.3rem" }}>
                  {INR(data.capital_structure_now.fixed_capital_amount)}
                </p>
                <p style={{ fontSize: "0.78rem", color: "#5C5A4C", marginBottom: "0.5rem" }}>{t.oneTimeAssetPurchases}</p>
                <ul style={{ textAlign: "left", fontSize: "0.85rem", margin: 0, paddingLeft: "1.1rem" }}>
                  {data.capital_structure_now.fixed_items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ textAlign: "center" }}>
                <RefreshCw size={26} color="#B8862B" aria-hidden="true" style={{ marginBottom: "0.5rem" }} />
                <p style={{ fontWeight: 600, margin: "0 0 0.2rem" }}>{t.workingCapitalLegend}</p>
                <p style={{ fontSize: "1.15rem", fontWeight: 700, color: "#B8862B", margin: "0 0 0.3rem" }}>
                  {INR(data.capital_structure_now.working_capital_amount)}
                </p>
                <p style={{ fontSize: "0.78rem", color: "#5C5A4C", marginBottom: "0.5rem" }}>{t.recurringRunningCosts}</p>
                <ul style={{ textAlign: "left", fontSize: "0.85rem", margin: 0, paddingLeft: "1.1rem" }}>
                  {data.capital_structure_now.working_items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ textAlign: "center" }}>
                <ArrowRightLeft size={26} color="#9B4A2B" aria-hidden="true" style={{ marginBottom: "0.5rem" }} />
                <p style={{ fontWeight: 600, margin: "0 0 0.2rem" }}>{t.cashFlowCycle}</p>
                <p style={{ fontSize: "0.85rem", color: "#2B2B22", lineHeight: 1.55, textAlign: "left" }}>
                  {data.capital_structure_now.cash_flow_note}
                </p>
              </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <EvidenceTag evidenceTag={data.capital_structure_now.evidence_tag} language={language} />
            </div>
          </section>

          <section style={sectionStyle}>
            <h3 style={headingStyle}>{t.sourcesAndUses}</h3>
            <p style={{ fontSize: "0.85rem", color: "#5C5A4C", marginBottom: "1rem" }}>
              {t.sourcesAndUsesSubtext}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div>
                <p style={{ fontWeight: 600, marginBottom: "0.4rem" }}>{t.sources}</p>
                <p>{t.sourcesOwnCapitalLabel}: {INR(data.sources_and_uses.sources.own_margin_capital)}</p>
                <p>{t.sourcesLoanLabel}: {INR(data.sources_and_uses.sources.eligible_loan_amount)}</p>
                <p style={{ fontWeight: 600 }}>{t.total}: {INR(data.sources_and_uses.sources.total)}</p>
              </div>
              <div>
                <p style={{ fontWeight: 600, marginBottom: "0.4rem" }}>{t.uses}</p>
                <p>{t.fixedCapitalLegend}: {INR(data.sources_and_uses.uses.fixed_capital)}</p>
                <p>{t.workingCapitalLegend}: {INR(data.sources_and_uses.uses.working_capital)}</p>
                <p>{t.rollingCapitalLegend}: {INR(data.sources_and_uses.uses.rolling_capital)}</p>
                <p style={{ fontWeight: 600 }}>{t.total}: {INR(data.sources_and_uses.uses.total)}</p>
              </div>
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <EvidenceTag evidenceTag={data.sources_and_uses.evidence_tag} language={language} />
            </div>
          </section>

          <section style={sectionStyle}>
            <h3 style={headingStyle}>{t.localFeasibility} — {getSectorName(data.feasibility_report.sector, language)}</h3>
            <p>{t.scoreLabel}: <strong>{data.feasibility_report.score} / 100</strong> ({getRecommendationLabel(data.feasibility_report.recommendation, language)})</p>
            <p>{data.feasibility_report.swot_notes}</p>
            <EvidenceTag evidenceTag={data.feasibility_report.evidence_tag} language={language} />
          </section>

          {/* Fixed: this used to share the exact same background color as the
              page behind it (#F6F2E9), so the card visually disappeared. Now
              a distinct light-green tint + left accent border. */}
          <section style={{ ...sectionStyle, backgroundColor: "#EAF3EA", borderLeft: "4px solid #2F5233" }}>
            <h3 style={headingStyle}>{t.profitabilityOutlook}</h3>
            <p style={{ fontWeight: 600, color: "#2F5233" }}>{data.profitability_outlook.typical_stabilization_window}</p>
            <p style={{ lineHeight: 1.6, color: "#1F2117" }}>{data.profitability_outlook.outlook_text}</p>
            <p style={{ fontSize: "0.8rem", color: "#5C5A4C", fontStyle: "italic" }}>{data.profitability_outlook.disclaimer}</p>
            <EvidenceTag evidenceTag={data.profitability_outlook.evidence_tag} language={language} />
          </section>

          <section style={sectionStyle}>
            <h3 style={headingStyle}>{t.additionalLoanOption}</h3>
            <p style={{ fontSize: "0.88rem", color: "#5C5A4C", marginBottom: "0.75rem" }}>
              {t.additionalLoanIntro}
            </p>
            <p>{t.projectCostLabel}: <strong>{INR(data.financial_plan.project_cost)}</strong></p>
            <p>{t.loanAmountLabel}: <strong>{INR(data.financial_plan.loan_amount)}</strong></p>
            <p>{t.schemeLabel}: <strong>{getSchemeName(data.financial_plan.scheme_name, language)}</strong></p>
            <p>{t.interestRateLabel}: <strong>{(data.financial_plan.interest_rate * 100).toFixed(1)}% p.a.</strong></p>
            <p>{t.tenureLabel}: <strong>{data.financial_plan.tenure_years} years</strong> | {t.moratoriumLabel}: <strong>{data.financial_plan.moratorium_months} months</strong></p>
            <p style={{ fontSize: "0.85rem", color: "#5C5A4C" }}>
              {t.maxEligibleNote}
            </p>
            <EMIScheduleChart schedule={data.financial_plan.quarterly_schedule} language={language} />
            <EvidenceTag evidenceTag={data.financial_plan.evidence_tag} language={language} />
          </section>

          <section style={{ padding: "1rem", backgroundColor: "#F3E6C8", borderRadius: "8px", fontSize: "0.88rem", color: "#5C5A4C" }}>
            <strong>{t.exploreSchemesTitle}</strong> {t.exploreSchemesText}
          </section>
        </div>
      )}
    </div>
  );
}
