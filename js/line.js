import { CANVAS_STATE } from './globals';
import { Element, Elements } from './element';
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

export default class Line {
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

  static mouseUp(e, canvas) {
    if (this.started) {
      this.mouseMove(e, canvas);
      this.started = false;
      const line = new Element(mouse.x, mouse.y, mouse.x - mouse.startX, mouse.y - mouse.startY);
      Elements.push(line);
      Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
      Editor.canvasUpdate(canvas.canvas, true, canvasClearParam);
    }
  }
}
