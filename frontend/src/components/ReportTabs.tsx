import { BarChart3, Landmark, HelpCircle } from "lucide-react";
import { type Language, getTranslation } from "../translations";

export type ReportTab = "advisory" | "schemes" | "faq";

interface ReportTabsProps {
  activeTab: ReportTab;
  onChange: (tab: ReportTab) => void;
  language: Language;
}

const TAB_CONFIG: { key: ReportTab; icon: typeof BarChart3 }[] = [
  { key: "advisory", icon: BarChart3 },
  { key: "schemes", icon: Landmark },
  { key: "faq", icon: HelpCircle },
];

export function ReportTabs({ activeTab, onChange, language }: ReportTabsProps) {
  const t = getTranslation(language);
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        borderBottom: "1px solid #E2DCC9",
        marginBottom: "1.5rem",
      }}
    >
      {TAB_CONFIG.map(({ key, icon: Icon }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.7rem 1rem",
              background: "none",
              border: "none",
              borderBottom: isActive ? "2px solid #2F5233" : "2px solid transparent",
              color: isActive ? "#2F5233" : "#5C5A4C",
              fontWeight: isActive ? 600 : 500,
              fontSize: "0.92rem",
              cursor: "pointer",
              marginBottom: "-1px",
              transition: "color 0.15s ease, border-color 0.15s ease",
            }}
          >
            <Icon size={16} aria-hidden="true" />
            {t.reportTabLabels[key]}
          </button>
        );
      })}
    </div>
  );
}