import Element from '../elements';
import Utilities from '../utilities';

export default class Line extends Element {
  constructor(name, moduleName, properties, events, editor) {
    super(name, moduleName, properties, events, editor);
    this.transformation.translationOrigin = 'start';
    this.transformation.drawTransformed = true;
    this.transformation.resizedRotation = false;
    this.transformation.lineRotationAngle = 0;
    this.style.set('lineWidth', 20);
    this.drawn = false;
  }

  draw(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    editor.ctx.beginPath();
    editor.ctx.lineWidth = this.style.get('lineWidth');
    editor.ctx.moveTo(this.dimensions.startX, this.dimensions.startY);
    editor.ctx.lineTo(this.dimensions.endX, this.dimensions.endY);
    editor.ctx.closePath();
    editor.ctx.stroke();
    console.log(this.transformation.rotationAngle, 'rotationangle');
  }

  endDraw() {
    this.draw = function () {

    }
    //this.drawTransformed();
    this.transformation.lineRotationAngle = this.transformation.rotationAngle;
    this.transformation.rotationAngle = 0;
    this.transformation.rotated = true;
    this.editor.elements.push(this);
    this.editor.renderAll();
    this.transformation.drawTransformed = false;

    const editor = this.editor.canvas.testCanvas;
    editor.ctx.strokeStyle = 'red';
    editor.ctx.beginPath();
    editor.ctx.moveTo(this.resizer.topLeft.rotatedX, this.resizer.topLeft.rotatedY);
    editor.ctx.lineTo(this.resizer.topRight.rotatedX, this.resizer.topRight.rotatedY);
    editor.ctx.lineTo(this.resizer.bottomRight.rotatedX, this.resizer.bottomRight.rotatedY);
    editor.ctx.lineTo(this.resizer.bottomLeft.rotatedX, this.resizer.bottomLeft.rotatedY);
    editor.ctx.closePath();
    editor.ctx.stroke();
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
      width: Math.sqrt((Math.abs(startX - endX) ** 2) + (Math.abs(startY - endY) ** 2)),
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
    this.resizer.topLeft.y = dimensions.startY - dimensions.height / 2;
    this.resizer.topRight.x = dimensions.endX;
    this.resizer.topRight.y = dimensions.endY - dimensions.height / 2;
    this.resizer.bottomLeft.x = dimensions.startX;
    this.resizer.bottomLeft.y = dimensions.startY + dimensions.height / 2;
    this.resizer.bottomRight.x = dimensions.endX;
    this.resizer.bottomRight.y = dimensions.endY + dimensions.height / 2;
    this.resizer.topLeft.rotatedX = dimensions.startX + this.rotatedCornerSelectorFactor;
    this.resizer.topLeft.rotatedY = dimensions.startY - dimensions.height / 2;
    this.resizer.topRight.rotatedX = dimensions.endX + this.rotatedCornerSelectorFactor;
    this.resizer.topRight.rotatedY = dimensions.endY - dimensions.height / 2;
    this.resizer.bottomLeft.rotatedX = dimensions.startX - this.rotatedCornerSelectorFactor;
    this.resizer.bottomLeft.rotatedY = dimensions.startY + dimensions.height / 2;
    this.resizer.bottomRight.rotatedX = dimensions.endX - this.rotatedCornerSelectorFactor;
    this.resizer.bottomRight.rotatedY = dimensions.endY + dimensions.height / 2;
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
    console.log(this.transformation.rotationAngle, 'rotatioangleline');
    this.transformation.transform = true;


  }

  get calcRotateAngle() {
    return {
      newAngle: Math.atan2(
        this.editor.events.canvasEvent.mouse.canvasY - this.dimensions.startY,
        this.editor.events.canvasEvent.mouse.canvasX - this.dimensions.startX,
      ),
      lastAngle: Math.atan2(
        this.dimensions.startY,
        this.dimensions.startX + this.dimensions.width,
      ),
    };
  }

  rotate(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    this.transformation.translationOrigin = 'start';
    const {
      translationX: lineTranslationX,
      translationY: lineTranslationY,
    } = this.translationPoints;
    editor.ctx.translate(lineTranslationX, lineTranslationY);
    editor.ctx.rotate(Utilities.degreesToRadians(this.transformation.rotationAngle));
    if (this.transformation.resizedRotation) {
      const matrix = this.rotationMatrix;
      this.transformation.rotationMatrix = matrix;
      this.transformation.translationOrigin = 'center';
      const {
        translationX,
        translationY,
      } = this.translationPoints;
      editor.ctx.translate(translationX - lineTranslationX, translationY - lineTranslationY);
      editor.ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
      editor.ctx.translate(-(translationX - lineTranslationX), -(translationY - lineTranslationY));
    }
    editor.ctx.translate(-lineTranslationX, -lineTranslationY);
  }

  get rotatedCornerSelectorFactor() {
    return Math.sqrt((this.ribOfCornerTriangle.a ** 2) - (this.ribOfCornerTriangle.b ** 2));
  }

  get ribOfCornerTriangle() {
    const a = this.dimensions.height / 2;
    const b = Math.cos(this.transformation.rotationAngle) * a;
    return {
      a,
      b,
    };
  }

  rotateResizer() {
    const rotationAngle = Utilities.degreesToRadians(this.transformation.lineRotationAngle);
    this.resizer.topLeft.rotatedX = this.resizer.topLeft.x;
    this.resizer.topLeft.rotatedY = this.resizer.topLeft.y;

    this.resizer.topRight.rotatedX = (
      (
        this.resizer.topRight.x
        - this.dimensions.startX
      ) * Utilities.cos(-rotationAngle)
      + (
        this.resizer.topRight.y
      - this.dimensions.startY
      ) * Utilities.sin(-rotationAngle)
    ) + this.dimensions.startX;
    this.resizer.topRight.rotatedY = (
      (
        this.resizer.topRight.y
        - this.dimensions.startY
      ) * Utilities.cos(-rotationAngle)
      - (
        this.resizer.topRight.x
      - this.dimensions.startX
      ) * Utilities.sin(-rotationAngle)
    ) + this.dimensions.startY;

    this.resizer.bottomLeft.rotatedX = this.resizer.bottomLeft.x;
    this.resizer.bottomLeft.rotatedY = this.resizer.bottomLeft.y;

    this.resizer.bottomRight.rotatedX = (
      (
        this.resizer.bottomRight.x
        - this.dimensions.startX
      ) * Utilities.cos(-rotationAngle)
      + (
        this.resizer.bottomRight.y
      - this.dimensions.startY
      ) * Utilities.sin(-rotationAngle)
    ) + this.dimensions.startX;
    this.resizer.bottomRight.rotatedY = (
      (
        this.resizer.bottomRight.y
        - this.dimensions.startY
      ) * Utilities.cos(-rotationAngle)
      - (
        this.resizer.bottomRight.x
      - this.dimensions.startX
      ) * Utilities.sin(-rotationAngle)
    ) + this.dimensions.startY;



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
            let lineWidth = this.dimensions.height;
            lineWidth += mouseResize.deltaY;
            console.log(mouseResize.deltaY, 'mouseresizey');
            this.style.set('lineWidth', Math.abs(lineWidth));
            this.dimensions.height -= mouseResize.deltaY;
            this.dimensions.startY += mouseResize.deltaY / 2;
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
          case 4: {
            let lineWidth = this.dimensions.height;
            lineWidth += mouseResize.deltaY;
            this.style.set('lineWidth', Math.abs(lineWidth));
            this.dimensions.height += mouseResize.deltaY;
            this.dimensions.startY += mouseResize.deltaY / 2;
            this.resizer.bottomLeft.y += mouseResize.deltaY;
            this.resizer.bottomRight.y += mouseResize.deltaY;
            this.transformation.transformed = true;
            break;
          }
          case 5: {
            this.transformation.transform = true;
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
            this.transformation.resizedRotation = true;
            this.transformation.translationOrigin = 'center';
            console.log(this.transformation.rotationAngle, 'rotationangle');
            break;
          }
          default:
            console.log('wrong affect parameter');
        }
      }));
    }
  }

  get translationPoints() {
    let translationX;
    let translationY;
    switch (this.transformation.translationOrigin) {
      case 'center':
        translationX = this.dimensions.startX + this.dimensions.width / 2;
        translationY = this.dimensions.startY;
        console.log(this.dimensions.startY, 'starty');
        console.log(this.dimensions.width, 'width');
        break;
      case 'start':
        translationX = this.dimensions.startX;
        translationY = this.dimensions.startY;
        break;
      default:
        console.log('Translation Origin Point is not defined');
    }
    return {
      translationX,
      translationY,
    };
  }
}
