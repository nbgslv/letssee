import { Elements } from './element';
import { CANVAS_PROPERTIES, CANVAS_STATE } from './globals';

export default class ZoomInOut {
  static canvasZoomIn(e, canvas) {
    ZoomInOut.setZoom(1, canvas);
  }

  static canvasZoomOut(e, canvas) {
    ZoomInOut.setZoom(0, canvas);
  }

  static setZoom(zoom, canvas) {
    let zoomStep;
    let newZoom;
    if (zoom === 1) {
      zoomStep = CANVAS_PROPERTIES.zoom.zoomStep;
      newZoom = Math.min(CANVAS_STATE.canvas.zoom * zoomStep, CANVAS_PROPERTIES.zoom.maxZoom);
    } else {
      zoomStep = 1 / CANVAS_PROPERTIES.zoom.zoomStep;
      newZoom = Math.max(CANVAS_STATE.canvas.zoom * zoomStep, CANVAS_PROPERTIES.zoom.minZoom);
    }
    const zoomDifference = newZoom - CANVAS_STATE.canvas.zoom;
    const docWidth = CANVAS_STATE.canvas.width * newZoom;
    const docHeight = CANVAS_STATE.canvas.height * newZoom;
    const translateX = (-(CANVAS_PROPERTIES.document.width / 2 * zoomDifference / newZoom));
    const translateY = (-(CANVAS_PROPERTIES.document.height / 2 * zoomDifference / newZoom));

    canvas.upperCanvas.ctx.scale(zoomStep, zoomStep);
    canvas.upperCanvas.ctx.translate(translateX, translateY);
    canvas.upperCanvas.ctx.clearRect(
      0,
      0,
      CANVAS_PROPERTIES.document.width,
      CANVAS_PROPERTIES.document.height,
    );

    canvas.canvas.ctx.scale(zoomStep, zoomStep);
    canvas.canvas.ctx.translate(translateX, translateY);
    canvas.canvas.ctx.clearRect(
      0,
      0,
      CANVAS_PROPERTIES.document.width,
      CANVAS_PROPERTIES.document.height,
    );
    Elements.forEach((element) => {
      canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
    });

    CANVAS_STATE.canvas.zoom = newZoom;
    CANVAS_STATE.canvas.width = docWidth;
    CANVAS_STATE.canvas.height = docHeight;

    CANVAS_STATE.canvas.draggable = canvas.canvas.width < CANVAS_STATE.canvas.width
      || canvas.canvas.height < CANVAS_STATE.canvas.height;
  }
}
// TODO set zoom min and max
