import { getSectorImage } from "../sectorImages";
import { LANGUAGES, type Language, getTranslation } from "../translations";

interface WelcomeScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onStart: () => void;
}

// The six background photos behind the welcome text — same photos already
// used on the business-options cards, just reused here for a nice collage.
const COLLAGE_SECTORS = [
  "dairy",
  "poultry",
  "food_processing",
  "retail",
  "tailoring",
  "agri_input_retail",
];

export function WelcomeScreen({ language, onLanguageChange, onStart }: WelcomeScreenProps) {
  const t = getTranslation(language);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", backgroundColor: "#F6F2E9" }}>
      {/* Background photo collage — six sector photos, faded so text stays readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          opacity: 0.18,
        }}
        aria-hidden="true"
      >
        {COLLAGE_SECTORS.map((key) => {
          const src = getSectorImage(key);
          return src ? (
            <img key={key} src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div key={key} style={{ backgroundColor: "#E2DCC9" }} />
          );
        })}
      </div>

      {/* Cream veil over the photos so the collage reads as a background, not a distraction */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(246,242,233,0.88), rgba(246,242,233,0.8), rgba(246,242,233,0.95))",
        }}
        aria-hidden="true"
      />

      {/* Actual content, centered on top of the collage */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "26rem", width: "100%" }}>
          <h1 style={{ margin: "0 0 0.5rem", fontSize: "2.4rem", color: "#2F5233" }}>{t.appTitle}</h1>
          <p style={{ margin: "0 0 2rem", color: "#5C5A4C", fontSize: "1.05rem", lineHeight: 1.6 }}>
            {t.tagline}
          </p>

          <p style={{ margin: "0 0 0.75rem", color: "#5C5A4C", fontSize: "0.9rem", fontWeight: 600 }}>
            {t.chooseLanguage}
          </p>
          <div
            role="group"
            aria-label={t.chooseLanguage}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }}
          >
            {LANGUAGES.map(({ key, label }) => {
              const active = language === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onLanguageChange(key)}
                  aria-pressed={active}
                  style={{
                    padding: "0.55rem 1.3rem",
                    borderRadius: "999px",
                    border: active ? "2px solid #2F5233" : "2px solid #E2DCC9",
                    backgroundColor: active ? "#2F5233" : "#FFFFFF",
                    color: active ? "#FFFFFF" : "#2B2B22",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onStart}
            style={{
              width: "100%",
              padding: "0.9rem 1.25rem",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#2F5233",
              color: "#FFFFFF",
              fontSize: "1.05rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 10px 20px -6px rgba(47,82,51,0.35)",
            }}
          >
            {t.getStarted} →
          </button>
        </div>
      </div>
    </div>
  );
}
