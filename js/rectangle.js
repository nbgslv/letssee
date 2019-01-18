import { Element, Elements } from './element';
import Editor from './editor';

const mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  width: 0,
  height: 0,
};

export default class Rectangle {
  constructor() {
    this.started = false;
  }

  static mouseDown(e) {
    this.started = true;
    mouse.startX = e.clientX;
    mouse.startY = e.clientY;
  }

  static mouseMove(e, canvas) {
    if (this.started) {
      mouse.x = Math.min(e.screenX, mouse.startX);
      mouse.y = Math.min(e.screenY, mouse.startY);
      console.log(mouse.x + ',' + mouse.y);
      mouse.width = Math.abs(e.screenX - mouse.startX);
      mouse.height = Math.abs(e.screenY - mouse.startY);
      console.log(mouse.width + ',' + mouse.height);
      canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);
      canvas.upperCanvas.ctx.strokeRect(mouse.x, mouse.y, mouse.width, mouse.height);
    }
  }

  static mouseUp(e, canvas) {
    if (this.started) {
      this.mouseMove(e, canvas);
      this.started = false;
      const rect = new Element(mouse.x, mouse.y, mouse.width, mouse.height);
      Elements.push(rect);
      Editor.canvasUpdate(canvas);
      console.log(rect);
    }
  }
}
