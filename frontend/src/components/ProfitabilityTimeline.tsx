import type { ProfitabilityStage } from "../types";

interface ProfitabilityTimelineProps {
  stages: ProfitabilityStage[];
}

// Renders the 3-stage timeline (Setup & Early Operations / Revenue
// Ramp-Up / Stable Operations) the backend now returns per recommendation
// band. If stages is empty (DEFAULT_OUTLOOK fallback, or an older cached
// response), renders nothing — the surrounding ReportCard still shows
// outlook_text, typical_stabilization_window, and disclaimer regardless,
// so nothing goes blank even without stages.
export function ProfitabilityTimeline({ stages }: ProfitabilityTimelineProps) {
  if (stages.length === 0) return null;

  return (
    <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
      {stages.map((stage, i) => (
        <div key={i} style={{ display: "flex", gap: "0.75rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#2F5233",
                marginTop: "0.3rem",
                flexShrink: 0,
              }}
            />
            {i < stages.length - 1 && (
              <div style={{ width: "2px", flex: 1, backgroundColor: "#C8D8C0", minHeight: "1.5rem" }} />
            )}
          </div>
          <div style={{ paddingBottom: "1rem" }}>
            <p style={{ margin: "0 0 0.2rem", fontSize: "0.85rem", fontWeight: 700, color: "#2F5233" }}>
              {stage.phase} · {stage.label}
            </p>
            <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.55, color: "#1F2117" }}>
              {stage.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}