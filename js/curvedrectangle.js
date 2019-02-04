import { CANVAS_STATE, ELEMENTS } from './globals';
import Element from './elements';
import Editor from './editor';

const mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  width: 0,
  height: 0,
};

const canvasClearParam = {
  x: CANVAS_STATE.canvas.viewPort.topLeft.x,
  y: CANVAS_STATE.canvas.viewPort.topLeft.y,
  width: CANVAS_STATE.canvas.width,
  height: CANVAS_STATE.canvas.height,
};

export default class CurvedRectangle extends Element {
  constructor(name, properties, events, element, style) {
    super(name, properties, events, element, style);
    this.draw = function (canvas) {
      canvas.ctx.strokeRect(this.x, this.y, this.width, this.height);
    };
  }

  static mouseDown(e) {
    this.started = true;
    mouse.startX = e.clientX;
    mouse.startY = e.clientY;
  }

  static mouseMove(e, canvas) {
    if (this.started) {
      mouse.x = Math.min(e.screenX, mouse.startX);
      mouse.y = Math.min(e.screenY, mouse.startY);
      mouse.width = Math.abs(e.screenX - mouse.startX);
      mouse.height = Math.abs(e.screenY - mouse.startY);
      Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
      canvas.upperCanvas.ctx.beginPath();
      canvas.upperCanvas.ctx.moveTo(mouse.startX + mouse.startX / 1.618, mouse.startY);
      canvas.upperCanvas.ctx.lineTo(mouse.x - mouse.x / 1.618, mouse.startY);
      canvas.upperCanvas.ctx.quadraticCurveTo(mouse.x, mouse.startY, mouse.x, mouse.startY - mouse.y / 1.618);
      canvas.upperCanvas.ctx.lineTo(mouse.x, mouse.y + mouse.y / 1.618);
      canvas.upperCanvas.ctx.quadraticCurveTo(mouse.x, mouse.y, mouse.x - mouse.x / 1.618, mouse.y);
      canvas.upperCanvas.ctx.lineTo(mouse.startX + mouse.startX / 1.618, mouse.y);
      canvas.upperCanvas.ctx.quadraticCurveTo(mouse.startX, mouse.y, mouse.x, mouse.y + mouse.y / 1.618);
      canvas.upperCanvas.ctx.lineTo(mouse.startX, mouse.startY - mouse.startY / 1.618);
      canvas.upperCanvas.ctx.quadraticCurveTo(mouse.startX, mouse.startY, mouse.startX + mouse.startX / 1.618, mouse.startY);
      canvas.upperCanvas.ctx.stroke();
    }
  }

  static mouseUp(e, canvas, tool) {
    if (this.started) {
      this.mouseMove(e, canvas);
      this.started = false;
      const element = {
        x: mouse.x,
        y: mouse.y,
        width: mouse.width,
        height: mouse.height,
      };
      const rect = new Rectangle(
        tool.name,
        tool.properties,
        tool.events,
        element,
        null,
      );
      ELEMENTS.push(rect);
      Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
      Editor.canvasUpdate(canvas.canvas, true, canvasClearParam);
    }
  }
}
