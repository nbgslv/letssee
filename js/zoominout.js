import { Elements } from './element';
import { CANVAS_STATE } from './globals';

export default class ZoomInOut {
  static canvasZoomIn(e, canvas) {
    const zoomData = this.getZoomData('in');

    canvas.upperCanvas.ctx.scale(zoomData.zoomStep, zoomData.zoomStep);
    canvas.upperCanvas.ctx.translate(zoomData.translateX, zoomData.translateY);
    canvas.upperCanvas.ctx.clearRect(
      CANVAS_STATE.canvas.viewPort.topLeft.x + zoomData.translateX,
      CANVAS_STATE.canvas.viewPort.topLeft.y + zoomData.translateY,
      zoomData.docWidth,
      zoomData.docHeight,
    );

    canvas.canvas.ctx.scale(zoomData.zoomStep, zoomData.zoomStep);
    canvas.canvas.ctx.translate(zoomData.translateX, zoomData.translateY);
    canvas.canvas.ctx.clearRect(
      CANVAS_STATE.canvas.viewPort.topLeft.x + zoomData.translateX,
      CANVAS_STATE.canvas.viewPort.topLeft.y + zoomData.translateY,
      zoomData.docWidth,
      zoomData.docHeight,
    );
    Elements.forEach((element) => {
      canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
    });

    CANVAS_STATE.canvas.zoom = zoomData.scale;
    CANVAS_STATE.canvas.width = zoomData.docWidth;
    CANVAS_STATE.canvas.height = zoomData.docHeight;
    CANVAS_STATE.canvas.center.x = zoomData.docWidth / 2;
    CANVAS_STATE.canvas.center.y = zoomData.docHeight / 2;
    CANVAS_STATE.canvas.viewPort.topLeft.x += zoomData.translateX;
    CANVAS_STATE.canvas.viewPort.topLeft.y += zoomData.translateY;
    CANVAS_STATE.canvas.viewPort.bottomRight.x -= zoomData.translateX;
    CANVAS_STATE.canvas.viewPort.bottomRight.y -= zoomData.translateY;

    console.log(CANVAS_STATE.canvas.zoom, 'zoom');
    console.log(CANVAS_STATE.canvas.width, 'width');
    console.log(CANVAS_STATE.canvas.height, 'height');
    console.log(CANVAS_STATE.canvas.center.x, 'centerx');
    console.log(CANVAS_STATE.canvas.center.y, 'centery');
    console.log(CANVAS_STATE.canvas.viewPort.topLeft.x, 'topleftx');
    console.log(CANVAS_STATE.canvas.viewPort.topLeft.y, 'toplefty');
    console.log(CANVAS_STATE.canvas.viewPort.bottomRight.x, 'bottomrightx');
    console.log(CANVAS_STATE.canvas.viewPort.bottomRight.y, 'bottomrighty');
    canvas.canvas.ctx.strokeRect(0, 0, 300, 300);
    canvas.canvas.ctx.beginPath();
    canvas.canvas.ctx.moveTo(-50, zoomData.docHeight / 2);
    canvas.canvas.ctx.lineTo(CANVAS_STATE.canvas.viewPort.topLeft.x + zoomData.docWidth, zoomData.docHeight / 2);
    canvas.canvas.ctx.stroke();
    CANVAS_STATE.canvas.draggable = canvas.canvas.width < CANVAS_STATE.canvas.width
      || canvas.canvas.height < CANVAS_STATE.canvas.height;
  }

  static canvasZoomOut(e, canvas) {
    const zoomData = this.getZoomData('out');

    canvas.upperCanvas.ctx.scale(zoomData.zoomStep, zoomData.zoomStep);
    canvas.upperCanvas.ctx.translate(zoomData.translateX, zoomData.translateY);
    canvas.upperCanvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);

    canvas.canvas.ctx.scale(zoomData.zoomStep, zoomData.zoomStep);
    canvas.canvas.ctx.translate(zoomData.translateX, zoomData.translateY);
    canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    Elements.forEach((element) => {
      canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
    });

    CANVAS_STATE.canvas.zoom = zoomData.scale;
    CANVAS_STATE.canvas.width = zoomData.docWidth;
    CANVAS_STATE.canvas.height = zoomData.docHeight;
    CANVAS_STATE.canvas.center.x = zoomData.docWidth / 2;
    CANVAS_STATE.canvas.center.y = zoomData.docHeight / 2;
    CANVAS_STATE.canvas.viewPort.topLeft.x += zoomData.translateX;
    CANVAS_STATE.canvas.viewPort.topLeft.y += zoomData.translateY;
    CANVAS_STATE.canvas.viewPort.bottomRight.x -= zoomData.translateX;
    CANVAS_STATE.canvas.viewPort.bottomRight.y -= zoomData.translateY;

    console.log(CANVAS_STATE.canvas.zoom, 'zoom');
    console.log(CANVAS_STATE.canvas.width, 'width');
    console.log(CANVAS_STATE.canvas.height, 'height');
    console.log(CANVAS_STATE.canvas.center.x, 'centerx');
    console.log(CANVAS_STATE.canvas.center.y, 'centery');
    console.log(CANVAS_STATE.canvas.viewPort.topLeft.x, 'topleftx');
    console.log(CANVAS_STATE.canvas.viewPort.topLeft.y, 'toplefty');
    console.log(CANVAS_STATE.canvas.viewPort.bottomRight.x, 'bottomrightx');
    console.log(CANVAS_STATE.canvas.viewPort.bottomRight.y, 'bottomrighty');
    canvas.canvas.ctx.strokeRect(0, 0, 300, 300);
    canvas.canvas.ctx.beginPath();
    canvas.canvas.ctx.moveTo(-50, 150);
    canvas.canvas.ctx.lineTo(CANVAS_STATE.canvas.viewPort.topLeft.x + zoomData.docWidth, 150);
    canvas.canvas.ctx.stroke();
    CANVAS_STATE.canvas.draggable = canvas.canvas.width < CANVAS_STATE.canvas.width
      || canvas.canvas.height < CANVAS_STATE.canvas.height;
  }

  static getZoomData(zoom) {
    const zoomStep = zoom === 'in' ? 1.1 : 1 / 1.1;
    const scale = CANVAS_STATE.canvas.zoom * zoomStep;
    const docWidth = CANVAS_STATE.canvas.width * zoomStep;
    const docHeight = CANVAS_STATE.canvas.height * zoomStep;
    const translateX = CANVAS_STATE.canvas.width / 2 - docWidth / 2;
    const translateY = CANVAS_STATE.canvas.height / 2 - docHeight / 2;

    console.log(zoomStep);
    console.log(scale, 'check');
    console.log(docWidth);
    console.log(docHeight);
    console.log(translateX, 'check');
    console.log(translateY, 'check');

    return {
      zoomStep,
      scale,
      docWidth,
      docHeight,
      translateX,
      translateY,
    };
  }
}
// TODO make newZoom integer
// TODO set canvas place on zoom = 1
// TODO set zoom min and max
