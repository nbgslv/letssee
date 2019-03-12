import Element from '../elements';

const mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
};

export default class Triangle extends Element {
  constructor(name, properties, events, editor, element, style) {
    super(name, properties, events, editor, element, style);
    this.headPoint = {
      x: this.startX,
      y: this.startY,
    };
    let leftPointX;
    let leftPointY;
    let rightPointX;
    let rightPointY;
    if (this.startX > this.x) {
      leftPointX = this.x;
      leftPointY = this.y;
      rightPointX = this.startX - this.x + this.startX;
      rightPointY = this.y;
    } else {
      leftPointX = this.startX - this.x + this.startX;
      leftPointY = this.y;
      rightPointX = this.x;
      rightPointY = this.y;
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
      x: element.startX > element.x ? element.x : element.x - element.width,
      y: element.startY,
    };
    this.startX = element.startX > element.x ? element.x : element.x - element.width;
    this.startY = element.startY;
  }

  draw(canvas = true) {
    const editor = super.draw(canvas);
    editor.ctx.beginPath();
    editor.ctx.moveTo(this.headPoint.x, this.headPoint.y);
    editor.ctx.lineTo(this.leftPoint.x, this.leftPoint.y);
    editor.ctx.lineTo(this.rightPoint.x, this.rightPoint.y);
    editor.ctx.lineTo(this.headPoint.x, this.headPoint.y);
    editor.ctx.stroke();
    editor.ctx.restore();
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

  static mouseDown(e, tool) {
    this.started = true;
    const relativeMousePosition = tool.relativeMousePosition(e);
    mouse.startX = relativeMousePosition.x;
    mouse.startY = relativeMousePosition.y;
  }

  static mouseMove(e, tool) {
    let element;
    if (this.started) {
      element = this.createElement(e, tool);
      element.editor.canvasUpdate(0, false);
      element.draw(false);
    }
    return element;
  }

  static mouseUp(e, tool) {
    if (this.started) {
      const element = this.mouseMove(e, tool);
      element.editor.elements.push(element);
      element.editor.canvasUpdate(0, true);
      this.started = false;
    }
  }

  static createElement(e, tool) {
    const relativeMousePosition = tool.relativeMousePosition(e);
    mouse.x = relativeMousePosition.x;
    mouse.y = relativeMousePosition.y;
    const element = {
      startX: mouse.startX,
      startY: mouse.startY,
      x: mouse.x,
      y: mouse.y,
      width: Math.abs((mouse.x - mouse.startX) * 2),
      height: Math.abs(mouse.y - mouse.startY),
    };
    return new Triangle(
      tool.name,
      tool.properties,
      tool.events,
      tool.editor,
      element,
      null,
    );
  }
}
