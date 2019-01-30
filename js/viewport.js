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
      let deltaX = e.movementX;
      let deltaY = e.movementY;

      if (
        CANVAS_STATE.canvas.viewPort.topLeft.x >= 0
        && (
          e.movementX > 0 || e.movementY > 0
        )
      ) {
        deltaX = 0;
      } else {
        deltaX = e.movementX;
      }

      if (
        CANVAS_STATE.canvas.viewPort.topLeft.y >= 0
        && (
          e.movementX > 0 || e.movementY > 0
        )
      ) {
        deltaY = 0;
      } else {
        deltaY = e.movementY;
      }

      if (
        (
          CANVAS_STATE.canvas.viewPort.bottomRight.x <= canvas.canvas.width
          && (
            e.movementX < 0 || e.movementY < 0
          )
        )
        || deltaX === 0
      ) {
        deltaX = 0;
      } else {
        deltaX = e.movementX;
      }

      if (
        (CANVAS_STATE.canvas.viewPort.bottomRight.y <= canvas.canvas.height
          && (
            e.movementX < 0 || e.movementY < 0
          )
        )
        || deltaY === 0
      ) {
        deltaY = 0;
      } else {
        deltaY = e.movementY;
      }

      console.log(deltaX);
      console.log(deltaY);

      canvas.canvas.ctx.translate(deltaX, deltaY);
      canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
      Elements.forEach((element) => {
        canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
      });

      canvas.upperCanvas.ctx.translate(deltaX, deltaY);
      canvas.upperCanvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);

      CANVAS_STATE.canvas.viewPort.topLeft.x += deltaX;
      CANVAS_STATE.canvas.viewPort.topLeft.y += deltaY;
      CANVAS_STATE.canvas.viewPort.bottomRight.x += deltaX;
      CANVAS_STATE.canvas.viewPort.bottomRight.y += deltaY;
      CANVAS_STATE.canvas.center.x -= deltaX;
      CANVAS_STATE.canvas.center.y -= deltaY;

      console.log(CANVAS_STATE.canvas.viewPort.topLeft.x);
      console.log(CANVAS_STATE.canvas.viewPort.bottomRight.x);
    }
  }

  static mouseUp(e, canvas) {
    if (CANVAS_STATE.canvas.dragging) {
      Viewport.drag(e, canvas);
      CANVAS_STATE.canvas.dragging = false;
    }
  }
}
