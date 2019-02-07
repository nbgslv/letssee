import { CANVAS_STATE, ELEMENTS } from '../globals';
import Element from '../elements';
import Editor from '../editor';

const mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
};

const canvasClearParam = {
  x: CANVAS_STATE.canvas.viewPort.topLeft.x,
  y: CANVAS_STATE.canvas.viewPort.topLeft.y,
  width: CANVAS_STATE.canvas.width,
  height: CANVAS_STATE.canvas.height,
};

export default class Triangle extends Element {
  constructor(name, properties, events, element, style) {
    super(name, properties, events, element, style);
    this.startX = element.startX;
    this.startY = element.startY;
    this.draw = function (canvas) {
      canvas.ctx.beginPath();
      canvas.ctx.moveTo(this.startX, this.startY);
      canvas.ctx.lineTo(this.startX - this.x + this.startX, this.y);
      canvas.ctx.lineTo(this.x, this.y);
      canvas.ctx.lineTo(this.startX, this.startY);
      canvas.ctx.stroke();
    };
  }

  static mouseDown(e) {
    this.started = true;
    mouse.startX = e.clientX;
    mouse.startY = e.clientY;
  }

  static mouseMove(e, canvas) {
    if (this.started) {
      mouse.x = e.screenX;
      mouse.radiusX = Math.abs(mouse.x - mouse.startX) / 2;
      mouse.y = e.screenY;
      mouse.radiusY = Math.abs(mouse.y - mouse.startY) / 2;
      Editor.canvasUpdate(canvas.upperCanvas, true, canvasClearParam);
      canvas.upperCanvas.ctx.beginPath();
      canvas.upperCanvas.ctx.moveTo(mouse.startX, mouse.startY);
      canvas.upperCanvas.ctx.lineTo(mouse.startX - mouse.x + mouse.startX, mouse.y);
      canvas.upperCanvas.ctx.lineTo(mouse.x, mouse.y);
      canvas.upperCanvas.ctx.lineTo(mouse.startX, mouse.startY);
      console.log(`x: ${mouse.startX} y: ${mouse.startY}`);
      console.log(`x: ${mouse.startX - mouse.x + mouse.startX} y: ${mouse.y}`);
      console.log(`x: ${mouse.x} y: ${mouse.y}`);
      canvas.upperCanvas.ctx.stroke();
    }
  }

  static mouseUp(e, canvas, tool) {
    if (this.started) {
      this.mouseMove(e, canvas);
      this.started = false;
      const element = {
        startX: mouse.startX,
        startY: mouse.startY,
        x: mouse.x,
        y: mouse.y,
        width: (mouse.x - mouse.startX) * 2,
        height: mouse.y - mouse.startY,
      };
      const line = new Triangle(
        tool.name,
        tool.properties,
        tool.events,
        element,
        null,
      );
      ELEMENTS.push(line);
      Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
      Editor.canvasUpdate(canvas.canvas, true, canvasClearParam);
    }
  }
}
