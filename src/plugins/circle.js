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
    this.endX = element.endX;
    this.endY = element.endY;
    this.radiusX = element.radiusX;
    this.radiusY = element.radiusY;
  }

  draw(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    editor.ctx.beginPath();
    editor.ctx.ellipse(
      this.startX,
      this.startY,
      this.radiusX,
      this.radiusY,
      0,
      0,
      2 * Math.PI,
    );
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
      element.editor.canvasUpdate(2, true);
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
      endX: mouse.x,
      endY: mouse.y,
      radiusX: mouse.radiusX,
      radiusY: mouse.radiusY,
      x: mouse.startX,
      y: mouse.startY,
      width: mouse.radiusX * 2,
      height: mouse.radiusY * 2,
      resizer: {
        x: mouse.startX - mouse.radiusX,
        y: mouse.startY - mouse.radiusY,
      },
    };
    const ellipse = new Ellipse(
      tool.name,
      tool.properties,
      tool.events,
      tool.editor,
      element,
      null,
    );
    return ellipse;
  }
}

// TODO add shift/ctrl button functionality for circle drawing
