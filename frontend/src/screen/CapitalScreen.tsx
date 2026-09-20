import { useState } from "react";
import { type Language, getTranslation, getSectorName } from "../translations";

interface CapitalScreenProps {
  sector: string;
  onSubmit: (capital: number) => void;
  onBack: () => void;
  language: Language;
}

export function CapitalScreen({ sector, onSubmit, onBack, language }: CapitalScreenProps) {
  const t = getTranslation(language);
  const [capital, setCapital] = useState("100000");

  return (
    <div style={{ maxWidth: "420px", margin: "0 auto" }}>
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", color: "#5C5A4C", cursor: "pointer", marginBottom: "1rem", padding: 0 }}
      >
        {t.backToOptions}
      </button>

      <h2 style={{ fontFamily: "Lora, serif", color: "#2B2B22", textTransform: "capitalize" }}>
        {getSectorName(sector, language)} — {t.capitalHeadingSuffix}
      </h2>
      <p style={{ color: "#5C5A4C", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
        {t.capitalIntro}
      </p>

      <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "0.9rem", color: "#5C5A4C" }}>{t.capitalLabel}</span>
        <input
          type="number"
          min="1"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #E2DCC9" }}
        />
      </label>

      <button
        onClick={() => onSubmit(Number(capital))}
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#2F5233",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "0.98rem",
          cursor: "pointer",
        }}
      >
        {t.capitalButton}
      </button>
    </div>
  );
}
