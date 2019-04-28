import Element from '../elements';
import Utilities from '../utilities';

export default class Line extends Element {
  draw(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    editor.ctx.beginPath();
    editor.ctx.moveTo(this.dimensions.startX, this.dimensions.startY);
    editor.ctx.lineTo(this.dimensions.endX, this.dimensions.endY);
    editor.ctx.stroke();
  }

  endDraw() {
    this.updateElement();
    this.editor.elements.push(this);
    this.editor.renderAll();
  }

  updateElement() {
    const startX = this.editor.events.canvasEvent.mouse.startCanvasX;
    const startY = this.editor.events.canvasEvent.mouse.startCanvasY;
    const endX = this.editor.events.canvasEvent.mouse.canvasX;
    const endY = this.editor.events.canvasEvent.mouse.canvasY;
    this.elementDimensions = {
      startX,
      startY,
      endX,
      endY,
      width: Math.abs(startX - endX),
      height: Math.abs(startY - endY),
    };
    this.editor.renderAll();
    this.draw(false);
  }

  set elementDimensions(dimensions) {
    this.dimensions.startX = dimensions.startX;
    this.dimensions.startY = dimensions.startY;
    this.dimensions.endX = dimensions.endX;
    this.dimensions.endY = dimensions.endY;
    this.dimensions.width = dimensions.width;
    this.dimensions.height = dimensions.height;
    this.resizer.topLeft.x = dimensions.startX;
    this.resizer.topLeft.y = dimensions.startY - 10;
    this.resizer.topRight.x = dimensions.endX;
    this.resizer.topRight.y = dimensions.endY - 10;
    this.resizer.bottomLeft.x = dimensions.startX;
    this.resizer.bottomLeft.y = dimensions.startY + 10;
    this.resizer.bottomRight.x = dimensions.endX;
    this.resizer.bottomRight.y = dimensions.endY + 10;
    this.transformation.rotationAngle += this.calculateLineAngle.angleDifference;
    this.transformation.rotationAngleDifference = this.calculateLineAngle.angleDifference;
    this.rotateResizer();
  }

  rotateResizer() {
    const corners = Object.values(this.resizer);
    const rotationAngle = this.transformation.rotationAngle;
    for (let i = 0; i < corners.length; i += 1) {
      corners[i].rotatedX = (corners[i].x - (this.dimensions.startX + ((this.dimensions.width) / 2))) * Utilities.cos(-rotationAngle)
        + (corners[i].y - (this.dimensions.startY + ((this.dimensions.height) / 2))) * Utilities.sin(-rotationAngle);
      corners[i].rotatedX += this.dimensions.startX + ((this.dimensions.width) / 2);
      corners[i].rotatedY = (corners[i].y - (this.dimensions.startY + ((this.dimensions.height) / 2))) * Utilities.cos(-rotationAngle)
        - (corners[i].x - (this.dimensions.startX + ((this.dimensions.width) / 2))) * Utilities.sin(-rotationAngle);
      corners[i].rotatedY += this.dimensions.startY + ((this.dimensions.height) / 2);
    }
  }

  resize() {
    if (this.editor.events.canvasEvent.resizing) {
      const mouseResize = {
        deltaX: this.editor.events.canvasEvent.mouse.canvasX
          - this.editor.events.canvasEvent.mouse.startCanvasX,
        deltaY: this.editor.events.canvasEvent.mouse.canvasY
          - this.editor.events.canvasEvent.mouse.startCanvasY,
      };
      this.editor.events.canvasEvent.position.resizer.affect.forEach(((affect) => {
        switch (affect) {
          case 1: {
            this.dimensions.width -= mouseResize.deltaX;
            this.dimensions.startX += mouseResize.deltaX;
            this.resizer.topLeft.x += mouseResize.deltaX;
            this.resizer.bottomLeft.x += mouseResize.deltaX;
            this.transformation.transformed = true;
            break;
          }
          case 2: {
            this.dimensions.height -= mouseResize.deltaY;
            this.dimensions.startY += mouseResize.deltaY;
            this.resizer.topRight.y += mouseResize.deltaY;
            this.resizer.topLeft.y += mouseResize.deltaY;
            this.transformation.transformed = true;
            break;
          }
          case 3:
            this.dimensions.width += mouseResize.deltaX;
            this.dimensions.endX += mouseResize.deltaX;
            this.resizer.topRight.x += mouseResize.deltaX;
            this.resizer.bottomRight.x += mouseResize.deltaX;
            this.transformation.transformed = true;
            break;
          case 4:
            this.dimensions.height += mouseResize.deltaY;
            this.dimensions.endY += mouseResize.deltaY;
            this.resizer.bottomLeft.y += mouseResize.deltaY;
            this.resizer.bottomRight.y += mouseResize.deltaY;
            this.transformation.transformed = true;
            break;
          case 5: {
            this.transformation.transform = true;
            const {
              lastAngel,
              newAngel,
            } = this.calcRotateAngle;
            this.transformation.rotationAngleDifference = newAngel - lastAngel;
            this.transformation.rotationAngle = Utilities.radiansToDegrees(
              this.transformation.rotationAngleDifference,
            ) + this.transformation.rotationAngle;
            if (this.transformation.rotationAngle < 0) this.transformation.rotationAngle += 360;
            this.transformation.rotationAngle %= 360;
            break;
          }
          default:
            console.log('wrong affect parameter');
        }
      }));
    }
  }

  get calculateLineAngle() {
    const lastAngle = this.transformation.rotationAngle;
    const newAngle = Math.atan2(this.dimensions.endY - this.dimensions.startY, this.dimensions.endX - this.dimensions.startX);
    return {
      angleDifference: newAngle - lastAngle,
      newAngle,
    };
  }
}
