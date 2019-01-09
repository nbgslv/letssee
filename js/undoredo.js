import { Undo, Redo } from './globals';
import { Elements } from './element';
import { Tool } from './tools';

export default class UndoRedo {
  static canvasUndo(e, canvas) {
    let i = 0;
    canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    for (i; i < Undo.length - 1; i++) {
      canvas.canvas.ctx.strokeRect(Undo[i].x, Undo[i].y, Undo[i].width, Undo[i].height);
    }
    Redo.unshift(Undo[Undo.length - 1]);
    Undo.pop();
    Elements.length = 0;
    Undo.forEach((element) => {
      Elements.push(element);
    });
  }

  static canvasRedo(e, canvas) {
    const element = Redo.shift();
    if (element !== undefined) {
      canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
      Elements.push(element);
    }
    Tool.recordUndo();
  }
}
