import { useState } from "react";
import "./App.css";
import { LocateScreen } from "./screen/LocateScreen";
import { BuffetScreen } from "./screen/BuffetScreen";
import { CapitalScreen } from "./screen/CapitalScreen";
import { ReportScreen } from "./screen/ReportScreen";
import { LanguageToggle } from "./components/LanguageToggle";
import { type Language, getTranslation } from "./translations";

type Step = "locate" | "buffet" | "capital" | "report";

function App() {
  const [step, setStep] = useState<Step>("locate");
  const [district, setDistrict] = useState("");
  const [subLocation, setSubLocation] = useState("");
  const [sector, setSector] = useState("");
  const [capital, setCapital] = useState(0);
  const [language, setLanguage] = useState<Language>("en");

  const t = getTranslation(language);

  function handleLocateSubmit(d: string, sub: string) {
    setDistrict(d);
    setSubLocation(sub);
    setStep("buffet");
  }

  function handleSectorSelect(s: string) {
    setSector(s);
    setStep("capital");
  }

  function handleCapitalSubmit(c: number) {
    setCapital(c);
    setStep("report");
  }

  return (
    <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <header style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Lora, serif", color: "#2F5233", margin: 0, lineHeight: 1.2, fontSize: "2.4rem" }}>
          {t.appTitle}
        </h1>
        <p style={{ color: "#5C5A4C", marginTop: "0.75rem", fontSize: "1.05rem" }}>
          {t.tagline}
        </p>
      </header>

      <LanguageToggle language={language} onChange={setLanguage} />

      {step === "locate" && <LocateScreen onSubmit={handleLocateSubmit} language={language} />}

      {step === "buffet" && (
        <BuffetScreen
          district={district}
          subLocation={subLocation}
          onSelectSector={handleSectorSelect}
          language={language}
        />
      )}

      {step === "capital" && (
        <CapitalScreen
          sector={sector}
          onSubmit={handleCapitalSubmit}
          onBack={() => setStep("buffet")}
          language={language}
        />
      )}

      {step === "report" && (
        <ReportScreen
          district={district}
          sector={sector}
          capital={capital}
          onBack={() => setStep("capital")}
          language={language}
        />
      )}
    </div>
  );
}

export default App;