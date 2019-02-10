import Element from '../elements';

const mouse = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  startX: 0,
  startY: 0,
  curveXY: 25,
  curveX: this.curveXY,
  curveY: this.curveXY,
};

export default class CurvedRectangle extends Element {
  constructor(name, properties, events, editor, element, style) {
    super(name, properties, events, editor, element, style);
    this.startX = element.startX;
    this.startY = element.startY;
    this.curveXY = element.curveXY;
    this.curveX = element.curveX;
    this.curveY = element.curveY;
  }

  draw() {
    this.width = Math.abs(this.x - this.startX);
    this.height = Math.abs(this.y - this.startY);
    this.curveX = this.width <= this.curveXY * 2 ? Math.abs(this.width) / 2 : this.curveXY;
    this.curveY = this.height <= this.curveXY * 2 ? Math.abs(this.height) / 2 : this.curveXY;
    this.canvas.canvas.ctx.beginPath();
    if (this.x > this.startX && this.y > this.startY) {
      this.canvas.canvas.ctx.moveTo(this.startX + this.curveX, this.startY);
      this.canvas.canvas.ctx.lineTo(this.x - this.curveX, this.startY);
      this.canvas.canvas.ctx.quadraticCurveTo(
        this.x,
        this.startY,
        this.x,
        this.startY + this.curveY,
      );
      this.canvas.canvas.ctx.lineTo(this.x, this.y - this.curveY);
      this.canvas.canvas.ctx.quadraticCurveTo(this.x, this.y, this.x - this.curveX, this.y);
      this.canvas.canvas.ctx.lineTo(this.startX + this.curveX, this.y);
      this.canvas.canvas.ctx.quadraticCurveTo(
        this.startX,
        this.y,
        this.startX,
        this.y - this.curveY,
      );
      this.canvas.canvas.ctx.lineTo(this.startX, this.startY + this.curveY);
      this.canvas.canvas.ctx.quadraticCurveTo(
        this.startX,
        this.startY,
        this.startX + this.curveX,
        this.startY,
      );
    } else if (this.x < this.startX && this.y < this.startY) {
      this.canvas.canvas.ctx.moveTo(this.startX - this.curveX, this.startY);
      this.canvas.canvas.ctx.lineTo(this.x + this.curveX, this.startY);
      this.canvas.canvas.ctx.quadraticCurveTo(
        this.x,
        this.startY,
        this.x,
        this.startY - this.curveY,
      );
      this.canvas.canvas.ctx.lineTo(this.x, this.y + this.curveY);
      this.canvas.canvas.ctx.quadraticCurveTo(this.x, this.y, this.x + this.curveX, this.y);
      this.canvas.canvas.ctx.lineTo(this.startX - this.curveX, this.y);
      this.canvas.canvas.ctx.quadraticCurveTo(
        this.startX,
        this.y,
        this.startX,
        this.y + this.curveY,
      );
      this.canvas.canvas.ctx.lineTo(this.startX, this.startY - this.curveY);
      this.canvas.canvas.ctx.quadraticCurveTo(
        this.startX,
        this.startY,
        this.startX - this.curveX,
        this.startY,
      );
    } else if (this.x < this.startX && this.y > this.startY) {
      this.canvas.canvas.ctx.moveTo(this.startX - this.curveX, this.startY);
      this.canvas.canvas.ctx.lineTo(this.x + this.curveX, this.startY);
      this.canvas.canvas.ctx.quadraticCurveTo(
        this.x,
        this.startY,
        this.x,
        this.startY + this.curveY,
      );
      this.canvas.canvas.ctx.lineTo(this.x, this.y - this.curveY);
      this.canvas.canvas.ctx.quadraticCurveTo(this.x, this.y, this.x + this.curveX, this.y);
      this.canvas.canvas.ctx.lineTo(this.startX - this.curveX, this.y);
      this.canvas.canvas.ctx.quadraticCurveTo(
        this.startX,
        this.y,
        this.startX,
        this.y - this.curveY,
      );
      this.canvas.canvas.ctx.lineTo(this.startX, this.startY + this.curveY);
      this.canvas.canvas.ctx.quadraticCurveTo(
        this.startX,
        this.startY,
        this.startX - this.curveX,
        this.startY,
      );
    } else if (this.x > this.startX && this.y < this.startY) {
      this.canvas.canvas.ctx.moveTo(this.startX + this.curveX, this.startY);
      this.canvas.canvas.ctx.lineTo(this.x - this.curveX, this.startY);
      this.canvas.canvas.ctx.quadraticCurveTo(
        this.x,
        this.startY,
        this.x,
        this.startY - this.curveY,
      );
      this.canvas.canvas.ctx.lineTo(this.x, this.y + this.curveY);
      this.canvas.canvas.ctx.quadraticCurveTo(this.x, this.y, this.x - this.curveX, this.y);
      this.canvas.canvas.ctx.lineTo(this.startX + this.curveX, this.y);
      this.canvas.canvas.ctx.quadraticCurveTo(
        this.startX,
        this.y,
        this.startX,
        this.y + this.curveY,
      );
      this.canvas.canvas.ctx.lineTo(this.startX, this.startY - this.curveY);
      this.canvas.canvas.ctx.quadraticCurveTo(
        this.startX,
        this.startY,
        this.startX + this.curveX,
        this.startY,
      );
    }
    this.canvas.canvas.ctx.stroke();
  }

  drawResizeFrame() {
    this.editor.canvas.upperCanvas.ctx.beginPath();
    this.editor.canvas.upperCanvas.ctx.strokeRect(
      this.x - 10,
      this.y - 10,
      this.width + 10,
      this.height + 10,
    );
    this.editor.canvas.upperCanvas.ctx.fillRect(
      this.x + this.width / 2 - 5,
      this.y,
      10,
      10,
    );
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
    mouse.x = e.clientX;
    mouse.y = e.clientY;
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
    };
    const curvedRect = new CurvedRectangle(
      this.name,
      this.properties,
      this.events,
      this.editor,
      element,
      null,
    );
    curvedRect.draw();

    return curvedRect;
  }
}

// TODO make code less complicate + use this.draw instead of repeating draw functions each module
