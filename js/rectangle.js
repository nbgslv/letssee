import { Element, Elements } from './element';

export default class Rectangle {
  constructor() {
    this.mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      width: 0,
      height: 0,
    };
    this.ctx = null;
    this.started = false;
  }

  static mouseDown(e) {
    this.started = true;
    this.mouse.startX = e.clientX;
    this.mouse.startY = e.clientY;
  }

  static mouseMove(e, canvas) {
    if (this.started) {
      this.mouse.x = Math.min(e.screenX, this.mouse.startX);
      this.mouse.y = Math.min(e.screenY, this.mouse.startY);
      this.mouse.width = Math.abs(e.screenX - this.mouse.startX);
      this.mouse.height = Math.abs(e.screenY - this.mouse.startY);
      this.ctx = canvas.canvas.getContext('2d');
      this.upperCTX = canvas.upperCanvas.getContext('2d');
      this.upperCTX.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);
      this.upperCTX.strokeRect(this.mouse.x, this.mouse.y, this.mouse.width, this.mouse.height);
    }
  }

  static mouseUp(e, canvas) {
    if (this.started) {
      this.mouseMove(e, canvas);
      this.started = false;
      Rectangle.canvasUpdate(this.ctx, this.upperCTX, canvas);
      const rect = new Element(this.mouse.x, this.mouse.y, this.mouse.width, this.mouse.height);
      Elements.push(rect);
    }
  }
}
