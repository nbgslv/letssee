import { UNDO, REDO } from './globals';
import { Elements } from './element';
import { Tool } from './tools';

export default class Undoredo {
  static canvasUndo(e, canvas) {
    let i = 0;
    canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    for (i; i < UNDO.length - 1; i++) {
      canvas.canvas.ctx.strokeRect(UNDO[i].x, UNDO[i].y, UNDO[i].width, UNDO[i].height);
    }
    REDO.unshift(UNDO[UNDO.length - 1]);
    UNDO.pop();
    Elements.length = 0;
    UNDO.forEach((element) => {
      Elements.push(element);
    });
  }

  static canvasRedo(e, canvas) {
    const element = REDO.shift();
    const redoEvent = new CustomEvent('redo');
    if (element !== undefined) {
      Tool.eventHandler(redoEvent, element.tool, canvas, element);
      Elements.push(element);
    }
    Tool.recordUndo();
  }
}
