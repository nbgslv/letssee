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
  draw() {
    this.editor.canvas.canvas.ctx.strokeRect(this.x, this.y, this.width, this.height);
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
      element.editor.canvasUpdate(false);
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
    mouse.x = Math.min(e.screenX, mouse.startX);
    mouse.y = Math.min(e.screenY, mouse.startY);
    mouse.width = Math.abs(e.screenX - mouse.startX);
    mouse.height = Math.abs(e.screenY - mouse.startY);
    const element = {
      x: mouse.x,
      y: mouse.y,
      width: mouse.width,
      height: mouse.height,
    };
    const rectangle = new Rectangle(
      this.name,
      this.properties,
      this.events,
      this.editor,
      element,
      null,
    );
    rectangle.draw();

    return rectangle;
  }
}
