import Element from '../elements';

export default class Rectangle extends Element {
  draw(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    editor.ctx.strokeRect(
      this.dimensions.startX,
      this.dimensions.startY,
      this.dimensions.width,
      this.dimensions.height,
    );
    console.log(this);
  }
}
