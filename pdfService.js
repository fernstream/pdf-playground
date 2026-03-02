import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function setupPDF() {
const pdfDoc = await PDFDocument.create();
const fontDefault = await pdfDoc.embedFont(StandardFonts.Helvetica);
const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

// Page setup
const page = pdfDoc.addPage();

return { pdfDoc, fontDefault, fontBold, page };
}
