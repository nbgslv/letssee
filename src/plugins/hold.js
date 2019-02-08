import Editor from '../editor';
import { CANVAS_STATE, ELEMENTS } from '../globals';
import Utilities from '../utilities';

let selection;

export default class Hold {
  static mouseDown(e, canvas) {
    const mousePosition = Utilities.checkMousePosition(e, canvas);
    const mouse = {
      positionX: mousePosition.x,
      positionY: mousePosition.y,
    };
    ELEMENTS.forEach((element) => {
      if (element.mouseInShape(mouse.positionX, mouse.positionY)) {
        // let selection = this.selection;
        this.dragoffx = mouse.positionX - element.x;
        this.dragoffy = mouse.positionY - element.y;
        CANVAS_STATE.dragging = true;
        CANVAS_STATE.selection = element;
        selection = CANVAS_STATE.selection;
        Hold.draw(canvas);
        //return;
      }/*
      if (CANVAS_STATE.selection) {
        CANVAS_STATE.selection = null;
        selection = null;
        Hold.draw(canvas);
      } */
    });
  }

  static mouseMove(e, canvas) {
    if (CANVAS_STATE.dragging) {
      const mousePosition = Utilities.checkMousePosition(e, canvas);
      selection.x = mousePosition.x - this.dragoffx;
      selection.y = mousePosition.y - this.dragoffy;
      Hold.draw(canvas);
    }
  }

  static mouseUp(e, canvas) {
    CANVAS_STATE.dragging = false;
  }

  static draw(canvas) {
    canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);
    ELEMENTS.forEach((element) => {
      if (!(element.x > canvas.upperCanvas.width || element.y > canvas.upperCanvas.height
        || element.x + element.width < 0 || element.y + element.height < 0)) {
        canvas.upperCanvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
      }
      if (selection !== null) {
        canvas.upperCanvas.ctx.strokeRect(
          selection.x,
          selection.y,
          selection.width,
          selection.height,
        );
      }
      Editor.canvasUpdate(canvas);
    });
  }
}
