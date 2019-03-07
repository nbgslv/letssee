import Element from '../elements';

const mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  radiusX: 0,
  radiusY: 0,
  centerX: 0,
  centerY: 0,
};

export default class Ellipse extends Element {
  constructor(name, properties, events, editor, element, style) {
    super(name, properties, events, editor, element, style);
    this.width = Math.abs(this.startX - element.endX);
    this.height = Math.abs(this.startY - element.endY);
    this.centerX = this.startX + (Math.abs(this.startX - element.endX) / 2);
    this.centerY = this.startY + (Math.abs(this.startY - element.endY) / 2);
    this.endX = element.endX;
    this.endY = element.endY;
    this.radiusX = this.width / 2;
    this.radiusY = this.height / 2;
  }

  draw(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
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

  static mouseDown(e, tool) {
    this.started = true;
    const relativeMousePosition = tool.relativeMousePosition(e);
    mouse.startX = relativeMousePosition.x;
    mouse.startY = relativeMousePosition.y;
  }

  static mouseMove(e, tool) {
    let element;
    if (this.started) {
      element = this.createElement(e, tool);
      element.editor.canvasUpdate(0, false);
      element.draw(false);
    }
    return element;
  }

  static mouseUp(e, tool) {
    if (this.started) {
      const element = this.mouseMove(e, tool);
      element.editor.elements.push(element);
      element.editor.canvasUpdate(2, true);
      this.started = false;
    }
  }

  static createElement(e, tool) {
    const relativeMousePosition = tool.relativeMousePosition(e);
    mouse.x = relativeMousePosition.x;
    mouse.y = relativeMousePosition.y;
    let startX;
    let startY;
    let endX;
    let endY;
    if (mouse.startX > mouse.x) {
      startX = mouse.x;
      endX = mouse.startX;
    } else {
      startX = mouse.startX;
      endX = mouse.x;
    }
    if (mouse.startY > mouse.y) {
      startY = mouse.y;
      endY = mouse.startY;
    } else {
      startY = mouse.startY;
      endY = mouse.y;
    }
    const element = {
      startX,
      startY,
      endX,
      endY,
      x: mouse.startX,
      y: mouse.startY,
      resizer: {
        x: startX,
        y: startY,
      },
    };
    return new Ellipse(
      tool.name,
      tool.properties,
      tool.events,
      tool.editor,
      element,
      null,
    );
  }
}

// TODO add shift/ctrl button functionality for circle drawing
