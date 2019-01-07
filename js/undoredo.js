import { Undo, Redo } from './globals';
import { Elements } from './element';

export default class UndoRedo {
  static recordUndo(e, canvas, Elements){
    Undo.length = 0;
    Elements.forEach((element) => {
      Undo.push(element);
    });
  }

  static canvasUndo(e, canvas){
    let i = 0;
    canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);
    for (i; i < Undo.length - 1; i++) {
      canvas.upperCanvas.ctx.strokeRect(Undo[i].x, Undo[i].y, Undo[i].width, Undo[i].height);
    }
    Redo.push(Undo[Undo.length - 1]);
    Undo.pop();
    Elements.length = 0;
    Undo.forEach((element) => {
      Elements.push(element);
    })
  }

  static canvasRedo(e, canvas){
    let element = Redo.shift();
    canvas.upperCanvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
  }
}
