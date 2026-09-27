import { Sprout, Users, Truck, CloudSun } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Language } from "../translations";

// The 4 scoring factors, in fixed display order (matches the Figma
// reference: Market Demand, Competition, Logistics, Seasonality Risk).
// "band" is the raw strong/moderate/weak classification from the backend's
// new factor_bands field — this file only maps that to a display word and
// an icon, it never re-derives the classification itself.
type Band = "strong" | "moderate" | "weak";

interface FactorSpec {
  key: string;
  icon: LucideIcon;
  label: Record<Language, string>;
  // Per-factor display words, because "strong" means something different
  // (and isn't always "good") depending on the factor: strong demand is
  // good ("High"), strong competition is a caution ("High" competition),
  // strong logistics is good ("Good"), strong seasonality risk is a
  // caution ("High" risk). The words themselves are neutral level
  // descriptors — color coding (not done here) is what signals good/bad.
  words: Record<Band, Record<Language, string>>;
}

const FACTORS: FactorSpec[] = [
  {
    key: "demand_proxy",
    icon: Sprout,
    label: { en: "Market Demand", hi: "बाज़ार मांग", mr: "बाजार मागणी" },
    words: {
      strong: { en: "High", hi: "उच्च", mr: "उच्च" },
      moderate: { en: "Moderate", hi: "मध्यम", mr: "मध्यम" },
      weak: { en: "Low", hi: "कम", mr: "कमी" },
    },
  },
  {
    key: "competition_proxy",
    icon: Users,
    label: { en: "Competition", hi: "प्रतिस्पर्धा", mr: "स्पर्धा" },
    words: {
      strong: { en: "High", hi: "उच्च", mr: "उच्च" },
      moderate: { en: "Moderate", hi: "मध्यम", mr: "मध्यम" },
      weak: { en: "Low", hi: "कम", mr: "कमी" },
    },
  },
  {
    key: "logistics_access",
    icon: Truck,
    label: { en: "Logistics", hi: "लॉजिस्टिक्स", mr: "लॉजिस्टिक्स" },
    words: {
      strong: { en: "Good", hi: "अच्छी", mr: "चांगली" },
      moderate: { en: "Moderate", hi: "मध्यम", mr: "मध्यम" },
      weak: { en: "Limited", hi: "सीमित", mr: "मर्यादित" },
    },
  },
  {
    key: "seasonality_risk",
    icon: CloudSun,
    label: { en: "Seasonality Risk", hi: "मौसमी जोखिम", mr: "हंगामी जोखीम" },
    words: {
      strong: { en: "High", hi: "उच्च", mr: "उच्च" },
      moderate: { en: "Moderate", hi: "मध्यम", mr: "मध्यम" },
      weak: { en: "Low", hi: "कम", mr: "कमी" },
    },
  },
];

// Whether "strong" is good or bad news differs by factor — used only to
// pick a subtle text color, never to hide or alter what's shown.
const STRONG_IS_GOOD: Record<string, boolean> = {
  demand_proxy: true,
  competition_proxy: false,
  logistics_access: true,
  seasonality_risk: false,
};

function bandColor(factorKey: string, band: Band): string {
  if (band === "moderate") return "#B8862B";
  const goodWhenStrong = STRONG_IS_GOOD[factorKey];
  const isGood = band === "strong" ? goodWhenStrong : !goodWhenStrong;
  return isGood ? "#2F5233" : "#9B4A2B";
}

interface FactorBandGridProps {
  factorBands: Record<string, string>;
  language: Language;
}

export function FactorBandGrid({ factorBands, language }: FactorBandGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "0.75rem",
        marginTop: "0.75rem",
        marginBottom: "0.75rem",
      }}
    >
      {FACTORS.map(({ key, icon: Icon, label, words }) => {
        const band = (factorBands[key] as Band) ?? "moderate";
        const color = bandColor(key, band);
        return (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.65rem 0.75rem",
              backgroundColor: "#FAF7F0",
              border: "1px solid #E2DCC9",
              borderRadius: "8px",
            }}
          >
            <Icon size={18} color="#5C5A4C" aria-hidden="true" style={{ flexShrink: 0 }} />
            <div>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#5C5A4C" }}>{label[language]}</p>
              <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700, color }}>
                {words[band][language]}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
