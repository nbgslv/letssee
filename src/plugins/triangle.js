import Element from '../elements';

export default class Triangle extends Element {
  constructor(name, moduleName, properties, events, editor) {
    super(name, moduleName, properties, events, editor);
    this.headPoint = {
      x: 0,
      y: 0,
    };
    this.leftPoint = {
      x: 0,
      y: 0,
    };
    this.rightPoint = {
      x: 0,
      y: 0,
    };
  }

  draw(canvas = true) {
    const editor = super.draw(canvas);
    editor.ctx.beginPath();
    editor.ctx.moveTo(this.headPoint.x, this.headPoint.y);
    editor.ctx.lineTo(this.leftPoint.x, this.leftPoint.y);
    editor.ctx.lineTo(this.rightPoint.x, this.rightPoint.y);
    editor.ctx.closePath();
    editor.ctx.stroke();
    //editor.ctx.restore();
  }

  updateElement() {
    const startX = this.editor.events.canvasEvent.mouse.startCanvasX;
    const startY = this.editor.events.canvasEvent.mouse.startCanvasY;
    const endX = this.editor.events.canvasEvent.mouse.canvasX;
    const endY = this.editor.events.canvasEvent.mouse.canvasY;
    const width = Math.abs((endX - startX) * 2);
    const height = Math.abs(endY - startY);


    this.elementDimensions = {
      startX,
      startY,
      endX,
      endY,
      width,
      height,
    };
    this.editor.renderAll();
    this.draw(false);
  }

  set elementDimensions(dimensions) {
    const {
      startX,
      startY,
      endX,
      endY,
      width,
      height,
    } = dimensions;
    this.dimensions.startX = startX;
    this.dimensions.startY = startY;
    this.dimensions.endX = endX;
    this.dimensions.endY = endY;
    this.dimensions.width = width;
    this.dimensions.height = height;
    this.headPoint = {
      x: startX,
      y: startY,
    };
    let leftPointX;
    let leftPointY;
    let rightPointX;
    let rightPointY;
    if (startX > endX) {
      leftPointX = endX;
      leftPointY = endY;
      rightPointX = startX - endX + startX;
      rightPointY = endY;
    } else {
      leftPointX = startX - endX + startX;
      leftPointY = endY;
      rightPointX = endX;
      rightPointY = endY;
    }
    this.leftPoint = {
      x: leftPointX,
      y: leftPointY,
    };
    this.rightPoint = {
      x: rightPointX,
      y: rightPointY,
    };
    this.resizer = {
      x: startX > endX ? endX : endX - width,
      y: startY,
    };
  }

  resize(mouseResize, affecter) {
    affecter.forEach((affect) => {
      let oldWidth;
      switch (affect) {
        case 1:
          oldWidth = this.width;
          this.leftPoint.x += mouseResize.deltaX;
          this.width -= mouseResize.deltaX;
          this.headPoint.x -= this.width / 2 - oldWidth / 2;
          this.startX += mouseResize.deltaX;
          this.resizer.x += mouseResize.deltaX;
          break;
        case 2:
          this.headPoint.y += mouseResize.deltaY;
          this.startY += mouseResize.deltaY;
          this.resizer.y += mouseResize.deltaY;
          this.height -= mouseResize.deltaY;
          break;
        case 3:
          oldWidth = this.width;
          this.rightPoint.x += mouseResize.deltaX;
          this.width += mouseResize.deltaX;
          this.headPoint.x += this.width / 2 - oldWidth / 2;
          break;
        case 4:
          this.leftPoint.y += mouseResize.deltaY;
          this.rightPoint.y += mouseResize.deltaY;
          this.height += mouseResize.deltaY;
          break;
        case 5:
          this.rotation = Element.calculateRotationDegrees(
            mouseResize.positionX,
            mouseResize.positionY,
            this.startX + this.width / 2,
            this.startY + this.height / 2,
          ) - 180 * Math.PI / 180;
          this.rotationChange = true;
          break;
        default:
          console.log('no');
      }
    });
  }

  move(mouseMove) {
    this.startX += mouseMove.deltaX;
    this.startY += mouseMove.deltaY;
    this.headPoint.x += mouseMove.deltaX;
    this.headPoint.y += mouseMove.deltaY;
    this.leftPoint.x += mouseMove.deltaX;
    this.leftPoint.y += mouseMove.deltaY;
    this.rightPoint.x += mouseMove.deltaX;
    this.rightPoint.y += mouseMove.deltaY;
    this.x += mouseMove.deltaX;
    this.y += mouseMove.deltaY;
    this.resizer.x += mouseMove.deltaX;
    this.resizer.y += mouseMove.deltaY;
  }
}
