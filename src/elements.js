import Tool from './tools';
import Hold from './hold';

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
      activeAffecter: -1,
      transform: false,
      transformMatrix: [],
      rotationAngle: 0,
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
    /*editor.ctx.save();
    if (this.rotation !== 0 || this.rotationChange) {
      this.rotate(editor);
    }*/
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
            break;
          case 2:
            this.dimensions.height -= mouseResize.deltaY;
            this.dimensions.startY += mouseResize.deltaY;
            this.resizer.topLeftY += mouseResize.deltaY;
            break;
          case 3:
            this.dimensions.width += mouseResize.deltaX;
            this.dimensions.endX += mouseResize.deltaX;
            break;
          case 4:
            this.dimensions.height += mouseResize.deltaY;
            this.dimensions.endY += mouseResize.deltaY;
            break;
          case 5:
            this.transformation.transform = true;
            const {
              lastAngel,
              newAngel,
            } = this.calcRotateAngle;
            this.transformation.rotationAngle = Element.radiansToDegrees(lastAngel - newAngel)
              + this.transformation.rotationAngle;
            if (this.transformation.rotationAngle < 0) this.transformation.rotationAngle += 360;
            this.transformation.rotationAngle %= 360;
            break;
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
    editor.ctx.save();
    const matrix = Element.multiplyMatrices(this.translateMatrix, this.rotationMatrix);
    editor.ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[4]);
    this.draw();
    editor.ctx.restore();
  }

  get rotationMatrix() {
    const rotationAngel = Element.degreesToRadians(this.transformation.rotationAngle);
    const cos = Math.cos(rotationAngel);
    const sin = Math.sin(rotationAngel);
    return [cos, sin, -sin, cos, 0, 0];
  }

  get translateMatrix() {
    const translateToCenterValue = this.translateToCenterByRotateVector;
    return [
      1,
      0,
      0,
      1,
      translateToCenterValue.x,
      translateToCenterValue.y,
    ];
  }

  get calcRotateAngle() {
    const translateToCenterValue = this.translateToCenterByRotateVector;
    return {
      lastAngel: Math.atan2(this.editor.events.canvasEvent.mouse.startCanvasY - translateToCenterValue.y,
        this.editor.events.canvasEvent.mouse.startCanvasX - translateToCenterValue.x),
      newAngel: Math.atan2(this.editor.events.canvasEvent.mouse.canvasY - translateToCenterValue.y,
        this.editor.events.canvasEvent.mouse.canvasX - translateToCenterValue.x),
    };
  }

  get calcCenterPoint() {
    const translateX = 0.5 * this.dimensions.width;
    const translateY = 0.5 * this.dimensions.height;
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
    const radians = Element.degreesToRadians(this.transformation.rotationAngle);
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
    return {
      x: translateX * cos - translateY * sin,
      y: translateX * sin - translateY * cos,
    };
  }

  get translateToCenterByRotateVector() {
    const centerPoint = this.calcCenterPoint;
    const rotateVector = this.rotateVector(centerPoint);
    return this.rotatePoint(rotateVector);
  }

  static degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  static radiansToDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  static multiplyMatrices(a, b) {
    return [
      a[0] * b[0] + a[2] * b[1],
      a[1] * b[0] + a[3] * b[1],
      a[0] * b[2] + a[2] * b[3],
      a[1] * b[2] + a[3] * b[3],
      a[0] * b[4] + a[2] * b[5] + a[4],
      a[1] * b[4] + a[3] * b[5] + a[5],
    ];
  }

  transform() {
    if (this.transformation.dragging) {
      this.move();
    } else {
      this.transformation.transform = true;
      const ctx = this.upperCanvas
        ? this.editor.canvas.upperCanvas.ctx
        : this.editor.canvas.canvas.ctx;
      ctx.save();
      ctx.setTransform(this.transformation.transformMatrix);
      if (this.transformation.rotationAngle > 0) {
        ctx.save();
        this.translateToCenter();
        ctx.rotate(this.transformation.rotationAngle);
        this.unTranslate();
        ctx.restore();
      }
      if (this.holder) this.holder.draw();
      this.draw();
      ctx.restore();
    }
  }

  addLayer() {
    this.layer = this.editor.layers + 1;
    this.editor.layers += 1;
  }

  mouseInElement(mousePositionX, mousePositionY) {
    if ((this.resizer.topLeftX <= mousePositionX) && (this.resizer.topLeftX + this.dimensions.width >= mousePositionX)
      && (this.resizer.topLeftY <= mousePositionY) && (this.resizer.topLeftY + this.dimensions.height >= mousePositionY)) {
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

  static calculateRotationDegrees(x, y, centerX, centerY) {
    return Math.atan2(y - centerY, x - centerX);
  }
}
