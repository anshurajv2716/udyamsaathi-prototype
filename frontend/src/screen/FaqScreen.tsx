import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { AdvisoryResponse } from "../types";
import { type Language, getTranslation, getSectorName, getRecommendationLabel } from "../translations";
import { FAQ_ITEMS, type FaqContext } from "../faqData";

const INR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const cardStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E2DCC9",
  borderRadius: "10px",
  overflow: "hidden",
  marginBottom: "0.85rem",
};

interface FaqScreenProps {
  language: Language;
  sector: string;
  data: AdvisoryResponse;
}

export function FaqScreen({ language, sector, data }: FaqScreenProps) {
  const t = getTranslation(language);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const ctx: FaqContext = {
    sectorName: getSectorName(sector, language),
    totalCapital: INR(data.capital_structure_now.total_capital),
    fixedCapital: INR(data.capital_structure_now.fixed_capital_amount),
    workingCapital: INR(data.capital_structure_now.working_capital_amount),
    rollingCapital: INR(data.capital_structure_now.rolling_capital_amount),
    score: data.feasibility_report.score,
    recommendationLabel: getRecommendationLabel(data.feasibility_report.recommendation, language),
    moratoriumMonths: data.financial_plan.moratorium_months,
  };

  return (
    <section>
      <div style={{ ...cardStyle, padding: "1.25rem", marginBottom: "1.25rem" }}>
        <h3 style={{ marginTop: 0, fontFamily: "Lora, serif", color: "#2B2B22" }}>{t.faqTitle}</h3>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "#5C5A4C" }}>{t.faqSubtitle}</p>
      </div>

      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} style={cardStyle}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                padding: "1rem 1.25rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2F5233", flexShrink: 0, marginTop: "0.15rem" }}>
                Q{i + 1}
              </span>
              <span style={{ flex: 1, fontSize: "0.92rem", fontWeight: 600, color: "#2B2B22" }}>{item.question[language]}</span>
              <ChevronDown
                size={16}
                color="#9C9689"
                style={{
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.15s ease",
                }}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div style={{ padding: "0 1.25rem 1rem 2.75rem" }}>
                <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.6, color: "#2B2B22" }}>
                  {item.answer(ctx, language)}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}