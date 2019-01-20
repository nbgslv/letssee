import { CANVAS_STATE } from './globals';
import { Elements } from './element';

export default class Viewport {
  static mouseDown() {
    if (CANVAS_STATE.canvas.draggable) {
      CANVAS_STATE.canvas.dragging = true;
    }
  }

  static drag(e, canvas) {
    if (CANVAS_STATE.canvas.dragging) {
      if (CANVAS_STATE.canvas.viewPort.topLeft.x === 0
        || CANVAS_STATE.canvas.viewPort.topLeft.x === 0) {
        CANVAS_STATE.canvas.dragging = false;
        CANVAS_STATE.canvas.draggable = false;
        return;
      }
      const deltaX = e.movementX;
      const deltaY = e.movementY;

      canvas.canvas.ctx.translate(deltaX, deltaY);
      canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
      Elements.forEach((element) => {
        canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
      });

      canvas.upperCanvas.ctx.translate(deltaX, deltaY);
      canvas.upperCanvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    }
  }

  static mouseUp(e, canvas) {
    if (CANVAS_STATE.canvas.dragging) {
      Viewport.drag(e, canvas);
      CANVAS_STATE.canvas.dragging = false;
    }
  }
}
