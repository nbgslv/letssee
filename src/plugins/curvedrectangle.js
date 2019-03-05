import Element from '../elements';

const mouse = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  startX: 0,
  startY: 0,
  curveXY: 25,
  curveX: 25,
  curveY: 25,
};

// TODO find better way to define curveXY 25

export default class CurvedRectangle extends Element {
  constructor(name, properties, events, editor, element, style) {
    super(name, properties, events, editor, element, style);
    this.startX = element.startX;
    this.startY = element.startY;
    this.curveXY = element.curveXY;
    this.curveX = element.curveX;
    this.curveY = element.curveY;
  }

  draw(canvas = true) {
    this.width = Math.abs(this.x - this.startX);
    this.height = Math.abs(this.y - this.startY);
    this.curveX = this.width <= this.curveXY * 2 ? Math.abs(this.width) / 2 : this.curveXY;
    this.curveY = this.height <= this.curveXY * 2 ? Math.abs(this.height) / 2 : this.curveXY;
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    let transformedStartX;
    let transformedStartY;
    let transformedX;
    let transformedY;
    editor.ctx.beginPath();
    if (this.x > this.startX && this.y > this.startY) {
      editor.ctx.moveTo(this.startX + this.curveX, this.startY);
      editor.ctx.lineTo(this.x - this.curveX, this.startY);
      editor.ctx.quadraticCurveTo(
        this.x,
        this.startY,
        this.x,
        this.startY + this.curveY,
      );
      editor.ctx.lineTo(this.x, this.y - this.curveY);
      editor.ctx.quadraticCurveTo(this.x, this.y, this.x - this.curveX, this.y);
      editor.ctx.lineTo(this.startX + this.curveX, this.y);
      editor.ctx.quadraticCurveTo(
        this.startX,
        this.y,
        this.startX,
        this.y - this.curveY,
      );
      editor.ctx.lineTo(this.startX, this.startY + this.curveY);
      editor.ctx.quadraticCurveTo(
        this.startX,
        this.startY,
        this.startX + this.curveX,
        this.startY,
      );
      transformedStartX = this.startX;
      transformedStartY = this.startY;
      transformedX = this.x;
      transformedY = this.y;
    } else if (this.x < this.startX && this.y < this.startY) {
      editor.ctx.moveTo(this.startX - this.curveX, this.startY);
      editor.ctx.lineTo(this.x + this.curveX, this.startY);
      editor.ctx.quadraticCurveTo(
        this.x,
        this.startY,
        this.x,
        this.startY - this.curveY,
      );
      editor.ctx.lineTo(this.x, this.y + this.curveY);
      editor.ctx.quadraticCurveTo(this.x, this.y, this.x + this.curveX, this.y);
      editor.ctx.lineTo(this.startX - this.curveX, this.y);
      editor.ctx.quadraticCurveTo(
        this.startX,
        this.y,
        this.startX,
        this.y + this.curveY,
      );
      editor.ctx.lineTo(this.startX, this.startY - this.curveY);
      editor.ctx.quadraticCurveTo(
        this.startX,
        this.startY,
        this.startX - this.curveX,
        this.startY,
      );
      transformedStartX = this.x;
      transformedStartY = this.y;
      transformedX = this.startX;
      transformedY = this.startY;
    } else if (this.x < this.startX && this.y > this.startY) {
      editor.ctx.moveTo(this.startX - this.curveX, this.startY);
      editor.ctx.lineTo(this.x + this.curveX, this.startY);
      editor.ctx.quadraticCurveTo(
        this.x,
        this.startY,
        this.x,
        this.startY + this.curveY,
      );
      editor.ctx.lineTo(this.x, this.y - this.curveY);
      editor.ctx.quadraticCurveTo(this.x, this.y, this.x + this.curveX, this.y);
      editor.ctx.lineTo(this.startX - this.curveX, this.y);
      editor.ctx.quadraticCurveTo(
        this.startX,
        this.y,
        this.startX,
        this.y - this.curveY,
      );
      editor.ctx.lineTo(this.startX, this.startY + this.curveY);
      editor.ctx.quadraticCurveTo(
        this.startX,
        this.startY,
        this.startX - this.curveX,
        this.startY,
      );
      transformedStartX = this.x;
      transformedStartY = this.startY;
      transformedX = this.startX;
      transformedY = this.y;
    } else if (this.x > this.startX && this.y < this.startY) {
      editor.ctx.moveTo(this.startX + this.curveX, this.startY);
      editor.ctx.lineTo(this.x - this.curveX, this.startY);
      editor.ctx.quadraticCurveTo(
        this.x,
        this.startY,
        this.x,
        this.startY - this.curveY,
      );
      editor.ctx.lineTo(this.x, this.y + this.curveY);
      editor.ctx.quadraticCurveTo(this.x, this.y, this.x - this.curveX, this.y);
      editor.ctx.lineTo(this.startX + this.curveX, this.y);
      editor.ctx.quadraticCurveTo(
        this.startX,
        this.y,
        this.startX,
        this.y + this.curveY,
      );
      editor.ctx.lineTo(this.startX, this.startY - this.curveY);
      editor.ctx.quadraticCurveTo(
        this.startX,
        this.startY,
        this.startX + this.curveX,
        this.startY,
      );
      transformedStartX = this.startX;
      transformedStartY = this.y;
      transformedX = this.x;
      transformedY = this.startY;
    }
    editor.ctx.stroke();
    this.startX = transformedStartX;
    this.startY = transformedStartY;
    this.x = transformedX;
    this.y = transformedY;
    this.resizer.x = transformedStartX;
    this.resizer.y = transformedStartY;
  }

  static mouseDown(e, tool) {
    const relativeMousePosition = tool.relativeMousePosition(e);
    this.started = true;
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
      element.draw(true);
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
    mouse.curveX = mouse.width <= mouse.curveXY * 2 ? Math.abs(mouse.width) / 2 : mouse.curveXY;
    mouse.curveY = mouse.height <= mouse.curveXY * 2 ? Math.abs(mouse.height) / 2 : mouse.curveXY;
    const element = {
      x: mouse.x,
      y: mouse.y,
      width: mouse.width,
      height: mouse.height,
      startX: mouse.startX,
      startY: mouse.startY,
      curveXY: mouse.curveXY,
      curveX: mouse.curveX,
      curveY: mouse.curveY,
      resizer: {
        x: mouse.startX,
        y: mouse.startY,
      },
    };
    return new CurvedRectangle(
      tool.name,
      tool.properties,
      tool.events,
      tool.editor,
      element,
      null,
    );
  }
}

// TODO make code less complicate + use this.draw instead of repeating draw functions each module
