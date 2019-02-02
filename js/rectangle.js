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

const canvasClearParam = {
  x: CANVAS_STATE.canvas.viewPort.topLeft.x,
  y: CANVAS_STATE.canvas.viewPort.topLeft.y,
  width: CANVAS_STATE.canvas.width,
  height: CANVAS_STATE.canvas.height,
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
      Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
      canvas.upperCanvas.ctx.strokeRect(mouse.x, mouse.y, mouse.width, mouse.height);
    }
  }

  static mouseUp(e, canvas, tool) {
    if (this.started) {
      this.mouseMove(e, canvas);
      this.started = false;
      const rect = new Element(mouse.x, mouse.y, mouse.width, mouse.height, tool);
      Elements.push(rect);
      Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
      Editor.canvasUpdate(canvas.canvas, true, canvasClearParam);
    }
  }

  static Redo(e, canvas, tool, element) {
    canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
  }
}
