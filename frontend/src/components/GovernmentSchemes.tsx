import { useState } from "react";
import { Landmark, Factory, TrendingUp, ShoppingCart, Wheat, HeartHandshake, Rocket, Milk, X, ExternalLink } from "lucide-react";
import { type Language, getTranslation } from "../translations";
import { getSchemesForSector, type GovtSchemeData } from "../govtSchemesData";

const ICONS: Record<string, typeof Landmark> = {
  mudra: Landmark,
  pmegp: Factory,
  standup: TrendingUp,
  svanidhi: ShoppingCart,
  kcc: Wheat,
  mahilaUdyam: HeartHandshake,
  startupIndia: Rocket,
  ahidf: Milk,
};

interface GovernmentSchemesProps {
  language: Language;
  sector: string;
}

export function GovernmentSchemes({ language, sector }: GovernmentSchemesProps) {
  const t = getTranslation(language);
  const [selected, setSelected] = useState<GovtSchemeData | null>(null);
  const entries = getSchemesForSector(sector);

  return (
    <section
      style={{
        marginBottom: "2rem",
        padding: "1.25rem",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2DCC9",
        borderRadius: "10px",
      }}
    >
      <h3 style={{ marginTop: 0, fontFamily: "Lora, serif", color: "#2B2B22" }}>
        {t.governmentSchemesTitle}
      </h3>
      <p style={{ fontSize: "0.85rem", color: "#5C5A4C", marginBottom: "1rem" }}>{t.schemesSubtitle}</p>

      {entries.length === 0 ? (
        <p style={{ fontSize: "0.85rem", color: "#9C9689", fontStyle: "italic" }}>{t.noSchemesForSector}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {entries.map(({ scheme, fit }) => {
            const c = scheme.content[language];
            const Icon = ICONS[scheme.key] ?? Landmark;
            return (
              <button
                key={scheme.key}
                onClick={() => setSelected(scheme)}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  padding: "0.85rem",
                  borderRadius: "10px",
                  textAlign: "left",
                  backgroundColor: `${scheme.color}0D`,
                  border: `1px solid ${scheme.color}33`,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <Icon size={22} color={scheme.color} style={{ flexShrink: 0, marginTop: "0.1rem" }} aria-hidden="true" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.2rem" }}>
                    <span style={{ fontSize: "0.92rem", fontWeight: 700, color: scheme.color }}>{c.name}</span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "0.1rem 0.5rem",
                        borderRadius: "999px",
                        backgroundColor: `${scheme.color}18`,
                        color: scheme.color,
                      }}
                    >
                      {c.badge}
                    </span>
                    {scheme.lowConfidence && (
                      <span style={{ fontSize: "0.7rem", color: "#9B4A2B", fontWeight: 600 }}>⚠️</span>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#5C5A4C", lineHeight: 1.5 }}>{c.description}</p>
                  {fit.level === "conditional" && fit.note && (
                    <p style={{ margin: "0.4rem 0 0", fontSize: "0.76rem", color: "#B8862B", fontStyle: "italic" }}>
                      {fit.note[language]}
                    </p>
                  )}
                  <span style={{ display: "inline-block", marginTop: "0.4rem", fontSize: "0.8rem", fontWeight: 600, color: scheme.color }}>
                    {t.viewDetailsLabel} →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <p style={{ fontSize: "0.75rem", color: "#9C9689", marginTop: "0.75rem", marginBottom: 0 }}>
        {t.governmentSchemesFootnote}
      </p>

      {selected && (
        <SchemeModal scheme={selected} language={language} sector={sector} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function SchemeModal({
  scheme,
  language,
  sector,
  onClose,
}: {
  scheme: GovtSchemeData;
  language: Language;
  sector: string;
  onClose: () => void;
}) {
  const t = getTranslation(language);
  const c = scheme.content[language];
  const fit = scheme.sectorFit[sector as keyof typeof scheme.sectorFit];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#F6F2E9",
          borderRadius: "16px 16px 0 0",
          width: "100%",
          maxWidth: "560px",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#F6F2E9",
            padding: "1.25rem 1.25rem 0.75rem",
            borderBottom: "1px solid #E2DCC9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "0.75rem",
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontFamily: "Lora, serif", color: "#2B2B22" }}>{c.name}</h3>
            <span
              style={{
                display: "inline-block",
                marginTop: "0.35rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                padding: "0.15rem 0.55rem",
                borderRadius: "999px",
                backgroundColor: `${scheme.color}18`,
                color: scheme.color,
              }}
            >
              {c.badge}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#5C5A4C", padding: "0.3rem" }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: "1.25rem" }}>
          {scheme.lowConfidence && (
            <p style={{ fontSize: "0.8rem", color: "#9B4A2B", fontWeight: 600, marginTop: 0 }}>
              {t.modalLowConfidenceLabel}
            </p>
          )}

          <p style={{ fontSize: "0.9rem", color: "#2B2B22", lineHeight: 1.6 }}>{c.description}</p>

          <div style={{ padding: "0.75rem", borderRadius: "8px", backgroundColor: "#EFE8D8", marginBottom: "1rem" }}>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#5C5A4C" }}>{c.tagline}</p>
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.95rem", fontWeight: 700, color: "#2F5233" }}>{c.amount}</p>
          </div>

          {fit?.level === "conditional" && fit.note && (
            <div style={{ padding: "0.75rem", borderRadius: "8px", backgroundColor: "#F3E6C8", marginBottom: "1rem" }}>
              <p style={{ margin: 0, fontSize: "0.78rem", fontWeight: 600, color: "#8B6914" }}>{t.modalConditionalNoteLabel}</p>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.82rem", color: "#5C5A4C" }}>{fit.note[language]}</p>
            </div>
          )}

          <h4 style={{ fontSize: "0.9rem", color: "#2B2B22", marginBottom: "0.5rem" }}>{t.modalEligibilityTitle}</h4>
          <ul style={{ margin: "0 0 1rem", paddingLeft: "1.1rem", fontSize: "0.85rem", lineHeight: 1.55 }}>
            {c.eligibility.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h4 style={{ fontSize: "0.9rem", color: "#2B2B22", marginBottom: "0.5rem" }}>{t.modalBenefitsTitle}</h4>
          <ul style={{ margin: "0 0 1rem", paddingLeft: "1.1rem", fontSize: "0.85rem", lineHeight: 1.55 }}>
            {c.benefits.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h4 style={{ fontSize: "0.9rem", color: "#2B2B22", marginBottom: "0.5rem" }}>{t.modalDocumentsTitle}</h4>
          <ul style={{ margin: "0 0 1rem", paddingLeft: "1.1rem", fontSize: "0.85rem", lineHeight: 1.55 }}>
            {c.documents.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h4 style={{ fontSize: "0.9rem", color: "#2B2B22", marginBottom: "0.5rem" }}>{t.modalStepsTitle}</h4>
          <ol style={{ margin: "0 0 1rem", paddingLeft: "1.1rem", fontSize: "0.85rem", lineHeight: 1.6 }}>
            {c.steps.map((item, i) => <li key={i} style={{ marginBottom: "0.35rem" }}>{item}</li>)}
          </ol>

          {c.caveat && (
            <div style={{ padding: "0.75rem", borderRadius: "8px", backgroundColor: "#F3E6C8", marginBottom: "1rem" }}>
              <p style={{ margin: 0, fontSize: "0.78rem", fontWeight: 600, color: "#8B6914" }}>{t.modalCaveatLabel}</p>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.82rem", color: "#5C5A4C" }}>{c.caveat}</p>
            </div>
          )}

          
          <a
            href={scheme.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.85rem",
              borderRadius: "8px",
              backgroundColor: "#2F5233",
              color: "#fff",
              textDecoration: "none",
              fontSize: "0.85rem",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {t.modalWebsiteLabel}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontWeight: 600 }}>
              {t.modalVisitButton} <ExternalLink size={14} />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}