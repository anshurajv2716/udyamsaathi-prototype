import { LANGUAGES, type Language } from "../translations";

// Simple 3-way language switch shown at the top of the app. Changing this
// updates BOTH the static UI text (immediately, from translations.ts) and
// gets passed to backend API calls so dynamic content (sector notes, the
// AI narrative) comes back in the same language.

interface LanguageToggleProps {
  language: Language;
  onChange: (lang: Language) => void;
}

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "1rem" }}>
      {LANGUAGES.map((l) => (
        <button
          key={l.key}
          onClick={() => onChange(l.key)}
          style={{
            padding: "0.35rem 0.9rem",
            borderRadius: "999px",
            border: "1px solid #2F5233",
            backgroundColor: language === l.key ? "#2F5233" : "transparent",
            color: language === l.key ? "#fff" : "#2F5233",
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}