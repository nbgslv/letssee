import Element from '../elements';

export default class Ellipse extends Element {
  constructor(name, moduleName, properties, events, editor) {
    super(name, moduleName, properties, events, editor);
    this.width = 0;
    this.height = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.endX = 0;
    this.endY = 0;
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
    editor.ctx.restore();
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
    this.dimensions.width = Math.abs(startX - endX);
    this.dimensions.height = Math.abs(startY - endY);
    this.radiusX = width / 2;
    this.radiusY = height / 2;
    this.centerX = startX + this.radiusX;
    this.centerY = startY + this.radiusY;
  }

  resize(mouseResize, affecter) {
    affecter.forEach((affect) => {
      switch (affect) {
        case 1:
          this.startX += mouseResize.deltaX / 2;
          this.centerX += mouseResize.deltaX / 2;
          this.width -= mouseResize.deltaX;
          this.radiusX -= mouseResize.deltaX / 2;
          this.resizer.x = this.centerX - this.radiusX;
          break;
        case 2:
          this.startY += mouseResize.deltaY / 2;
          this.centerY += mouseResize.deltaY / 2;
          this.height -= mouseResize.deltaY;
          this.radiusY -= mouseResize.deltaY / 2;
          this.resizer.y = this.centerY - this.radiusY;
          break;
        case 3:
          this.startX += mouseResize.deltaX / 2;
          this.centerX += mouseResize.deltaX / 2;
          this.width += mouseResize.deltaX;
          this.radiusX += mouseResize.deltaX / 2;
          this.resizer.x = this.centerX - this.radiusX;
          break;
        case 4:
          this.startY += mouseResize.deltaY / 2;
          this.centerY += mouseResize.deltaY / 2;
          this.height += mouseResize.deltaY;
          this.radiusY += mouseResize.deltaY / 2;
          this.resizer.y = this.centerY - this.radiusY;
          break;
        case 5:
          this.rotation = Element.calculateRotationDegrees(
            mouseResize.positionX,
            mouseResize.positionY,
            this.startX + this.width / 2,
            this.startY + this.height / 2,
          );
          this.rotationChange = true;
          break;
        default:
          console.log('wrong affect number used');
      }
    });
  }

  move(mouseMove) {
    this.startX += mouseMove.deltaX;
    this.startY += mouseMove.deltaY;
    this.endX += mouseMove.deltaX;
    this.endY += mouseMove.deltaY;
    this.x += mouseMove.deltaX;
    this.y += mouseMove.deltaY;
    this.centerX += mouseMove.deltaX;
    this.centerY += mouseMove.deltaY;
    this.resizer.x += mouseMove.deltaX;
    this.resizer.y += mouseMove.deltaY;
  }
}

// TODO add shift/ctrl button functionality for circle drawing
