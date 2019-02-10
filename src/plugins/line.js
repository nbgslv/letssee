import Element from '../elements';

const mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
};

export default class Line extends Element {
  constructor(name, properties, events, editor, element, style) {
    super(name, properties, events, editor, element, style);
    this.startX = element.startX;
    this.startY = element.startY;
  }

  draw() {
    this.editor.canvas.ctx.beginPath();
    this.editor.canvas.ctx.moveTo(this.startX, this.startY);
    this.editor.canvas.ctx.lineTo(this.x, this.y);
    this.editor.canvas.ctx.stroke();
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
    mouse.y = e.screenY;
    const element = {
      startX: mouse.startX,
      startY: mouse.startY,
      x: mouse.x,
      y: mouse.y,
      width: mouse.x - mouse.startX,
      height: mouse.y - mouse.startY,
    };
    const line = new Line(
      this.name,
      this.properties,
      this.events,
      this.editor,
      element,
      null,
    );

    return line;
  }
}
