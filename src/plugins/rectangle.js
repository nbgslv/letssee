import Element from '../elements';

export default class Rectangle extends Element {
  draw(canvas = true) {
    const editor = super.draw(canvas);
    editor.ctx.strokeRect(this.startX, this.startY, this.width, this.height);
    editor.ctx.restore();
  }

  rotate(editor) {
    editor.ctx.setTransform(1, 0, 0, 1, 0, 0);
    const translationPointX = this.startX + this.width / 2;
    const translationPointY = this.startY + this.height / 2;
    editor.ctx.translate(translationPointX, translationPointY);
    const rotation = this.rotation === 0 ? 0.01 : this.rotation - 90 * Math.PI / 180;
    console.log(this.rotation);
    editor.ctx.rotate(rotation);
    this.rotationChange = false;
    editor.ctx.translate(-translationPointX, -translationPointY);
  }

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
}
