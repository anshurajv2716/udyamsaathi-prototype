import { useState } from "react";
import { DISTRICTS } from "../types";
import { type Language, getTranslation } from "../translations";

interface LocateScreenProps {
  onSubmit: (district: string, subLocation: string) => void;
  language: Language;
}

export function LocateScreen({ onSubmit, language }: LocateScreenProps) {
  const t = getTranslation(language);
  const [district, setDistrict] = useState(DISTRICTS[0].key);
  const [subLocation, setSubLocation] = useState("");

  return (
    <div style={{ maxWidth: "420px", margin: "0 auto" }}>
      <h2 style={{ fontFamily: "Lora, serif", color: "#2B2B22" }}>{t.locateHeading}</h2>

      <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
        <span style={{ fontSize: "0.9rem", color: "#5C5A4C" }}>{t.districtLabel}</span>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #E2DCC9" }}
        >
          {DISTRICTS.map((d) => (
            <option key={d.key} value={d.key}>{d.label}</option>
          ))}
        </select>
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "0.9rem", color: "#5C5A4C" }}>{t.subLocationLabel}</span>
        <input
          type="text"
          value={subLocation}
          onChange={(e) => setSubLocation(e.target.value)}
          placeholder={t.subLocationPlaceholder}
          style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #E2DCC9" }}
        />
      </label>

      <button
        onClick={() => onSubmit(district, subLocation)}
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
        {t.locateButton}
      </button>
    </div>
  );
}