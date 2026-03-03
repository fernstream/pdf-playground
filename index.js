import fs from 'fs';
import pdfList from './pdflist-data.js';
import { setupPDF } from './pdfService.js';
import { Cursor } from './cursor.js';
import { drawTable } from './tableRenderer.js';
import { drawHeader, drawFooter } from './header-fototer-layout.js';

const { pdfDoc, fontDefault, fontBold, page } = await setupPDF();
const margin = 50;

const headerHeight = 80;
const footerHeight = 60;

// Tools
const cursor = new Cursor({
  page,
  margin,
  headerHeight,
  footerHeight,
});

// Execute tasks
drawHeader(page, fontBold, margin);
drawTable(cursor, pdfList, fontDefault, fontBold);
drawFooter(page, fontDefault, margin);

// Save logic
const pdfBytes = await pdfDoc.save();
const fileName = 'playground-test.pdf';
fs.writeFileSync(fileName, pdfBytes);
console.log('PDF created successfully: ' + fileName);
