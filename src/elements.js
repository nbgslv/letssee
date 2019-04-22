import Tool from './tools';
import Hold from './hold';
import Utilities from './utilities';

export default class Element extends Tool {
  constructor(name, moduleName, properties, events, editor, style = null, layer = 1) {
    // TODO elements file
    // TODO figure out how to implement different types of elements
    super(name, moduleName, properties, events, editor);
    this.id = Symbol('element');
    this.type = 'element';
    this.upperCanvas = false;
    this.dimensions = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      width: 0,
      height: 0,
    };
    this.resizer = {
      topLeftX: 0,
      topLeftY: 0,
    };
    this.transformation = {
      activeAffecter: [],
      transformed: false,
      rotationMatrix: null,
      rotated: false,
      rotationAngle: 0,
      rotationAngleDifference: 0,
    };
    this.style = style;
    this.selected = false;
    this.layer = layer;
    this.addLayer();
    this.holder = null;
    /*
  } else {
    this.resizer = {
      x: element.resizer.x,
      y: element.resizer.y,
    };
     */
  }

  draw(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    /* editor.ctx.save();
    if (this.rotation !== 0 || this.rotationChange) {
      this.rotate(editor);
    } */
    return editor;
  }

  endDraw() {
    this.updateElement();
    this.editor.elements.push(this);
    this.editor.renderAll();
  }

  updateElement() {
    const startX = this.editor.events.canvasEvent.mouse.startCanvasX;
    const startY = this.editor.events.canvasEvent.mouse.startCanvasY;
    const endX = this.editor.events.canvasEvent.mouse.canvasX;
    const endY = this.editor.events.canvasEvent.mouse.canvasY;
    this.elementDimensions = {
      startX: Math.min(endX, startX),
      startY: Math.min(endY, startY),
      endX: Math.max(endX, startX),
      endY: Math.max(endY, startY),
      width: Math.abs(startX - endX),
      height: Math.abs(startY - endY),
    };
    this.editor.renderAll();
    this.draw(false);
  }

  set elementDimensions(dimensions) {
    this.dimensions.startX = dimensions.startX;
    this.dimensions.startY = dimensions.startY;
    this.dimensions.endX = dimensions.endX;
    this.dimensions.endY = dimensions.endY;
    this.dimensions.width = dimensions.width;
    this.dimensions.height = dimensions.height;
    this.resizer.topLeftX = dimensions.startX;
    this.resizer.topLeftY = dimensions.startY;
  }

  select() {
    this.holder = new Hold(this);
    this.holder.select();
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
          case 1:
            this.dimensions.width -= mouseResize.deltaX;
            this.dimensions.startX += mouseResize.deltaX;
            this.resizer.topLeftX += mouseResize.deltaX;
            this.transformation.transformed = true;
            break;
          case 2:
            this.dimensions.height -= mouseResize.deltaY;
            this.dimensions.startY += mouseResize.deltaY;
            this.resizer.topLeftY += mouseResize.deltaY;
            this.transformation.transformed = true;
            break;
          case 3:
            this.dimensions.width += mouseResize.deltaX;
            this.dimensions.endX += mouseResize.deltaX;
            this.transformation.transformed = true;
            break;
          case 4:
            this.dimensions.height += mouseResize.deltaY;
            this.dimensions.endY += mouseResize.deltaY;
            this.transformation.transformed = true;
            break;
          case 5: {
            this.transformation.transform = true;
            const {
              lastAngel,
              newAngel,
            } = this.calcRotateAngle;
            this.transformation.rotationAngleDifference = Utilities.radiansToDegrees(
              newAngel - lastAngel,
            );
            console.log(this.transformation.rotationAngleDifference, 'rotation difference - deg');
            this.transformation.rotationAngle = this.transformation.rotationAngleDifference
              + this.transformation.rotationAngle;
            console.log(this.transformation.rotationAngle, 'current angle');
            this.transformation.rotationAngleDifference = Utilities.degreesToRadians(
              this.transformation.rotationAngleDifference,
            );
            console.log(this.transformation.rotationAngleDifference, 'rotation difference - rad');
            if (this.transformation.rotationAngle < 0) this.transformation.rotationAngle += 360;
            this.transformation.rotationAngle %= 360;
            //this.holder.updateResizersAfterRotation();
            break;
          }
          default:
            console.log('wrong affect parameter');
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
      this.resizer.topLeftX += mouseMove.deltaX;
      this.resizer.topLeftY += mouseMove.deltaY;
    }
  }

  rotate() {
    const editor = this.editor.canvas.canvas;
    const matrix = this.rotationMatrix;
    this.transformation.rotationMatrix = matrix;
    editor.ctx.translate(this.dimensions.startX + this.dimensions.width / 2,
      this.dimensions.startY + this.dimensions.height / 2);
    editor.ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
    editor.ctx.translate(-(this.dimensions.startX + this.dimensions.width / 2),
      -(this.dimensions.startY + this.dimensions.height / 2));
    this.transformation.rotated = true;
  }

  get rotationMatrix() {
    const rotationAngel = Utilities.degreesToRadians(this.transformation.rotationAngle);
    const cos = Math.cos(rotationAngel);
    const sin = Math.sin(rotationAngel);
    return [cos, sin, -sin, cos, 0, 0];
  }

  get calcRotateAngle() {
    const translateToCenterValue = this.translateToCenterByRotateVector;
    return {
      lastAngel: Math.atan2(
        this.editor.events.canvasEvent.mouse.startCanvasY - translateToCenterValue.y,
        this.editor.events.canvasEvent.mouse.startCanvasX - translateToCenterValue.x,
      ),
      newAngel: Math.atan2(
        this.editor.events.canvasEvent.mouse.canvasY - translateToCenterValue.y,
        this.editor.events.canvasEvent.mouse.canvasX - translateToCenterValue.x,
      ),
    };
  }

  get calcCenterPoint() {
    const translateX = 0.5 * (this.dimensions.width + 11);
    const translateY = 0.5 * (this.dimensions.height + 11);
    return {
      translateX,
      translateY,
      x: this.dimensions.startX + translateX,
      y: this.dimensions.startY + translateY,
    };
  }

  rotatePoint(rotateVector) {
    const {
      x: vectorPointX,
      y: vectorPointY,
    } = rotateVector;
    return {
      x: this.dimensions.startX + vectorPointX,
      y: this.dimensions.startY + vectorPointY,
    };
  }

  rotateVector(translationToCenter) {
    const {
      translateX,
      translateY,
    } = translationToCenter;
    const radians = Utilities.degreesToRadians(this.transformation.rotationAngle);
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
    return {
      x: translateX * cos - translateY * sin,
      y: translateX * sin + translateY * cos,
    };
  }

  get translateToCenterByRotateVector() {
    const centerPoint = this.calcCenterPoint;
    const rotateVector = this.rotateVector(centerPoint);
    return this.rotatePoint(rotateVector);
  }

  addLayer() {
    this.layer = this.editor.layers + 1;
    this.editor.layers += 1;
  }

  mouseInElement(mousePositionX, mousePositionY) {
    if ((this.resizer.topLeftX <= mousePositionX)
      && (this.resizer.topLeftX + this.dimensions.width >= mousePositionX)
      && (this.resizer.topLeftY <= mousePositionY)
      && (this.resizer.topLeftY + this.dimensions.height >= mousePositionY)) {
      return this;
    }
    return false;
  }

  static relativeMousePosition(e) {
    const rect = this.editor.boundingRect;
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }
}
