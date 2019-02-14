import Element from '../elements';

const mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
};

export default class Triangle extends Element {
  constructor(name, properties, events, editor, element, style) {
    super(name, properties, events, editor, element, style);
    this.startX = element.startX;
    this.startY = element.startY;
  }

  draw(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    editor.ctx.beginPath();
    editor.ctx.moveTo(this.startX, this.startY);
    editor.ctx.lineTo(this.startX - this.x + this.startX, this.y);
    editor.ctx.lineTo(this.x, this.y);
    editor.ctx.lineTo(this.startX, this.startY);
    editor.ctx.stroke();
  }

  static mouseDown(e) {
    this.started = true;
    mouse.startX = e.clientX;
    mouse.startY = e.clientY;
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
      element.editor.canvasUpdate(0, true);
      this.started = false;
    }
  }

  static createElement(e, tool) {
    mouse.x = e.screenX;
    mouse.radiusX = Math.abs(mouse.x - mouse.startX) / 2;
    mouse.y = e.screenY;
    mouse.radiusY = Math.abs(mouse.y - mouse.startY) / 2;
    const element = {
      startX: mouse.startX,
      startY: mouse.startY,
      x: mouse.x,
      y: mouse.y,
      width: (mouse.x - mouse.startX) * 2,
      height: mouse.y - mouse.startY,
    };
    const triangle = new Triangle(
      tool.name,
      tool.properties,
      tool.events,
      tool.editor,
      element,
      null,
    );

    return triangle;
  }
}
