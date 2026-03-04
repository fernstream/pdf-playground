import fs from 'fs';
import pdfList from './pdflist-data.js';
import { createAddPageAndLayout, setupPDF } from './pdfService.js';
import { Cursor } from './cursor.js';
import { drawTable } from './tableRenderer.js';
import { drawHeader, drawFooter } from './header-fototer-layout.js';

const margin = 50;
const headerHeight = 80;
const footerHeight = 60;

const { pdfDoc, fontDefault, fontBold, page, logoImage, logoDims } = await setupPDF();

const addPageAndLayout = createAddPageAndLayout({
  pdfDoc,
  drawHeader,
  drawFooter,
  fontBold,
  fontDefault,
  margin,
  logoImage,
  logoDims,
});

// Tools
const cursor = new Cursor({
  page,
  margin,
  headerHeight,
  footerHeight,
});

// Execute tasks
drawHeader(page, fontBold, margin, logoImage, logoDims);
drawFooter(page, fontDefault, margin);

await drawTable(cursor, pdfList, fontDefault, fontBold, { addPage: addPageAndLayout });

// Save logic
const pdfBytes = await pdfDoc.save();
const fileName = 'playground-test.pdf';
fs.writeFileSync(fileName, pdfBytes);
console.log('PDF created successfully: ' + fileName);
