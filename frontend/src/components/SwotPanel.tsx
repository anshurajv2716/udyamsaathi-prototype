import type { SwotPanel as SwotPanelData, SwotItem } from "../types";
import { EvidenceTag } from "./EvidenceTag";
import type { Language } from "../translations";

interface Props {
  swot: SwotPanelData;
  language: Language;
}

const QUADRANT_LABELS: Record<keyof SwotPanelData, Record<Language, string>> = {
  strengths: { en: "Strengths", hi: "मजबूती", mr: "बलस्थाने" },
  weaknesses: { en: "Weaknesses", hi: "कमजोरियाँ", mr: "कमकुवत बाजू" },
  opportunities: { en: "Opportunities", hi: "अवसर", mr: "संधी" },
  threats: { en: "Threats", hi: "खतरे", mr: "धोके" },
};

const QUADRANT_COLORS: Record<keyof SwotPanelData, string> = {
  strengths: "#2F5233",
  opportunities: "#B8862B",
  weaknesses: "#9B4A2B",
  threats: "#8B3A3A",
};

const EMPTY_TEXT: Record<Language, string> = {
  en: "No clear signal here",
  hi: "यहाँ कोई स्पष्ट संकेत नहीं",
  mr: "इथे स्पष्ट संकेत नाही",
};

export function SwotPanel({ swot, language }: Props) {
  const quadrants: (keyof SwotPanelData)[] = ["strengths", "weaknesses", "opportunities", "threats"];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      {quadrants.map((key) => {
        const items: SwotItem[] = swot[key];
        const color = QUADRANT_COLORS[key];
        return (
          <div
            key={key}
            style={{
              border: `1px solid ${color}33`,
              borderLeft: `4px solid ${color}`,
              borderRadius: "8px",
              padding: "0.85rem 1rem",
              backgroundColor: `${color}0D`,
            }}
          >
            <p style={{ fontWeight: 600, color, margin: "0 0 0.5rem" }}>
              {QUADRANT_LABELS[key][language]}
            </p>
            {items.length === 0 ? (
              <p style={{ fontSize: "0.82rem", color: "#5C5A4C", fontStyle: "italic", margin: 0 }}>
                {EMPTY_TEXT[language]}
              </p>
            ) : (
              <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.85rem", lineHeight: 1.5 }}>
                {items.map((item, i) => (
                  <li key={i} style={{ marginBottom: "0.4rem" }}>
                    {item.text}{" "}
                    <EvidenceTag evidenceTag={item.evidence_tag} language={language} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}