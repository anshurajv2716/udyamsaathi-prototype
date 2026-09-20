import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// All three functions capture whatever DOM element is passed in (via a ref)
// as a canvas image. downloadAsPNG saves that image directly as a PNG.
// downloadAsPDF and getReportPDFBase64 both embed it into a generated PDF —
// the former triggers a browser save, the latter returns the same PDF as a
// base64 string (no data-URI prefix) so it can be POSTed to the backend as
// an email attachment. No server involved in the rendering itself — the
// backend never re-renders the report, it only relays this PDF.

async function renderElementToPDF(element: HTMLElement): Promise<jsPDF> {
  const canvas = await html2canvas(element, { backgroundColor: "#F6F2E9", scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
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
  const pdf = await renderElementToPDF(element);
  pdf.save(`${filename}.pdf`);
}

// Used by the "email me this report" option: builds the exact same PDF as
// downloadAsPDF, but returns it as a base64 string instead of triggering a
// browser download, so it can be sent to the backend's /send-report-email
// endpoint as an attachment.
export async function getReportPDFBase64(element: HTMLElement): Promise<string> {
  const pdf = await renderElementToPDF(element);
  const dataUriString = pdf.output("datauristring");
  // dataUriString looks like "data:application/pdf;filename=generated.pdf;base64,JVBERi0..."
  // — strip everything up to and including the last comma to get pure base64.
  return dataUriString.substring(dataUriString.lastIndexOf(",") + 1);
}