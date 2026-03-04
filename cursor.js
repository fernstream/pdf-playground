import { rgb } from 'pdf-lib';

export class Cursor {
  constructor({ page, margin, headerHeight = 0, footerHeight = 0 }) {
    this.page = page;
    this.margin = margin;
    this.headerHeight = headerHeight;
    this.footerHeight = footerHeight;

    this.updateBounds();
    this.y = this.yTop;
  }

  updateBounds() {
    const h = this.page.getHeight();
    const w = this.page.getWidth();

    this.yTop = h - this.margin - this.headerHeight;
    this.yBottom = this.margin + this.footerHeight;

    this.xStart = this.margin;
    this.xEnd = w - this.margin;
  }

  canFit(requiredHeight) {
    return (this.y - requiredHeight) >= this.yBottom;
  }

  setPage(page) {
    this.page = page;
    this.updateBounds();
    this.y = this.yTop;
  }

  async prepareSpace(requiredHeight, addPage) {
    if (!addPage) return;
    if (this.canFit(requiredHeight)) return;

    const newPage = await addPage();
    this.setPage(newPage);
  }

  moveDown(amount) {
    this.y -= amount;
  }

  drawLine(thickness = 1) {
    this.page.drawLine({
      start: { x: this.xStart, y: this.y },
      end: { x: this.xEnd, y: this.y },
      thickness,
      color: rgb(0, 0, 0),
    });
  }

  async finishRow(rowHeight = 0, addPage) {
    const totalHeight = rowHeight + 30;
    await this.prepareSpace(totalHeight, addPage);

    this.moveDown(rowHeight + 10);
    this.drawLine();
    this.moveDown(20);
  }
}
