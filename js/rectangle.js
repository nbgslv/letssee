import { CANVAS_STATE } from './globals';
import { Element, Elements } from './element';
import Editor from './editor';

const mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  width: 0,
  height: 0,
};

export default class Rectangle {
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
      canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);
      canvas.upperCanvas.ctx.strokeRect(mouse.x, mouse.y, mouse.width, mouse.height);
    }
  }

  static mouseUp(e, canvas) {
    if (this.started) {
      this.mouseMove(e, canvas);
      this.started = false;
      const rect = new Element(mouse.x, mouse.y, mouse.width, mouse.height);
      Elements.push(rect);
      const canvasClearParam = {
        x: CANVAS_STATE.canvas.viewPort.topLeft.x,
        y: CANVAS_STATE.canvas.viewPort.topLeft.y,
        width: CANVAS_STATE.canvas.width,
        height: CANVAS_STATE.canvas.height,
      };
      Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
      Editor.canvasUpdate(canvas.canvas, true, canvasClearParam);
    }
  }
}
