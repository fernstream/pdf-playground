export function drawHeader(page, font, margin, logoImage, logoDims) {
  const { width, height } = page.getSize();
  const textHeader = 'PDF LIB CHEAT SHEET'

 if (logoImage) {
    page.drawImage(logoImage, {
      x: width / 1.4,
      y: height - 80,
      width: logoDims.width,
      height: logoDims.height,
    });
  }

  page.drawText(textHeader, {
    x: margin,
    y: height - 60,
    size: 20,
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
