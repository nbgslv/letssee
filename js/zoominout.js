import { Elements } from './element';
import { CANVAS_STATE } from './globals';

export default class ZoomInOut {
  static canvasZoomIn(e, canvas) {
    const zoomStep = 1.1;
    const scale = Math.round((CANVAS_STATE.canvas.zoom * zoomStep).toFixed(2));
    const docWidth = Number((CANVAS_STATE.canvas.width * zoomStep).toFixed(2));
    const docHeight = Number((CANVAS_STATE.canvas.height * zoomStep).toFixed(2));
    const translateX = Number((CANVAS_STATE.canvas.center.x - docWidth / 2).toFixed(2));
    const translateY = Number((CANVAS_STATE.canvas.center.y - docHeight / 2).toFixed(2));

    canvas.upperCanvas.ctx.translate(translateX, translateY);
    canvas.upperCanvas.ctx.scale(zoomStep, zoomStep);
    canvas.upperCanvas.ctx.clearRect(
      CANVAS_STATE.canvas.viewPort.topLeft.x + translateX,
      CANVAS_STATE.canvas.viewPort.topLeft.y + translateY,
      docWidth,
      docHeight,
    );

    canvas.canvas.ctx.translate(translateX, translateY);
    canvas.canvas.ctx.scale(zoomStep, zoomStep);
    canvas.canvas.ctx.clearRect(
      CANVAS_STATE.canvas.viewPort.topLeft.x + translateX,
      CANVAS_STATE.canvas.viewPort.topLeft.y + translateY,
      docWidth,
      docHeight,
    );
    Elements.forEach((element) => {
      canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
    });

    CANVAS_STATE.canvas.zoom = scale;
    CANVAS_STATE.canvas.width = docWidth;
    CANVAS_STATE.canvas.height = docHeight;
    CANVAS_STATE.canvas.center.x = (docWidth / 2).toFixed(2);
    CANVAS_STATE.canvas.center.y = (docHeight / 2).toFixed(2);
    CANVAS_STATE.canvas.viewPort.topLeft.x += translateX;
    CANVAS_STATE.canvas.viewPort.topLeft.y += translateY;
    CANVAS_STATE.canvas.viewPort.bottomRight.x -= translateX;
    CANVAS_STATE.canvas.viewPort.bottomRight.y -= translateY;

    CANVAS_STATE.canvas.draggable = canvas.canvas.width < CANVAS_STATE.canvas.width
      || canvas.canvas.height < CANVAS_STATE.canvas.height;
  }

  static canvasZoomOut(e, canvas) {
    const zoomStep = 0.9;
    const scale = (CANVAS_STATE.canvas.zoom * zoomStep).toFixed(2);
    const docWidth = Number((CANVAS_STATE.canvas.width * zoomStep).toFixed(2));
    const docHeight = Number((CANVAS_STATE.canvas.height * zoomStep).toFixed(2));
    const translateX = (CANVAS_STATE.canvas.center.x - docWidth / 2).toFixed(2);
    const translateY = (CANVAS_STATE.canvas.center.y - docHeight / 2).toFixed(2);

    canvas.upperCanvas.ctx.translate(translateX, translateY);
    canvas.upperCanvas.ctx.scale(zoomStep, zoomStep);
    canvas.upperCanvas.ctx.clearRect(
      CANVAS_STATE.canvas.viewPort.topLeft.x - translateX,
      CANVAS_STATE.canvas.viewPort.topLeft.y - translateY,
      docWidth,
      docHeight,
    );

    canvas.canvas.ctx.translate(translateX, translateY);
    canvas.canvas.ctx.scale(zoomStep, zoomStep);
    canvas.canvas.ctx.clearRect(
      CANVAS_STATE.canvas.viewPort.topLeft.x - translateX,
      CANVAS_STATE.canvas.viewPort.topLeft.y - translateY,
      docWidth,
      docHeight,
    );
    Elements.forEach((element) => {
      canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
    });

    CANVAS_STATE.canvas.zoom = scale;
    CANVAS_STATE.canvas.width = docWidth;
    CANVAS_STATE.canvas.height = docHeight;
    CANVAS_STATE.canvas.center.x = (docWidth / 2).toFixed(2);
    CANVAS_STATE.canvas.center.y = (docHeight / 2).toFixed(2);
    CANVAS_STATE.canvas.viewPort.topLeft.x += translateX;
    CANVAS_STATE.canvas.viewPort.topLeft.y += translateY;
    CANVAS_STATE.canvas.viewPort.bottomRight.x -= translateX;
    CANVAS_STATE.canvas.viewPort.bottomRight.y -= translateY;

    CANVAS_STATE.canvas.draggable = canvas.canvas.width < CANVAS_STATE.canvas.width
      || canvas.canvas.height < CANVAS_STATE.canvas.height;
  }
}
// TODO make newZoom integer
// TODO set canvas place on zoom = 1
// TODO set zoom min and max
