import type { FeasibilityResult } from "../types";
import { SectorCard } from "./SectorCard";
import type { Language } from "../translations";

interface BuffetGridProps {
  results: FeasibilityResult[];
  onSelect: (sector: string) => void;
  chooseLabel: string;
  language: Language;
}

export function BuffetGrid({ results, onSelect, chooseLabel, language }: BuffetGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1.25rem",
      }}
    >
      {results.map((result) => (
        <SectorCard key={result.sector} result={result} onSelect={onSelect} chooseLabel={chooseLabel} language={language} />
      ))}
    </div>
  );
}