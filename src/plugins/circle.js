import Element from '../elements';
import Utilities from '../utilities';

export default class Ellipse extends Element {
  constructor(name, moduleName, properties, events, editor) {
    super(name, moduleName, properties, events, editor);
    this.centerX = 0;
    this.centerY = 0;
    this.radiusX = 0;
    this.radiusY = 0;
  }

  draw(canvas = true) {
    const editor = super.draw(canvas);
    editor.ctx.beginPath();
    editor.ctx.ellipse(
      this.centerX,
      this.centerY,
      this.radiusX,
      this.radiusY,
      0,
      0,
      2 * Math.PI,
    );
    editor.ctx.stroke();
  }

  updateElement() {
    const startX = this.editor.events.canvasEvent.mouse.startCanvasX;
    const startY = this.editor.events.canvasEvent.mouse.startCanvasY;
    const endX = this.editor.events.canvasEvent.mouse.canvasX;
    const endY = this.editor.events.canvasEvent.mouse.canvasY;
    this.elementDimensions = {
      startX: Math.min(endX, startX),
      startY: Math.min(endY, startY),
      endX: Math.max(endY, startY),
      endY: Math.max(endY, startY),
      width: Math.abs(startX - endX),
      height: Math.abs(startY - endY),
    };
    this.editor.renderAll();
    this.draw(false);
  }

  set elementDimensions(dimensions) {
    const {
      startX,
      startY,
      endX,
      endY,
      width,
      height,
    } = dimensions;
    this.dimensions.startX = startX;
    this.dimensions.startY = startY;
    this.dimensions.endX = endX;
    this.dimensions.endY = endY;
    this.dimensions.width = width;
    this.dimensions.height = height;
    this.radiusX = width / 2;
    this.radiusY = height / 2;
    this.centerX = startX + this.radiusX;
    this.centerY = startY + this.radiusY;
    this.resizer.topLeft.x = startX;
    this.resizer.topLeft.y = startY;
    this.resizer.topRight.x = this.centerX + this.radiusX;
    this.resizer.topRight.y = startY;
    this.resizer.bottomLeft.x = startX;
    this.resizer.bottomLeft.y = endY;
    this.resizer.bottomRight.x = this.centerX + this.radiusX;
    this.resizer.bottomRight.y = endY;
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
          case 1:
            this.dimensions.startX += mouseResize.deltaX / 2;
            this.centerX += mouseResize.deltaX / 2;
            this.dimensions.width -= mouseResize.deltaX;
            this.radiusX -= mouseResize.deltaX / 2;
            this.resizer.topLeft.x = this.centerX - this.radiusX;
            break;
          case 2:
            this.dimensions.startY += mouseResize.deltaY / 2;
            this.centerY += mouseResize.deltaY / 2;
            this.dimensions.height -= mouseResize.deltaY;
            this.radiusY -= mouseResize.deltaY / 2;
            this.resizer.topLeft.y = this.centerY - this.radiusY;
            break;
          case 3:
            this.dimensions.startX += mouseResize.deltaX / 2;
            this.centerX += mouseResize.deltaX / 2;
            this.dimensions.width += mouseResize.deltaX;
            this.radiusX += mouseResize.deltaX / 2;
            this.resizer.topLeft.x = this.centerX - this.radiusX;
            break;
          case 4:
            this.dimensions.startY += mouseResize.deltaY / 2;
            this.centerY += mouseResize.deltaY / 2;
            this.dimensions.height += mouseResize.deltaY;
            this.radiusY += mouseResize.deltaY / 2;
            this.resizer.topLeft.y = this.centerY - this.radiusY;
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
            console.log('wrong affect number used');
        }
      }));
    }
  }

  drag() {
    if (this.editor.events.canvasEvent.dragging) {
      const mouseMove = {
        deltaX: this.editor.events.canvasEvent.mouse.canvasX
          - this.editor.events.canvasEvent.mouse.startCanvasX,
        deltaY: this.editor.events.canvasEvent.mouse.canvasY
          - this.editor.events.canvasEvent.mouse.startCanvasY,
      };
      this.dimensions.startX += mouseMove.deltaX;
      this.dimensions.startY += mouseMove.deltaY;
      this.dimensions.endX += mouseMove.deltaX;
      this.dimensions.endY += mouseMove.deltaY;
      this.centerX += mouseMove.deltaX;
      this.centerY += mouseMove.deltaY;
      const elementResizers = Object.values(this.resizer);
      elementResizers.forEach((resizer) => {
        resizer.x += mouseMove.deltaX;
        resizer.y += mouseMove.deltaY;
      });
    }
  }
}

// TODO add shift/ctrl button functionality for circle drawing
