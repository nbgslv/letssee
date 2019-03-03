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
    this.resizer = {
      x: element.startX > element.x ? element.x : element.x - element.width,
      y: element.startY,
    };
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

  static mouseDown(e, tool) {
    this.started = true;
    mouse.startX = e.pageX - tool.editor.offsetX;
    mouse.startY = e.pageY - tool.editor.offsetY;
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
    mouse.x = e.pageX - tool.editor.offsetX;
    mouse.y = e.pageY - tool.editor.offsetY;
    const element = {
      startX: mouse.startX,
      startY: mouse.startY,
      x: mouse.x,
      y: mouse.y,
      width: Math.abs((mouse.x - mouse.startX) * 2),
      height: Math.abs(mouse.y - mouse.startY),
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
