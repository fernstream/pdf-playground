import getWrappedLines from './utils.js';
import pdfList from './pdflist-data.js';

export async function drawTable(
  cursor,
  pdfList,
  fontDefault,
  fontBold,
  { addPage, headerHeight = 0, footerHeight = 0 } = {}
) {

// Setup
const margin = cursor.margin;
const { width } = cursor.page.getSize();
const tableWidth = width - margin * 2;
const colWidth = tableWidth / 3;

const Xcol1 = margin;
const Xcol2 = margin + colWidth;
const Xcol3 = margin + (colWidth * 2);

const fontSize = 10;
const lineHeight = fontSize + 4;
const colHeaders = ['Function', 'Parameters', 'Description'];

const checkSpace = async (h) => {
  if (!addPage) return;
  await cursor.prepareSpace(h, addPage);
}

const headerRowHeight = lineHeight;
const headerTotalHeight = 10 + headerRowHeight + 30;
await checkSpace(headerTotalHeight);

cursor.moveDown(10);

colHeaders.forEach((header, i) => {
  cursor.page.drawText(header, {
    x: [Xcol1, Xcol2, Xcol3][i],
    y: cursor.y,
    size: fontSize,
    font: fontBold
  });
});

cursor.finishRow(headerRowHeight);

 for (const item of pdfList) {
    const colData = [
      { text: item.function, x: Xcol1 },
      { text: item.parameters.join(', '), x: Xcol2 },
      { text: item.description, x: Xcol3 },
    ].map((col) => ({
      lines: getWrappedLines(col.text, colWidth, fontDefault, fontSize),
      x: col.x,
    }));

    const maxLines = Math.max(...colData.map((c) => c.lines.length));
    const rowHeight = Math.max(lineHeight, maxLines * lineHeight);

    await checkSpace(rowHeight + 30);

    colData.forEach((col) => {
      col.lines.forEach((line, i) => {
        cursor.page.drawText(line, {
          x: col.x,
          y: cursor.y - i * lineHeight,
          size: fontSize,
          font: fontDefault,
        });
      });
    });

    cursor.finishRow(rowHeight);
  }
}
