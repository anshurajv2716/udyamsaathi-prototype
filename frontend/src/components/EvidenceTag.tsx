import { type Language, getTranslation } from "../translations";

interface EvidenceTagProps {
  evidenceTag: string;
  language?: Language;
}

export function EvidenceTag({ evidenceTag, language = "en" }: EvidenceTagProps) {
  const t = getTranslation(language);
  const isVerified = evidenceTag === "direct_data";
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.72rem",
        padding: "0.15rem 0.5rem",
        borderRadius: "5px",
        border: "1px solid",
        borderColor: isVerified ? "#2F5233" : "#B8862B",
        color: isVerified ? "#2F5233" : "#B8862B",
        backgroundColor: isVerified ? "#E4EBDD" : "#F3E6C8",
      }}
    >
      {isVerified ? t.verifiedData : t.estimated}
    </span>
  );
}