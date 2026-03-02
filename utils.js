function getWrappedLines(text, maxWidth, font, size, padding = 10) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';

    const effectiveWidth = maxWidth - padding;

    words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, size);

        if (testWidth > effectiveWidth) {
          if (currentLine) lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    });

    if (currentLine) lines.push(currentLine);
    return lines;
}

export default getWrappedLines;
