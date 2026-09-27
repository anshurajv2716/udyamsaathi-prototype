import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// All three functions capture whatever DOM element is passed in (via a ref)
// as a canvas image. downloadAsPNG saves that image directly as a PNG.
// downloadAsPDF and getReportPDFBase64 both embed it into a generated PDF —
// the former triggers a browser save, the latter returns the same PDF as a
// base64 string (no data-URI prefix) so it can be POSTed to the backend as
// an email attachment. No server involved in the rendering itself — the
// backend never re-renders the report, it only relays this PDF.

interface RenderOptions {
  scale?: number;
  format?: "PNG" | "JPEG";
  quality?: number; // 0-1, only used for JPEG
}

async function renderElementToPDF(element: HTMLElement, options: RenderOptions = {}): Promise<jsPDF> {
  const { scale = 2, format = "PNG", quality = 0.92 } = options;
  const canvas = await html2canvas(element, { backgroundColor: "#F6F2E9", scale });
  const imgData = format === "JPEG" ? canvas.toDataURL("image/jpeg", quality) : canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, format, 0, 0, canvas.width, canvas.height);
  return pdf;
}

export async function downloadAsPNG(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, { backgroundColor: "#F6F2E9", scale: 2 });
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function downloadAsPDF(element: HTMLElement, filename: string) {
  // Full quality — this stays entirely in the browser (a local save), so
  // file size doesn't matter here the way it does for the email path.
  const pdf = await renderElementToPDF(element, { scale: 2, format: "PNG" });
  pdf.save(`${filename}.pdf`);
}

// Used by the "email me this report" option. This PDF travels over the
// network twice (browser -> our backend -> Resend), so it's rendered at a
// lower scale and as compressed JPEG instead of lossless PNG — a full-page,
// multi-section report at scale:2/PNG can run several MB, which is exactly
// what caused a "write operation timed out" error on a slower connection.
// Scale:1 + JPEG cuts that dramatically while staying perfectly readable
// for an emailed report (as opposed to a crisp local download).
export async function getReportPDFBase64(element: HTMLElement): Promise<string> {
  const pdf = await renderElementToPDF(element, { scale: 1, format: "JPEG", quality: 0.85 });
  const dataUriString = pdf.output("datauristring");
  // dataUriString looks like "data:application/pdf;filename=generated.pdf;base64,JVBERi0..."
  // — strip everything up to and including the last comma to get pure base64.
  return dataUriString.substring(dataUriString.lastIndexOf(",") + 1);
}