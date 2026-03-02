import { rgb } from 'pdf-lib';

export class Cursor {
  constructor(page, margin, width) {
    this.page = page;
    this.margin = margin;
    this.width = width;
    this.lineEnd = width - margin;
    this.y = page.getHeight() - margin;
  }

  moveDown(amount) {
    this.y -= amount;
  }

  drawLine(thickness = 1) {
    this.page.drawLine({
      start: { x: this.margin, y: this.y },
      end: { x: this.lineEnd, y: this.y },
      thickness,
      color: rgb(0, 0, 0),
    });
  }

  finishRow(rowHeight = 0) {
    this.moveDown(rowHeight + 10);
    this.drawLine();
    this.moveDown(20);
  }
}
