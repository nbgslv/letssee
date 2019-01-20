import Editor from './editor';
import { Elements } from './element';
import { CANVAS_STATE } from './globals';
import Utilities from './utilities';

export default class ZoomInOut {
  static canvasZoomIn(e, canvas) {
    const scale = 1.1;
    const mouse = Utilities.checkMousePosition(e, canvas);
    const newZoom = CANVAS_STATE.canvas.zoom * scale;

    canvas.upperCanvas.ctx.translate(
      (canvas.upperCanvas.width / 2 - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.upperCanvas.width / 2)),
      (canvas.upperCanvas.height / 2 - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.upperCanvas.height / 2)),
    );
    canvas.upperCanvas.ctx.scale(scale, scale);
    canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);

    canvas.canvas.ctx.translate(
      (canvas.canvas.width / 2 - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.canvas.width / 2)),
      (canvas.canvas.height / 2 - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.canvas.height / 2)),
    );
    console.log(canvas.canvas.width / 2 - (newZoom / CANVAS_STATE.canvas.zoom)
      * (canvas.canvas.width / 2));
    canvas.canvas.ctx.scale(scale, scale);
    canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    Elements.forEach((element) => {
      canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
    });

    CANVAS_STATE.canvas.zoom = newZoom;
  }

  static canvasZoomOut(e, canvas) {
    const scale = 0.9;
    const mouse = Utilities.checkMousePosition(e, canvas);
    const newZoom = CANVAS_STATE.canvas.zoom * scale;

    canvas.upperCanvas.ctx.translate(
      (canvas.upperCanvas.width / 2 - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.upperCanvas.width / 2)),
      (canvas.upperCanvas.height / 2 - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.upperCanvas.height / 2)),
    );

    canvas.upperCanvas.ctx.scale(scale, scale);
    canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);

    canvas.canvas.ctx.translate(
      (canvas.canvas.width / 2 - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.canvas.width / 2)),
      (canvas.canvas.height / 2 - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.canvas.height / 2)),
    );
    console.log(-canvas.canvas.width / 2 - (newZoom / CANVAS_STATE.canvas.zoom)
      * (canvas.canvas.width / 2));
    canvas.canvas.ctx.scale(scale, scale);
    canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    Elements.forEach((element) => {
      canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
    });
    CANVAS_STATE.canvas.zoom = newZoom;
  }
}
