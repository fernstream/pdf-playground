export function drawHeader(page, font, margin) {
  const { width, height } = page.getSize();
  page.drawText('HEAD OF ALL HEADERS', {
    x: margin,
    y: height - 30,
    size: 14,
    font: font
  });
}

export function drawFooter(page, font, margin) {
  const { width } = page.getSize();
    page.drawText('Page 1 of 1', {
      x: width / 2 - 20,
      y: 20,
      size: 8,
      font: font
    });
}
