import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  Building2,
  RefreshCw,
  ArrowRightLeft,
  Lightbulb,
  ClipboardList,
  Wallet,
  Coins,
  MapPin,
  TrendingUp,
  Landmark,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DISTRICTS, type AdvisoryResponse } from "../types";
import { getAdvisoryReport } from "../api";
import { ErrorBanner } from "../components/ErrorBanner";
import { EvidenceTag } from "../components/EvidenceTag";
import { CapitalSplitChart } from "../components/CapitalSplitChart";
import { EMIScheduleChart } from "../components/EMIScheduleChart";
import { ExportMenu } from "../components/ExportMenu";
import { GovernmentSchemes } from "../components/GovernmentSchemes";
import { SwotPanel } from "../components/SwotPanel";
import { FactorBandGrid } from "../components/FactorBandGrid";
import { ReportTabs, type ReportTab } from "../components/ReportTabs";
import { FaqScreen } from "./FaqScreen";
import { ProfitabilityTimeline } from "../components/ProfitabilityTimeline";
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

// ---------------------------------------------------------------------
// Shared card shell. Same white-card-on-cream look as before, now with an
// icon + colored left accent per section so the Advisory tab matches the
// visual polish already on the Govt Schemes tab. Purely presentational —
// no data or prop changes below this point.
// ---------------------------------------------------------------------
interface ReportCardProps {
  icon: LucideIcon;
  accent: string;
  title: string;
  tint?: string;
  children: ReactNode;
}

function ReportCard({ icon: Icon, accent, title, tint, children }: ReportCardProps) {
  return (
    <section
      style={{
        marginBottom: "1.25rem",
        padding: "1.25rem",
        backgroundColor: tint ?? "#FFFFFF",
        border: "1px solid #E2DCC9",
        borderLeft: `4px solid ${accent}`,
        borderRadius: "10px",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: "0.85rem",
          display: "flex",
          alignItems: "center",
          gap: "0.55rem",
          fontFamily: "Lora, serif",
          color: "#2B2B22",
        }}
      >
        <Icon size={20} color={accent} aria-hidden="true" style={{ flexShrink: 0 }} />
        <span>{title}</span>
      </h3>
      {children}
    </section>
  );
}

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
  const [activeTab, setActiveTab] = useState<ReportTab>("advisory");
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

  // Looks up the full display label ("Pune (Rural Talukas)") for the raw
  // district key ("pune") that's stored in state — falls back to the raw
  // key itself if it's ever not found in DISTRICTS, so this never crashes.
  const districtLabel = DISTRICTS.find((d) => d.key === district)?.label ?? district;

  return (
    <div style={{ maxWidth: "740px", margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#5C5A4C", cursor: "pointer", marginBottom: "1rem", padding: 0 }}>
        {t.backButton}
      </button>

      {loading && <p>{t.generatingReport}</p>}
      {error && <ErrorBanner message={error} onRetry={loadReport} />}

      {data && (
        <div style={{ backgroundColor: "#F6F2E9", padding: "0.5rem" }}>
          <ReportTabs activeTab={activeTab} onChange={setActiveTab} language={language} />

          {activeTab === "advisory" && (
            <div ref={reportRef}>
              <h2 style={{ fontFamily: "Lora, serif", color: "#2B2B22", lineHeight: 1.3, marginBottom: "1.5rem" }}>
                {t.reportTitle}
              </h2>

              <ExportMenu reportRef={reportRef} filename={`UdyamSaathi_${sector}_report`} language={language} />

              <ReportCard icon={Lightbulb} accent="#B8862B" title={t.whatThisMeans}>
                <ul style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.6, color: "#2B2B22" }}>
                  {splitNarrativeIntoBullets(data.narrative).map((line, i) => (
                    <li key={i} style={{ marginBottom: "0.5rem" }}>{line}</li>
                  ))}
                </ul>
              </ReportCard>

              <ReportCard icon={ClipboardList} accent="#5C5A4C" title={t.yourInputs}>
                <p>{t.districtLine}: <strong>{districtLabel}</strong></p>
                <p>{t.businessTypeLine}: <strong style={{ textTransform: "capitalize" }}>{getSectorName(sector, language)}</strong></p>
                <p>{t.availableCapitalLine}: <strong>{INR(capital)}</strong></p>
              </ReportCard>

              <ReportCard icon={Wallet} accent="#2F5233" title={t.financialPosition}>
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
              </ReportCard>

              {/* Unified Fixed / Working / Cash-flow card keeps its own three
                  icon-colored columns, as before — left border stays neutral
                  since three different accent colors already live inside. */}
              <ReportCard icon={RefreshCw} accent="#9C9689" title={t.howToUseCapitalTitle}>
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
              </ReportCard>

              <ReportCard icon={Coins} accent="#6366F1" title={t.sourcesAndUses}>
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
              </ReportCard>

              {/* Local Feasibility card: FactorBandGrid (the quick-glance
                  4-box qualitative grid — Market Demand / Competition /
                  Logistics / Seasonality Risk) sits above SwotPanel (the
                  deeper Strengths/Weaknesses/Opportunities/Threats
                  breakdown) — both draw from the same 4 scoring factors,
                  shown at two levels of detail, not as a replacement for
                  one another. Requires backend/engines/feasibility_engine.py
                  to return factor_bands (Phase 6) and types.ts's
                  FeasibilityResult to declare that field. */}
              <ReportCard icon={MapPin} accent="#2563EB" title={`${t.localFeasibility} — ${getSectorName(data.feasibility_report.sector, language)}`}>
                <p>{t.scoreLabel}: <strong>{data.feasibility_report.score} / 100</strong> ({getRecommendationLabel(data.feasibility_report.recommendation, language)})</p>
                <p>{data.feasibility_report.swot_notes}</p>
                <FactorBandGrid factorBands={data.feasibility_report.factor_bands} language={language} />
                <SwotPanel swot={data.feasibility_report.swot} language={language} />
                <div style={{ marginTop: "0.75rem" }}>
                  <EvidenceTag evidenceTag={data.feasibility_report.evidence_tag} language={language} />
                </div>
              </ReportCard>

              <ReportCard icon={TrendingUp} accent="#2F5233" tint="#EAF3EA" title={t.profitabilityOutlook}>
                <p style={{ fontWeight: 600, color: "#2F5233" }}>{data.profitability_outlook.typical_stabilization_window}</p>
                <ProfitabilityTimeline stages={data.profitability_outlook.stages} />
                <p style={{ fontSize: "0.8rem", color: "#5C5A4C", fontStyle: "italic" }}>{data.profitability_outlook.disclaimer}</p>
                <EvidenceTag evidenceTag={data.profitability_outlook.evidence_tag} language={language} />
              </ReportCard>

              <ReportCard icon={Landmark} accent="#9B4A2B" title={t.additionalLoanOption}>
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
              </ReportCard>
            </div>
          )}

          {activeTab === "schemes" && (
            <div>
              <GovernmentSchemes language={language} sector={sector} />
              <section style={{ padding: "1rem", backgroundColor: "#F3E6C8", borderRadius: "8px", fontSize: "0.88rem", color: "#5C5A4C" }}>
                <strong>{t.exploreSchemesTitle}</strong> {t.exploreSchemesText}
              </section>
            </div>
          )}

          {activeTab === "faq" && <FaqScreen language={language} sector={sector} data={data} />}
        </div>
      )}
    </div>
  );
}
