import { Elements } from './element';
import { CANVAS_STATE } from './globals';

export default class ZoomInOut {
  static canvasZoomIn(e, canvas) {
    const scale = 1.1;
    const newZoom = parseFloat((CANVAS_STATE.canvas.zoom * scale)).toFixed(2);
    console.log(newZoom);

    canvas.upperCanvas.ctx.translate(
      (canvas.upperCanvas.width / 2 - scale
        * (canvas.upperCanvas.width / 2)),
      (canvas.upperCanvas.height / 2 - scale
        * (canvas.upperCanvas.height / 2)),
    );
    canvas.upperCanvas.ctx.scale(scale, scale);
    canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);

    canvas.canvas.ctx.translate(
      (canvas.canvas.width / 2 - scale
        * (canvas.canvas.width / 2)),
      (canvas.canvas.height / 2 - scale
        * (canvas.canvas.height / 2)),
    );

    canvas.canvas.ctx.scale(scale, scale);
    canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    Elements.forEach((element) => {
      canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
    });

    if (newZoom === 1.00) {
      CANVAS_STATE.canvas.viewPort.topLeft.x = 0;
      CANVAS_STATE.canvas.viewPort.topLeft.y = 0;
      CANVAS_STATE.canvas.viewPort.bottomRight.x = canvas.canvas.width;
      CANVAS_STATE.canvas.viewPort.bottomRight.y = canvas.canvas.height;
    } else {
      CANVAS_STATE.canvas.viewPort.topLeft.x += (canvas.canvas.width / 2
        - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.canvas.width / 2));
      CANVAS_STATE.canvas.viewPort.topLeft.y += (canvas.canvas.height / 2
        - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.canvas.height / 2));
      CANVAS_STATE.canvas.viewPort.bottomRight.x -= (canvas.canvas.width / 2
        - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.canvas.width / 2));
      CANVAS_STATE.canvas.viewPort.bottomRight.y -= (canvas.canvas.height / 2
        - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.canvas.height / 2));
      console.log(CANVAS_STATE.canvas.viewPort.topLeft.x);
      console.log(CANVAS_STATE.canvas.viewPort.bottomRight.x);
      CANVAS_STATE.canvas.zoom = newZoom;
      CANVAS_STATE.canvas.width *= scale;
      CANVAS_STATE.canvas.height *= scale;
    }

    CANVAS_STATE.canvas.draggable = canvas.canvas.width < CANVAS_STATE.canvas.width
      || canvas.canvas.height < CANVAS_STATE.canvas.height;
  }

  static canvasZoomOut(e, canvas) {
    const scale = 1 / 1.1;
    const newZoom = parseFloat((CANVAS_STATE.canvas.zoom * scale)).toFixed(2);
    console.log(newZoom);

    canvas.upperCanvas.ctx.translate(
      (canvas.upperCanvas.width / 2 - scale
        * (canvas.upperCanvas.width / 2)),
      (canvas.upperCanvas.height / 2 - scale
        * (canvas.upperCanvas.height / 2)),
    );

    canvas.upperCanvas.ctx.scale(scale, scale);
    canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);

    canvas.canvas.ctx.translate(
      (canvas.canvas.width / 2 - scale
        * (canvas.canvas.width / 2)),
      (canvas.canvas.height / 2 - scale
        * (canvas.canvas.height / 2)),
    );

    canvas.canvas.ctx.scale(scale, scale);
    canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    Elements.forEach((element) => {
      canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
    });

    if (newZoom === 1.00) {
      CANVAS_STATE.canvas.viewPort.topLeft.x = 0;
      CANVAS_STATE.canvas.viewPort.topLeft.y = 0;
      CANVAS_STATE.canvas.viewPort.bottomRight.x = canvas.canvas.width;
      CANVAS_STATE.canvas.viewPort.bottomRight.y = canvas.canvas.height;
    } else {
      CANVAS_STATE.canvas.viewPort.topLeft.x += (canvas.canvas.width / 2
        - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.canvas.width / 2));
      CANVAS_STATE.canvas.viewPort.topLeft.y += (canvas.canvas.height / 2
        - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.canvas.height / 2));
      CANVAS_STATE.canvas.viewPort.bottomRight.x -= (canvas.canvas.width / 2
        - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.canvas.width / 2));
      CANVAS_STATE.canvas.viewPort.bottomRight.y -= (canvas.canvas.height / 2
        - (newZoom / CANVAS_STATE.canvas.zoom)
        * (canvas.canvas.height / 2));
    }
    console.log(CANVAS_STATE.canvas.viewPort.topLeft.x);
    console.log(CANVAS_STATE.canvas.viewPort.bottomRight.x);
    CANVAS_STATE.canvas.zoom = newZoom;
    CANVAS_STATE.canvas.width *= scale;
    CANVAS_STATE.canvas.height *= scale;

    CANVAS_STATE.canvas.draggable = canvas.canvas.width < CANVAS_STATE.canvas.width
      || canvas.canvas.height < CANVAS_STATE.canvas.height;
  }
}
// TODO make newZoom integer
// TODO set canvas place on zoom = 1
// TODO set zoom min and max
