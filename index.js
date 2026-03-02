import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import pdfList from './pdflist-data.js';
import { Cursor } from './cursor.js';

const pdfDoc = await PDFDocument.create();
const fontDefault = await pdfDoc.embedFont(StandardFonts.Helvetica);
const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

// Page setup
const page = pdfDoc.addPage();
const { width, height } = page.getSize();

// Table setup
const margin = 50;
const lineEnd = width - margin;
const tableWidth = lineEnd - margin;
const colWidth = tableWidth / 3;

// Column X positions
const Xcol1 = margin;
const Xcol2 = margin + colWidth;
const Xcol3 = margin + (colWidth * 2);

// Font and line settings
const fontSize = 10;
const lineHeight = fontSize + 4;

const colHeaders = ['Function', 'Parameters', 'Description'];


function getWrappedLines(text, maxWidth, font, size) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';

    words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, size);

        if (testWidth > (colWidth - 10)) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    });
    lines.push(currentLine);
    return lines;
}

const cursor = new Cursor(page, margin, width);
cursor.moveDown(10);

colHeaders.forEach((header, i) => {
  page.drawText(header, { x: [Xcol1, Xcol2, Xcol3][i], y: cursor.y, size: fontSize, font: fontBold });
});

cursor.finishRow(fontSize);


pdfList.forEach((item) => {

  const colData =  [
    { text: item.function, x: Xcol1},
    { text: item.parameters.join (', '), x: Xcol2},
    { text: item.description, x: Xcol3 }
  ]
  .map(col => ({
    lines: getWrappedLines(col.text, colWidth, fontDefault, fontSize), x: col.x
    }));

  const maxLines = Math.max(... colData.map(c => c.lines.length));
  const rowHeight = maxLines * lineHeight;

  colData.forEach((col) => {
      col.lines.forEach((line, i) => {
        page.drawText(line, {
          x: col.x,
          y: cursor.y - (i * lineHeight),
          size: fontSize,
          font: fontDefault
        });
      });
    });

    cursor.finishRow(rowHeight);
});

const pdfBytes = await pdfDoc.save();
const fileName = 'playground-test.pdf';
fs.writeFileSync(fileName, pdfBytes);
console.log('PDF created successfully: ' + fileName);
