import getWrappedLines from './utils.js';

export async function drawTable(cursor, pdfList, fontDefault, fontBold, { addPage } = {}) {
  const { width } = cursor.page.getSize();
  const colWidth = (width - cursor.margin * 2) / 3;
  const xPositions = [cursor.margin, cursor.margin + colWidth, cursor.margin + colWidth * 2];

  const fontSize = 10;
  const lineHeight = fontSize + 4;

  const renderRow = async (dataArray, font, isHeader = false) => {
    const colData = dataArray.map((text, i) => ({
      lines: getWrappedLines(text, colWidth, font, fontSize),
      x: xPositions[i]
    }));

    const maxLines = Math.max(...colData.map(c => c.lines.length));
    const rowHeight = maxLines * lineHeight;

    await cursor.prepareSpace(rowHeight + 20, addPage);

    colData.forEach(col => {
      col.lines.forEach((line, i) => {
        cursor.page.drawText(line, {
          x: col.x,
          y: cursor.y - i * lineHeight,
          size: fontSize,
          font: font
        });
      });
    });

    await cursor.finishRow(rowHeight, addPage);
  };

  cursor.moveDown(10);
  await renderRow(['Function', 'Parameters', 'Description'], fontBold, true);

  for (const item of pdfList) {
    const rowData = [
      item.function,
      item.parameters.join(', '),
      item.description
    ];
    await renderRow(rowData, fontDefault);
  }
}
