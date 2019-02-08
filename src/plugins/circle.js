import { CANVAS_STATE, ELEMENTS } from '../globals';
import Element from '../elements';
import Editor from '../editor';

const mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  radiusX: 0,
  radiusY: 0,
};

const canvasClearParam = {
  x: CANVAS_STATE.canvas.viewPort.topLeft.x,
  y: CANVAS_STATE.canvas.viewPort.topLeft.y,
  width: CANVAS_STATE.canvas.width,
  height: CANVAS_STATE.canvas.height,
};

export default class Ellipse extends Element {
  constructor(name, properties, events, element, style) {
    super(name, properties, events, element, style);
    this.startX = element.startX;
    this.startY = element.startY;
    this.radiusX = element.radiusX;
    this.radiusY = element.radiusY;
    this.draw = function (canvas) {
      canvas.ctx.beginPath();
      canvas.ctx.ellipse(this.startX, this.startY, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
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
      canvas.upperCanvas.ctx.ellipse(
        mouse.startX,
        mouse.startY,
        mouse.radiusX,
        mouse.radiusY,
        0,
        0,
        2 * Math.PI,
      );
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
        radiusX: mouse.radiusX,
        radiusY: mouse.radiusY,
        x: mouse.x,
        y: mouse.y,
        width: mouse.x - mouse.startX,
        height: mouse.y - mouse.startY,
      };
      const ellipse = new Ellipse(
        tool.name,
        tool.properties,
        tool.events,
        element,
        null,
      );
      ELEMENTS.push(ellipse);
      Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
      Editor.canvasUpdate(canvas.canvas, true, canvasClearParam);
    }
  }
}

// TODO add shift/ctrl button functionality for circle drawing
