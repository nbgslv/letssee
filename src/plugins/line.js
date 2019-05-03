import Element from '../elements';
import Utilities from '../utilities';

export default class Line extends Element {
  constructor(name, moduleName, properties, events, editor) {
    super(name, moduleName, properties, events, editor);
    this.transformation.translationOrigin = 'start';
    this.transformation.rotationFactor = 0;
    this.style.set('lineWidth', 1);
  }

  draw(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    //editor.ctx.save();
    editor.ctx.translate(this.dimensions.startX, this.dimensions.startY);
    editor.ctx.rotate(this.transformation.rotationAngleDifference);
    editor.ctx.translate(-this.dimensions.startX, -this.dimensions.startY);
    editor.ctx.beginPath();
    editor.ctx.lineWidth = this.style.get('lineWidth');
    editor.ctx.moveTo(this.dimensions.startX, this.dimensions.startY);
    editor.ctx.lineTo(this.dimensions.startX + this.dimensions.width, this.dimensions.startY);
    editor.ctx.closePath();
    editor.ctx.stroke();
    this.transformation.drawTransformed = true;
    this.rotateResizer();
    //editor.ctx.restore();
    /*
    editor.ctx.beginPath();
    const corners = Object.values(this.resizer);
    editor.ctx.moveTo(corners[0].x, corners[0].y);
    editor.ctx.lineTo(corners[1].x, corners[1].y);
    editor.ctx.lineTo(corners[3].x, corners[3].y);
    editor.ctx.lineTo(corners[2].x, corners[2].y);
    editor.ctx.closePath();
    editor.ctx.stroke(); */
  }

  endDraw() {
    //this.updateElement();
    this.editor.elements.push(this);
    this.editor.renderAll();
  }

  updateElement() {
    const startX = this.editor.events.canvasEvent.mouse.startCanvasX;
    const startY = this.editor.events.canvasEvent.mouse.startCanvasY;
    const endX = this.editor.events.canvasEvent.mouse.canvasX;
    const endY = this.editor.events.canvasEvent.mouse.canvasY;
    this.elementDimensions = {
      startX,
      startY,
      endX,
      endY,
      width: Math.abs(startX - endX),
      height: this.style.get('lineWidth'),
    };
    this.editor.renderAll();
    this.draw(false);
    console.log(`mouseX: ${this.editor.events.canvasEvent.mouse.canvasX}
    mouseY: ${this.editor.events.canvasEvent.mouse.canvasY}`);
  }

  set elementDimensions(dimensions) {
    this.dimensions.startX = dimensions.startX;
    this.dimensions.startY = dimensions.startY;
    this.dimensions.endX = dimensions.endX;
    this.dimensions.endY = dimensions.endY;
    this.dimensions.width = dimensions.width;
    this.dimensions.height = dimensions.height;
    this.resizer.topLeft.x = dimensions.startX;
    this.resizer.topLeft.y = dimensions.startY - dimensions.height;
    this.resizer.topRight.x = dimensions.endX;
    this.resizer.topRight.y = dimensions.startY - dimensions.height;
    this.resizer.bottomLeft.x = dimensions.startX;
    this.resizer.bottomLeft.y = dimensions.startY + dimensions.height;
    this.resizer.bottomRight.x = dimensions.endX;
    this.resizer.bottomRight.y = dimensions.startY + dimensions.height;
    const {
      newAngle,
      lastAngle,
    } = this.calcRotateAngle;
    this.transformation.rotationAngleDifference = newAngle - lastAngle;
    this.transformation.rotationAngle = Utilities.radiansToDegrees(
      this.transformation.rotationAngleDifference,
    ) + this.transformation.rotationAngle;
    if (this.transformation.rotationAngle < 0) this.transformation.rotationAngle += 360;
    this.transformation.rotationAngle %= 360;
    console.log(this.transformation.rotationAngle);
    console.log(this.transformation.rotationAngleDifference);
    this.transformation.transform = true;
  }

  get calcRotateAngle() {
    console.log(`currentX: ${this.editor.events.canvasEvent.mouse.canvasX}
    currentY: ${this.editor.events.canvasEvent.mouse.canvasY}
    lastX: ${this.editor.events.canvasEvent.mouse.lastMoveX}
    lastY: ${this.editor.events.canvasEvent.mouse.lastMoveY}`);
    return {
      newAngle: Math.atan2(
        this.editor.events.canvasEvent.mouse.canvasY - this.dimensions.startY,
        this.editor.events.canvasEvent.mouse.canvasX - this.dimensions.startX,
      ),
      lastAngle: Math.atan2(
        this.editor.events.canvasEvent.mouse.lastMoveY - this.dimensions.startY,
        this.editor.events.canvasEvent.mouse.lastMoveX - this.dimensions.startX,
      ),
    };
  }

  rotateResizer() {
    const corners = Object.values(this.resizer);
    const rotationAngle = Utilities.degreesToRadians(this.transformation.rotationAngle);
    this.resizer.topLeft.rotatedX = this.resizer.topLeft.x;
    this.resizer.topLeft.rotatedY = this.resizer.topLeft.y;

    this.resizer.topRight.rotatedX = ((this.resizer.topRight.x - this.dimensions.startX) * Utilities.cos(-rotationAngle)
      + (this.resizer.topRight.y - this.dimensions.startY) * Utilities.sin(-rotationAngle)) + this.dimensions.startX;
    this.resizer.topRight.rotatedY = ((this.resizer.topRight.y - this.dimensions.startY) * Utilities.cos(-rotationAngle)
      - (this.resizer.topRight.x - this.dimensions.startX) * Utilities.sin(-rotationAngle)) + this.dimensions.startY;

    this.resizer.bottomLeft.rotatedX = this.resizer.bottomLeft.x;
    this.resizer.bottomLeft.rotatedY = this.resizer.bottomLeft.y;

    this.resizer.bottomRight.rotatedX = ((this.resizer.bottomRight.x - this.dimensions.startX) * Utilities.cos(-rotationAngle)
      + (this.resizer.bottomRight.y - this.dimensions.startY) * Utilities.sin(-rotationAngle)) + this.dimensions.startX;
    this.resizer.bottomRight.rotatedY = ((this.resizer.bottomRight.y - this.dimensions.startY) * Utilities.cos(-rotationAngle)
      - (this.resizer.bottomRight.x - this.dimensions.startX) * Utilities.sin(-rotationAngle)) + this.dimensions.startY;

    console.log(`[line rotate resizer]
    lefttop rotated x: ${this.resizer.topLeft.rotatedX}
    lefttop rotated y: ${this.resizer.topLeft.rotatedY}
    righttop rotated x: ${this.resizer.topRight.rotatedX}
    righttop rotated y: ${this.resizer.topRight.rotatedY}
    bottomleft rotated x: ${this.resizer.bottomLeft.rotatedX}
    bottomleft rotated y: ${this.resizer.bottomLeft.rotatedY}
    bottomright rotated x: ${this.resizer.bottomRight.rotatedX}
    bottomright rotated y: ${this.resizer.bottomRight.rotatedY}`);

/*
    for (let i = 0; i < corners.length; i += 1) {
      if (i === 0 || i === 2) continue;
      corners[i].rotatedX = (corners[i].x - (this.dimensions.startX + ((this.dimensions.width)))) * Utilities.cos(-rotationAngle)
        + (corners[i].y - (this.dimensions.startY + ((this.dimensions.height)))) * Utilities.sin(-rotationAngle);
      corners[i].rotatedX += this.dimensions.startX + this.dimensions.width;
      corners[i].rotatedY = (corners[i].y - (this.dimensions.startY + ((this.dimensions.height)))) * Utilities.cos(-rotationAngle)
        - (corners[i].x - (this.dimensions.startX + ((this.dimensions.width)))) * Utilities.sin(-rotationAngle);
      corners[i].rotatedY += this.dimensions.startY + this.dimensions.height;
    }
    corners[0].rotatedX = corners[0].x;
    corners[0].rotatedY = corners[0].y;
    corners[2].rotatedX = corners[2].x;
    corners[2].rotatedY = corners[2].y;

 */

    const editor = this.editor.canvas.canvas;
    editor.ctx.strokeStyle = 'red';
    editor.ctx.beginPath();
    editor.ctx.moveTo(this.resizer.topLeft.rotatedX, this.resizer.topLeft.rotatedY);
    editor.ctx.lineTo(this.resizer.topRight.rotatedX, this.resizer.topRight.rotatedY);
    editor.ctx.lineTo(this.resizer.bottomRight.rotatedX, this.resizer.bottomRight.rotatedY);
    editor.ctx.lineTo(this.resizer.bottomLeft.rotatedX, this.resizer.bottomLeft.rotatedY);
    editor.ctx.closePath();
    editor.ctx.stroke();
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
        switch (affect) {
          case 1: {
            this.dimensions.width -= mouseResize.deltaX;
            this.dimensions.startX += mouseResize.deltaX;
            this.resizer.topLeft.x += mouseResize.deltaX;
            this.resizer.bottomLeft.x += mouseResize.deltaX;
            this.transformation.transformed = true;
            break;
          }
          case 2: {
            this.dimensions.height -= mouseResize.deltaY;
            this.dimensions.startY += mouseResize.deltaY;
            this.resizer.topRight.y += mouseResize.deltaY;
            this.resizer.topLeft.y += mouseResize.deltaY;
            this.transformation.transformed = true;
            break;
          }
          case 3:
            this.dimensions.width += mouseResize.deltaX;
            this.dimensions.endX += mouseResize.deltaX;
            this.resizer.topRight.x += mouseResize.deltaX;
            this.resizer.bottomRight.x += mouseResize.deltaX;
            this.transformation.transformed = true;
            break;
          case 4:
            this.dimensions.height += mouseResize.deltaY;
            this.dimensions.endY += mouseResize.deltaY;
            this.resizer.bottomLeft.y += mouseResize.deltaY;
            this.resizer.bottomRight.y += mouseResize.deltaY;
            this.transformation.transformed = true;
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
            console.log('wrong affect parameter');
        }
      }));
    }
  }

  get calculateLineAngle() {
    const lastAngle = this.transformation.rotationAngle;
    const newAngle = Math.atan2(this.dimensions.endY - this.dimensions.startY, this.dimensions.endX - this.dimensions.startX);
    return {
      angleDifference: newAngle - lastAngle,
      newAngle,
    };
  }
}
