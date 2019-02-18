import Element from '../elements';

const mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  width: 0,
  height: 0,
};

export default class Rectangle extends Element {
  draw(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    editor.ctx.strokeRect(this.startX, this.startY, this.width, this.height);
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
    mouse.width = Math.abs(e.screenX - mouse.startX);
    mouse.height = Math.abs(e.screenY - mouse.startY);
    const element = {
      startX: Math.min(e.screenX, mouse.startX),
      startY: Math.min(e.screenY, mouse.startY),
      x: mouse.x,
      y: mouse.y,
      width: mouse.width,
      height: mouse.height,
      resizer: {
        x: Math.min(e.screenX, mouse.startX),
        y: Math.min(e.screenY, mouse.startY),
      },
    };
    const rectangle = new Rectangle(
      tool.name,
      tool.properties,
      tool.events,
      tool.editor,
      element,
      null,
    );
    return rectangle;
  }
}
