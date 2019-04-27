import Element from '../elements';
import Utilities from '../utilities';

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
    this.upsideDown = false;
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
    this.dimensions.startX = this.leftPoint.x;
    this.dimensions.endX = this.rightPoint.x;
    if (endY > startY) {
      this.dimensions.startY = this.headPoint.y;
      this.dimensions.endY = this.rightPoint.y;
      this.resizer.topLeft.x = this.headPoint.x - this.dimensions.width / 2;
      this.resizer.topLeft.y = this.headPoint.y;
      this.resizer.topRight.x = this.headPoint.x + this.dimensions.width / 2;
      this.resizer.topRight.y = this.headPoint.y;
      this.resizer.bottomLeft = this.leftPoint;
      this.resizer.bottomRight = this.rightPoint;
    } else {
      this.dimensions.startY = this.leftPoint.y;
      this.dimensions.endY = this.headPoint.y;
      this.resizer.topLeft = this.leftPoint;
      this.resizer.topRight = this.rightPoint;
      this.resizer.bottomLeft.x = this.headPoint.x - this.dimensions.width / 2;
      this.resizer.bottomLeft.y = this.headPoint.y;
      this.resizer.bottomRight.x = this.headPoint.x + this.dimensions.width / 2;
      this.resizer.bottomRight.y = this.headPoint.y;
      this.upsideDown = true;
    }
  }

  resize() {
    if (this.editor.events.canvasEvent.resizing) {
      const mouseResize = {
        deltaX: this.editor.events.canvasEvent.mouse.canvasX
          - this.editor.events.canvasEvent.mouse.startCanvasX,
        deltaY: this.editor.events.canvasEvent.mouse.canvasY
          - this.editor.events.canvasEvent.mouse.startCanvasY,
      };
      this.editor.events.canvasEvent.position.resizer.affect.forEach(((affect) => {
        let oldWidth;
        if (this.upsideDown && affect === 2) {
          affect = 4;
        } else if (this.upsideDown && affect === 4) {
          affect = 2;
        }
        switch (affect) {
          case 1:
            oldWidth = this.dimensions.width;
            this.leftPoint.x += mouseResize.deltaX;
            this.dimensions.width -= mouseResize.deltaX;
            this.headPoint.x -= this.dimensions.width / 2 - oldWidth / 2;
            this.dimensions.startX += mouseResize.deltaX;
            this.resizer.topLeft.x += mouseResize.deltaX;
            break;
          case 2:
            this.headPoint.y += mouseResize.deltaY;
            this.dimensions.startY += mouseResize.deltaY;
            this.resizer.topLeft.y += mouseResize.deltaY;
            this.dimensions.height -= mouseResize.deltaY;
            break;
          case 3:
            oldWidth = this.dimensions.width;
            this.rightPoint.x += mouseResize.deltaX;
            this.dimensions.width += mouseResize.deltaX;
            this.headPoint.x += this.dimensions.width / 2 - oldWidth / 2;
            break;
          case 4:
            this.leftPoint.y += mouseResize.deltaY;
            this.rightPoint.y += mouseResize.deltaY;
            this.dimensions.height += mouseResize.deltaY;
            break;
          case 5: {
            this.transformation.transform = true;
            const {
              lastAngel,
              newAngel,
            } = this.calcRotateAngle;
            this.transformation.rotationAngleDifference = newAngel - lastAngel;
            this.transformation.rotationAngle = Utilities.radiansToDegrees(
              this.transformation.rotationAngleDifference,
            ) + this.transformation.rotationAngle;
            if (this.transformation.rotationAngle < 0) this.transformation.rotationAngle += 360;
            this.transformation.rotationAngle %= 360;
            break;
          }
          default:
            console.log('no');
        }
      }));
    }
  }

  drag() {
    if (this.editor.events.canvasEvent.dragging) {
      const mouseMove = {
        deltaX: this.editor.events.canvasEvent.mouse.canvasX
          - this.editor.events.canvasEvent.mouse.startCanvasX,
        deltaY: this.editor.events.canvasEvent.mouse.canvasY
          - this.editor.events.canvasEvent.mouse.startCanvasY,
      };
      this.dimensions.startX += mouseMove.deltaX;
      this.dimensions.startY += mouseMove.deltaY;
      this.dimensions.endX += mouseMove.deltaX;
      this.dimensions.endY += mouseMove.deltaY;
      this.headPoint.x += mouseMove.deltaX;
      this.headPoint.y += mouseMove.deltaY;
      this.leftPoint.x += mouseMove.deltaX;
      this.leftPoint.y += mouseMove.deltaY;
      this.rightPoint.x += mouseMove.deltaX;
      this.rightPoint.y += mouseMove.deltaY;
      const elementResizers = Object.values(this.resizer);
      elementResizers.forEach((resizer) => {
        resizer.x += mouseMove.deltaX;
        resizer.y += mouseMove.deltaY;
      });
    }
  }
}
