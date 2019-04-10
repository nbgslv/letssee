import Element from '../elements';

export default class Rectangle extends Element {
  draw(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    editor.ctx.save();
    editor.ctx.strokeRect(
      this.dimensions.startX,
      this.dimensions.startY,
      this.dimensions.width,
      this.dimensions.height,
    );
    editor.ctx.restore();
  }

  /*
  resize(mouseResize, affecter) {
    affecter.forEach(((affect) => {
      switch (affect) {
        case 1:
          this.width -= mouseResize.deltaX;
          this.startX += mouseResize.deltaX;
          this.resizer.x += mouseResize.deltaX;
          break;
        case 2:
          this.height -= mouseResize.deltaY;
          this.startY += mouseResize.deltaY;
          this.resizer.y += mouseResize.deltaY;
          break;
        case 3:
          this.width += mouseResize.deltaX;
          this.x += mouseResize.deltaX;
          break;
        case 4:
          this.height += mouseResize.deltaY;
          this.y += mouseResize.deltaY;
          break;
        case 5:
          this.rotation = Element.calculateRotationDegrees(
            mouseResize.positionX,
            mouseResize.positionY,
            this.startX + this.width / 2,
            this.startY + this.height / 2,
          );
          console.log(Element.calculateRotationDegrees(
            mouseResize.positionX,
            mouseResize.positionY,
            this.startX + this.width / 2,
            this.startY + this.height / 2,
          ) * 180 / Math.PI);
          this.rotationChange = true;
          break;
        default:
          console.log('wrong affect parameter');
      }
    }));
  }
   */
}
