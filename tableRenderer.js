import getWrappedLines from './utils.js';
import pdfList from './pdflist-data.js';

export async function drawTable(page, cursor, pdfList, fontDefault, fontBold) {

// Setup
const margin = 50;
const { width } = page.getSize();
const tableWidth = (width - margin) - margin;
const colWidth = tableWidth / 3;

const Xcol1 = margin;
const Xcol2 = margin + colWidth;
const Xcol3 = margin + (colWidth * 2);

const fontSize = 10;
const lineHeight = fontSize + 4;
const colHeaders = ['Function', 'Parameters', 'Description'];

cursor.moveDown(10);

colHeaders.forEach((header, i) => {
  page.drawText(header, {
    x: [Xcol1, Xcol2, Xcol3][i],
    y: cursor.y,
    size: fontSize,
    font: fontBold
  });
});

cursor.finishRow(fontSize);

pdfList.forEach((item) => {
  const colData = [
    { text: item.function, x: Xcol1 },
    { text: item.parameters.join(', '), x: Xcol2 },
    { text: item.description, x: Xcol3 }
  ].map(col => ({
    lines: getWrappedLines(col.text, colWidth, fontDefault, fontSize),
    x: col.x
  }));

  const maxLines = Math.max(...colData.map(c => c.lines.length));
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

}
