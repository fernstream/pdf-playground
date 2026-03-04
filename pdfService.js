import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';

export async function setupPDF() {
const pdfDoc = await PDFDocument.create();

const logoBytes = fs.readFileSync('./assets/logo-full-pdflib.png');
const logoImage = await pdfDoc.embedPng(logoBytes);
const logoDims = logoImage.scale(0.15);
console.log(logoDims);

const fontDefault = await pdfDoc.embedFont(StandardFonts.Helvetica);
const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

// Page setup
const page = pdfDoc.addPage();

return { pdfDoc, fontDefault, fontBold, page, logoImage, logoDims };
}

export function createAddPageAndLayout({
  pdfDoc,
  drawHeader,
  drawFooter,
  fontBold,
  fontDefault,
  margin,
  logoImage,
  logoDims
}) {
return async () => {
    const newPage = pdfDoc.addPage();
    drawHeader(newPage, fontBold, margin, logoImage, logoDims);
    drawFooter(newPage, fontDefault, margin);
    return newPage;
  };
}
