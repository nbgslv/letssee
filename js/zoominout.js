import { CANVAS_PROPERTIES, CANVAS_STATE } from './globals';
import Editor from './editor';
import Utilities from './utilities';

export default class ZoomInOut {
  static canvasZoomIn(e, canvas) {
    ZoomInOut.setZoom(1, canvas);
  }

  static canvasZoomOut(e, canvas) {
    ZoomInOut.setZoom(0, canvas);
  }

  static setZoom(zoom, canvas) {
    let zoomStep;
    if (zoom === 1) {
      zoomStep = CANVAS_PROPERTIES.zoom.zoomStep;
    } else if (zoom === 0) {
      zoomStep = 1 / CANVAS_PROPERTIES.zoom.zoomStep;
    }
    const newZoom = CANVAS_STATE.canvas.zoom * zoomStep;
    if (newZoom > CANVAS_PROPERTIES.zoom.maxZoom || newZoom < CANVAS_PROPERTIES.zoom.minZoom) {
      return;
    }
    const zoomDifference = newZoom - CANVAS_STATE.canvas.zoom;
    console.log(newZoom);
    const docWidth = CANVAS_STATE.canvas.width * zoomStep;
    const docHeight = CANVAS_STATE.canvas.height * zoomStep;
    let zoomSteps = Utilities.getBaseLog(
      CANVAS_PROPERTIES.zoom.zoomStep,
      CANVAS_STATE.canvas.zoom,
    );
    zoomSteps = zoomSteps === 0 ? 1 : zoomSteps;
    const canvasCenterX = CANVAS_PROPERTIES.document.width / 2;
    const canvasCenterY = CANVAS_PROPERTIES.document.height / 2;
    let stepToCenterX = 0;
    let stepToCenterY = 0;
    if (canvasCenterX !== CANVAS_STATE.canvas.center.x) {
      stepToCenterX = (CANVAS_STATE.canvas.center.x - canvasCenterX) / zoomSteps;
      CANVAS_STATE.canvas.center.x -= stepToCenterX;
    }
    if (canvasCenterY !== CANVAS_STATE.canvas.center.y) {
      stepToCenterY = (CANVAS_STATE.canvas.center.y - canvasCenterY) / zoomSteps;
      CANVAS_STATE.canvas.center.y -= stepToCenterY;
    }

    const translateX = (
      -(
        CANVAS_PROPERTIES.document.width / 2 * zoomDifference / newZoom - stepToCenterX
      )
    );
    const translateY = (
      -(
        CANVAS_PROPERTIES.document.height / 2 * zoomDifference / newZoom - stepToCenterY
      )
    );
    const canvasClearParam = {
      x: 0,
      y: 0,
      width: CANVAS_PROPERTIES.document.width,
      height: CANVAS_PROPERTIES.document.height,
    };

    canvas.upperCanvas.ctx.scale(zoomStep, zoomStep);
    canvas.upperCanvas.ctx.translate(translateX, translateY);
    Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);

    canvas.canvas.ctx.scale(zoomStep, zoomStep);
    canvas.canvas.ctx.translate(translateX, translateY);
    Editor.canvasUpdate(canvas.canvas, true, canvasClearParam);

    CANVAS_STATE.canvas.zoom = newZoom;
    if (zoom === 1) {
      CANVAS_STATE.canvas.viewPort.topLeft.x -= (docWidth - CANVAS_STATE.canvas.width) / 2;
      CANVAS_STATE.canvas.viewPort.topLeft.y -= (docHeight - CANVAS_STATE.canvas.height) / 2;
      CANVAS_STATE.canvas.viewPort.bottomRight.x += (docWidth - CANVAS_STATE.canvas.width) / 2;
      CANVAS_STATE.canvas.viewPort.bottomRight.y += (docHeight - CANVAS_STATE.canvas.height) / 2;
    } else if (zoom === 0) {
      CANVAS_STATE.canvas.viewPort.topLeft.x += (docWidth - CANVAS_STATE.canvas.width) / 2;
      CANVAS_STATE.canvas.viewPort.topLeft.y += (docHeight - CANVAS_STATE.canvas.height) / 2;
      CANVAS_STATE.canvas.viewPort.bottomRight.x -= (docWidth - CANVAS_STATE.canvas.width) / 2;
      CANVAS_STATE.canvas.viewPort.bottomRight.y -= (docHeight - CANVAS_STATE.canvas.height) / 2;
    }
    CANVAS_STATE.canvas.width = docWidth;
    CANVAS_STATE.canvas.height = docHeight;

    CANVAS_STATE.canvas.draggable = canvas.canvas.width < Math.round(CANVAS_STATE.canvas.width)
      || canvas.canvas.height < Math.round(CANVAS_STATE.canvas.height);
  }
}
