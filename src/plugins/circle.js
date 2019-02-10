import Element from '../elements';

const mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  radiusX: 0,
  radiusY: 0,
};

export default class Ellipse extends Element {
  constructor(name, properties, events, editor, element, style) {
    super(name, properties, events, editor, element, style);
    this.startX = element.startX;
    this.startY = element.startY;
    this.radiusX = element.radiusX;
    this.radiusY = element.radiusY;
  }

  draw() {
    this.editor.canvas.canvas.ctx.beginPath();
    this.editor.canvas.canvas.ctx.ellipse(
      this.startX,
      this.startY,
      this.radiusX,
      this.radiusY,
      0,
      0,
      2 * Math.PI,
    );
    this.editor.canvas.canvas.ctx.stroke();
  }

  static mouseDown(e) {
    this.started = true;
    mouse.startX = e.clientX;
    mouse.startY = e.clientY;
  }

  static mouseMove(e) {
    let element;
    if (this.started) {
      element = this.createElement(e);
      element.draw();
      element.editor.canvasUpdate(true);
    }

    return element;
  }

  static mouseUp(e) {
    if (this.started) {
      const element = this.mouseMove(e);
      element.editor.elements.push(element);
      element.editor.canvasUpdate(false);
      element.editor.canvasUpdate(true);
      this.started = false;
    }
  }

  static createElement(e) {
    mouse.x = e.screenX;
    mouse.radiusX = Math.abs(mouse.x - mouse.startX) / 2;
    mouse.y = e.screenY;
    mouse.radiusY = Math.abs(mouse.y - mouse.startY) / 2;
    const element = {
      startX: mouse.startX,
      startY: mouse.startY,
      radiusX: mouse.radiusX,
      radiusY: mouse.radiusY,
      x: mouse.x,
      y: mouse.y,
      width: mouse.x - mouse.startX,
      height: mouse.y - mouse.startY,
    };
    const ellipse = new Ellipse(
      this.name,
      this.properties,
      this.events,
      this.editor,
      element,
      null,
    );

    return ellipse;
  }
}

// TODO add shift/ctrl button functionality for circle drawing
