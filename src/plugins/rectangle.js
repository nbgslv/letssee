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
    const editor = super.draw(canvas);
    editor.ctx.strokeRect(this.startX, this.startY, this.width, this.height);
    editor.ctx.restore();
  }

  rotate(editor) {
    editor.ctx.setTransform(1, 0, 0, 1, 0, 0);
    const translationPointX = this.startX + this.width / 2;
    const translationPointY = this.startY + this.height / 2;
    editor.ctx.translate(translationPointX, translationPointY);
    const rotation = this.rotation === 0 ? 0.01 : this.rotation - 90 * Math.PI / 180;
    console.log(this.rotation);
    editor.ctx.rotate(rotation);
    this.rotationChange = false;
    editor.ctx.translate(-translationPointX, -translationPointY);
    /*
    const updatedCoord = Rectangle.updatedCoord(
      translationPointX,
      translationPointY,
      this.startX,
      this.startY,
      rotation * Math.PI / 180,
    );
    this.resizer.x = updatedCoord.newX;
    this.resizer.y = updatedCoord.newY;
    */
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
    mouse.width = Math.abs(mouse.x - mouse.startX);
    mouse.height = Math.abs(mouse.y - mouse.startY);
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
    return new Rectangle(
      tool.name,
      tool.properties,
      tool.events,
      tool.editor,
      element,
      null,
    );
  }

  static updatedCoord(centerX, centerY, oldX, oldY, rotation) {
    const diffX = oldX - centerX;
    const diffY = oldY - centerY;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);

    // find angle from pivot to corner
    rotation += Math.atan2(diffY, diffX);

    // get new x and y and round it off to integer
    const newX = centerX + distance * Math.cos(rotation);
    const newY = centerY + distance * Math.sin(rotation);

    return {
      newX,
      newY,
    };
  }
}
