import { useEffect, useState } from "react";
import type { FeasibilityResult } from "../types";
import { getSectorBuffet } from "../api";
import { BuffetGrid } from "../components/BuffetGrid";
import { ErrorBanner } from "../components/ErrorBanner";
import { EmptyState } from "../components/EmptyState";
import { type Language, getTranslation } from "../translations";

interface BuffetScreenProps {
  district: string;
  subLocation: string;
  onSelectSector: (sector: string) => void;
  language: Language;
}

export function BuffetScreen({ district, subLocation, onSelectSector, language }: BuffetScreenProps) {
  const t = getTranslation(language);
  const [results, setResults] = useState<FeasibilityResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function loadBuffet() {
    setLoading(true);
    setError(null);
    getSectorBuffet(district, language)
      .then(setResults)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadBuffet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district, language]);

  return (
    <div>
      <h2 style={{ fontFamily: "Lora, serif", color: "#2B2B22" }}>
        {subLocation ? `${t.buffetHeadingNear} ${subLocation}` : t.buffetHeadingIn}
      </h2>
      <p style={{ color: "#5C5A4C", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
        {t.buffetSubtext}
      </p>

      {loading && <p>{t.loadingOptions}</p>}
      {error && <ErrorBanner message={error} onRetry={loadBuffet} />}
      {!loading && !error && results.length === 0 && (
        <EmptyState message={t.noDataMessage} />
      )}
      {!loading && !error && results.length > 0 && (
        <BuffetGrid results={results} onSelect={onSelectSector} chooseLabel={t.chooseButton} language={language} />
      )}
    </div>
  );
}