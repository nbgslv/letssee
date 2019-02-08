import { CANVAS_STATE, ELEMENTS } from '../globals';
import Element from '../elements';
import Editor from '../editor';

const canvasClearParam = {
  x: CANVAS_STATE.canvas.viewPort.topLeft.x,
  y: CANVAS_STATE.canvas.viewPort.topLeft.y,
  width: CANVAS_STATE.canvas.width,
  height: CANVAS_STATE.canvas.height,
};

export default class CurvedRectangle extends Element {
  constructor(name, properties, events, canvas, element, style) {
    super(name, properties, events, element, style);
    this.startX = element.startX;
    this.startY = element.startY;
    this.curveXY = element.curveXY;
    this.curveX = element.curveX;
    this.curveY = element.curveY;
    this.draw = function () {
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
    };
  }

  static mouseDown(e) {
    this.started = true;
    mouse.startX = e.clientX;
    mouse.startY = e.clientY;
  }

  static mouseMove(e, editor) {
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
    if (this.started) {
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
        this.tool.name,
        this.tool.properties,
        this.tool.events,
        this.canvas,
        element,
        null,
      );
      curvedRect.draw();

      .canvasUpdate(editor.canvas.upperCanvas, false, canvasClearParam);
      editor.canvas.upperCanvas.ctx.beginPath();
      if (mouse.x > mouse.startX && mouse.y > mouse.startY) {
        editor.canvas.upperCanvas.ctx.moveTo(mouse.startX + mouse.curveX, mouse.startY);
        editor.canvas.upperCanvas.ctx.lineTo(mouse.x - mouse.curveX, mouse.startY);
        editor.canvas.upperCanvas.ctx.quadraticCurveTo(
          mouse.x,
          mouse.startY,
          mouse.x,
          mouse.startY + mouse.curveY,
        );
        editor.canvas.upperCanvas.ctx.lineTo(mouse.x, mouse.y - mouse.curveY);
        editor.canvas.upperCanvas.ctx.quadraticCurveTo(mouse.x, mouse.y, mouse.x - mouse.curveX, mouse.y);
        canvas.upperCanvas.ctx.lineTo(mouse.startX + mouse.curveX, mouse.y);
        canvas.upperCanvas.ctx.quadraticCurveTo(
          mouse.startX,
          mouse.y,
          mouse.startX,
          mouse.y - mouse.curveY,
        );
        canvas.upperCanvas.ctx.lineTo(mouse.startX, mouse.startY + mouse.curveY);
        canvas.upperCanvas.ctx.quadraticCurveTo(
          mouse.startX,
          mouse.startY,
          mouse.startX + mouse.curveX,
          mouse.startY,
        );
      } else if (mouse.x < mouse.startX && mouse.y < mouse.startY) {
        canvas.upperCanvas.ctx.moveTo(mouse.startX - mouse.curveX, mouse.startY);
        canvas.upperCanvas.ctx.lineTo(mouse.x + mouse.curveX, mouse.startY);
        canvas.upperCanvas.ctx.quadraticCurveTo(
          mouse.x,
          mouse.startY,
          mouse.x,
          mouse.startY - mouse.curveY,
        );
        canvas.upperCanvas.ctx.lineTo(mouse.x, mouse.y + mouse.curveY);
        canvas.upperCanvas.ctx.quadraticCurveTo(mouse.x, mouse.y, mouse.x + mouse.curveX, mouse.y);
        canvas.upperCanvas.ctx.lineTo(mouse.startX - mouse.curveX, mouse.y);
        canvas.upperCanvas.ctx.quadraticCurveTo(
          mouse.startX,
          mouse.y,
          mouse.startX,
          mouse.y + mouse.curveY,
        );
        canvas.upperCanvas.ctx.lineTo(mouse.startX, mouse.startY - mouse.curveY);
        canvas.upperCanvas.ctx.quadraticCurveTo(
          mouse.startX,
          mouse.startY,
          mouse.startX - mouse.curveX,
          mouse.startY,
        );
      } else if (mouse.x < mouse.startX && mouse.y > mouse.startY) {
        canvas.upperCanvas.ctx.moveTo(mouse.startX - mouse.curveX, mouse.startY);
        canvas.upperCanvas.ctx.lineTo(mouse.x + mouse.curveX, mouse.startY);
        canvas.upperCanvas.ctx.quadraticCurveTo(
          mouse.x,
          mouse.startY,
          mouse.x,
          mouse.startY + mouse.curveY,
        );
        canvas.upperCanvas.ctx.lineTo(mouse.x, mouse.y - mouse.curveY);
        canvas.upperCanvas.ctx.quadraticCurveTo(mouse.x, mouse.y, mouse.x + mouse.curveX, mouse.y);
        canvas.upperCanvas.ctx.lineTo(mouse.startX - mouse.curveX, mouse.y);
        canvas.upperCanvas.ctx.quadraticCurveTo(
          mouse.startX,
          mouse.y,
          mouse.startX,
          mouse.y - mouse.curveY,
        );
        canvas.upperCanvas.ctx.lineTo(mouse.startX, mouse.startY + mouse.curveY);
        canvas.upperCanvas.ctx.quadraticCurveTo(
          mouse.startX,
          mouse.startY,
          mouse.startX - mouse.curveX,
          mouse.startY,
        );
      } else if (mouse.x > mouse.startX && mouse.y < mouse.startY) {
        canvas.upperCanvas.ctx.moveTo(mouse.startX + mouse.curveX, mouse.startY);
        canvas.upperCanvas.ctx.lineTo(mouse.x - mouse.curveX, mouse.startY);
        canvas.upperCanvas.ctx.quadraticCurveTo(
          mouse.x,
          mouse.startY,
          mouse.x,
          mouse.startY - mouse.curveY,
        );
        canvas.upperCanvas.ctx.lineTo(mouse.x, mouse.y + mouse.curveY);
        canvas.upperCanvas.ctx.quadraticCurveTo(mouse.x, mouse.y, mouse.x - mouse.curveX, mouse.y);
        canvas.upperCanvas.ctx.lineTo(mouse.startX + mouse.curveX, mouse.y);
        canvas.upperCanvas.ctx.quadraticCurveTo(
          mouse.startX,
          mouse.y,
          mouse.startX,
          mouse.y + mouse.curveY,
        );
        canvas.upperCanvas.ctx.lineTo(mouse.startX, mouse.startY - mouse.curveY);
        canvas.upperCanvas.ctx.quadraticCurveTo(
          mouse.startX,
          mouse.startY,
          mouse.startX + mouse.curveX,
          mouse.startY,
        );
      }
      canvas.upperCanvas.ctx.stroke();
    }
  }

  static mouseUp(e, canvas, tool) {
    if (this.started) {
      this.mouseMove(e, canvas);
      this.started = false;
      ELEMENTS.push(curvedRect);
      Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
      Editor.canvasUpdate(canvas.canvas, true, canvasClearParam);
    }
  }
}

// TODO make code less complicate + use this.draw instead of repeating draw functions each module
