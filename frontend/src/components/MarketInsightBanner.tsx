import { Newspaper } from "lucide-react";
import { type Language, getTranslation } from "../translations";
import { MARKET_INSIGHTS } from "../marketInsights";

interface MarketInsightBannerProps {
  sector: string;
  language: Language;
}

export function MarketInsightBanner({ sector, language }: MarketInsightBannerProps) {
  const t = getTranslation(language);
  const insight = MARKET_INSIGHTS[sector];
  if (!insight) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        padding: "1rem",
        borderRadius: "10px",
        backgroundColor: "#EAF3EA",
        border: "1px solid #C8D8C0",
        marginBottom: "1.25rem",
      }}
    >
      <Newspaper size={20} color="#2F5233" style={{ flexShrink: 0, marginTop: "0.15rem" }} aria-hidden="true" />
      <div>
        <p style={{ margin: "0 0 0.3rem", fontSize: "0.78rem", fontWeight: 700, color: "#2F5233" }}>
          {t.marketInsightTitle}
        </p>
        <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.55, color: "#1F2117" }}>
          {insight.text[language]}
        </p>
        {insight.confidence === "low" && (
          <p style={{ margin: "0.4rem 0 0", fontSize: "0.72rem", color: "#8B6914", fontStyle: "italic" }}>
            {t.marketInsightLowConfidenceNote}
          </p>
        )}
      </div>
    </div>
  );
}