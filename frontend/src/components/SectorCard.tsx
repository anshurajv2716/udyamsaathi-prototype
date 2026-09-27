import type { FeasibilityResult } from "../types";
import { EvidenceTag } from "./EvidenceTag";
import { type Language, getTranslation, getSectorName, getRecommendationLabel } from "../translations";
import { getSectorImage } from "../sectorImages";

interface SectorCardProps {
  result: FeasibilityResult;
  onSelect: (sector: string) => void;
  chooseLabel: string;
  language: Language;
}

const INR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

function badgeColor(recommendation: string) {
  if (recommendation === "High Potential") return { bg: "#E4EBDD", text: "#2F5233" };
  if (recommendation === "Moderate Potential") return { bg: "#F3E6C8", text: "#B8862B" };
  return { bg: "#F3DFD3", text: "#9B4A2B" };
}

export function SectorCard({ result, onSelect, chooseLabel, language }: SectorCardProps) {
  const t = getTranslation(language);
  const badge = badgeColor(result.recommendation);
  const sectorLabel = getSectorName(result.sector, language);
  const recommendationLabel = getRecommendationLabel(result.recommendation, language);
  const image = getSectorImage(result.sector);

  return (
    <div
      style={{
        border: "1px solid #E2DCC9",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Photo header — falls back to nothing (no gap) when a sector has no
          image yet, so poultry/agri_input_retail still render cleanly. */}
      {image && (
        <div style={{ position: "relative", height: "130px", overflow: "hidden" }}>
          <img
            src={image}
            alt={sectorLabel}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05))",
            }}
          />
          <h3
            style={{
              position: "absolute",
              bottom: "0.6rem",
              left: "0.9rem",
              margin: 0,
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#FFFFFF",
              textShadow: "0 1px 3px rgba(0,0,0,0.4)",
              textTransform: "capitalize",
            }}
          >
            {sectorLabel}
          </h3>
        </div>
      )}

      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem", flexGrow: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* When there's no photo, the sector name shows here instead —
              same as before this change. */}
          {!image && (
            <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, textTransform: "capitalize", color: "#1F2117" }}>
              {sectorLabel}
            </h3>
          )}
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              padding: "0.25rem 0.6rem",
              borderRadius: "999px",
              backgroundColor: badge.bg,
              color: badge.text,
              whiteSpace: "nowrap",
              marginLeft: image ? "auto" : 0,
            }}
          >
            {recommendationLabel}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
          <span style={{ fontSize: "2.1rem", fontWeight: 700, color: "#2F5233" }}>{result.score}</span>
          <span style={{ color: "#5C5A4C", fontSize: "0.9rem" }}>/ 100</span>
        </div>

        <p style={{ margin: 0, fontSize: "0.88rem", color: "#2B2B22", lineHeight: 1.55, flexGrow: 1 }}>
          {result.swot_notes}
        </p>

        <p style={{ margin: 0, fontSize: "0.85rem", color: "#5C5A4C", fontWeight: 500 }}>
          {t.typicalInvestmentLabel}: {INR(result.investment_range_min)} – {INR(result.investment_range_max)}
        </p>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <EvidenceTag evidenceTag={result.evidence_tag} language={language} />
          <button
            onClick={() => onSelect(result.sector)}
            style={{
              padding: "0.65rem",
              backgroundColor: "#2F5233",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {chooseLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

