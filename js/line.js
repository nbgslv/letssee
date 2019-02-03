import { CANVAS_STATE, ELEMENTS } from './globals';
import Element from './elements';
import Editor from './editor';

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

export default class Line extends Element {
  constructor(startX, startY, x, y, style) {
    const element = {
      startX,
      startY,
      x,
      y,
    };
    super(element, style);
  }

  static mouseDown(e) {
    this.started = true;
    mouse.startX = e.clientX;
    mouse.startY = e.clientY;
  }

  static mouseMove(e, canvas) {
    if (this.started) {
      mouse.x = e.screenX;
      mouse.y = e.screenY;
      Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
      canvas.upperCanvas.ctx.moveTo(mouse.startX, mouse.startY);
      canvas.upperCanvas.ctx.lineTo(mouse.x, mouse.y);
      canvas.upperCanvas.ctx.stroke();
    }
  }

  static mouseUp(e, canvas, tool) {
    if (this.started) {
      this.mouseMove(e, canvas);
      this.started = false;
      const line = new Element(tool.name, tool.properties, tool.events, mouse.x, mouse.y, mouse.x - mouse.startX, mouse.y - mouse.startY);
      ELEMENTS.push(line);
      Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
      Editor.canvasUpdate(canvas.canvas, true, canvasClearParam);
    }
  }

  static Redo(e, canvas, tool, element) {
    canvas.canvas.ctx.moveTo(element.startX, element.startY);
    canvas.canvas.ctx.lineTo(element.x, element.y);
  }
}
