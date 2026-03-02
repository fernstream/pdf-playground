import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import { setupPDF } from './pdfService.js';
import pdfList from './pdflist-data.js';
import { Cursor } from './cursor.js';
import { drawTable } from './tableRenderer.js';

const { pdfDoc, fontDefault, fontBold, page } = await setupPDF();
const { width } = page.getSize();
const margin = 50;

// Tools
const cursor = new Cursor(page, margin, width);

// Execute tasks
await drawTable(page, cursor, pdfList, fontDefault, fontBold);

// Save logic
const pdfBytes = await pdfDoc.save();
const fileName = 'playground-test.pdf';
fs.writeFileSync(fileName, pdfBytes);
console.log('PDF created successfully: ' + fileName);
