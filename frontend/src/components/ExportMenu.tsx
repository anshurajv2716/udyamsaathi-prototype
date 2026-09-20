import { useEffect, useRef, useState } from "react";
import { downloadAsPNG, downloadAsPDF, getReportPDFBase64 } from "../exportUtils";
import { type Language, getTranslation } from "../translations";

// NOTE: confirm this matches the base URL your api.ts uses for the backend.
// Adjust here (or wire this from the same constant api.ts uses) if different.
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8000";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ExportMenuProps {
  reportRef: React.RefObject<HTMLDivElement | null>;
  filename: string;
  language: Language;
}

type EmailStatus = "idle" | "sending" | "success" | "error";

const menuItemStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "0.6rem 0.9rem",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "0.85rem",
  color: "#2B2B22",
};

export function ExportMenu({ reportRef, filename, language }: ExportMenuProps) {
  const t = getTranslation(language);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"menu" | "email">("menu");
  const [downloading, setDownloading] = useState<"png" | "pdf" | null>(null);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [emailErrorDetail, setEmailErrorDetail] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setMode("menu");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handlePNG() {
    if (!reportRef.current) return;
    setDownloading("png");
    try {
      await downloadAsPNG(reportRef.current, filename);
    } finally {
      setDownloading(null);
      setOpen(false);
    }
  }

  async function handlePDF() {
    if (!reportRef.current) return;
    setDownloading("pdf");
    try {
      await downloadAsPDF(reportRef.current, filename);
    } finally {
      setDownloading(null);
      setOpen(false);
    }
  }

  async function handleSendEmail() {
    if (!reportRef.current) return;
    if (!EMAIL_REGEX.test(email)) {
      setEmailStatus("error");
      setEmailErrorDetail(null);
      return;
    }
    setEmailStatus("sending");
    setEmailErrorDetail(null);
    try {
      const pdfBase64 = await getReportPDFBase64(reportRef.current);
      const res = await fetch(`${API_BASE_URL}/send-report-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pdf_base64: pdfBase64, filename, language }),
      });
      if (!res.ok) {
        let detail: string | null = null;
        try {
          const body = await res.json();
          detail = body?.detail ?? null;
        } catch {
          // response wasn't JSON — leave detail null, generic message will show
        }
        // eslint-disable-next-line no-console
        console.error("send-report-email failed:", res.status, detail);
        setEmailErrorDetail(detail);
        throw new Error(detail || `Request failed with status ${res.status}`);
      }
      setEmailStatus("success");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("send-report-email error:", err);
      setEmailStatus("error");
    }
  }

  return (
    <div ref={containerRef} style={{ position: "relative", marginBottom: "1.5rem" }} data-html2canvas-ignore="true">
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: "0.5rem 1.1rem",
          backgroundColor: "#2F5233",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "0.85rem",
          cursor: "pointer",
        }}
      >
        {t.exportButtonLabel} ▾
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 0.4rem)",
            left: 0,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2DCC9",
            borderRadius: "8px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
            minWidth: "230px",
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          {mode === "menu" && (
            <>
              <button style={menuItemStyle} onClick={handlePNG} disabled={downloading !== null}>
                {downloading === "png" ? t.preparing : t.exportPngOption}
              </button>
              <button style={menuItemStyle} onClick={handlePDF} disabled={downloading !== null}>
                {downloading === "pdf" ? t.preparing : t.exportPdfOption}
              </button>
              <button
                style={menuItemStyle}
                onClick={() => {
                  setMode("email");
                  setEmailStatus("idle");
                }}
              >
                {t.exportEmailOption}
              </button>
            </>
          )}

          {mode === "email" && (
            <div style={{ padding: "0.75rem 0.9rem" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailStatus === "error") {
                    setEmailStatus("idle");
                    setEmailErrorDetail(null);
                  }
                }}
                placeholder={t.emailInputPlaceholder}
                style={{
                  width: "100%",
                  padding: "0.45rem 0.6rem",
                  borderRadius: "6px",
                  border: "1px solid #E2DCC9",
                  fontSize: "0.85rem",
                  marginBottom: "0.5rem",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={handleSendEmail}
                disabled={emailStatus === "sending"}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  backgroundColor: "#2F5233",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                {emailStatus === "sending" ? t.emailSending : t.emailSendButton}
              </button>
              {emailStatus === "success" && (
                <p style={{ fontSize: "0.78rem", color: "#2F5233", marginTop: "0.5rem" }}>{t.emailSentConfirmation}</p>
              )}
              {emailStatus === "error" && (
                <p style={{ fontSize: "0.78rem", color: "#9B4A2B", marginTop: "0.5rem" }}>
                  {email && !EMAIL_REGEX.test(email)
                    ? t.emailInvalidMessage
                    : emailErrorDetail || t.emailFailedMessage}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
