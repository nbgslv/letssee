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
      topLeft: {
        x: 0,
        y: 0,
      },
      topRight: {
        x: 0,
        y: 0,
      },
      bottomLeft: {
        x: 0,
        y: 0,
      },
      bottomRight: {
        x: 0,
        y: 0,
      },
    };
    this.transformation = {
      activeAffecter: [],
      drawTransformed: false,
      transformed: false,
      rotationMatrix: null,
      rotated: false,
      rotationAngle: 0,
      rotationAngleDifference: 0,
      translationOrigin: 'center',
    };
    this.style = new Map();
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
    this.resizer.topLeft.x = dimensions.startX;
    this.resizer.topLeft.y = dimensions.startY;
    this.resizer.topRight.x = dimensions.endX;
    this.resizer.topRight.y = dimensions.startY;
    this.resizer.bottomLeft.x = dimensions.startX;
    this.resizer.bottomLeft.y = dimensions.endY;
    this.resizer.bottomRight.x = dimensions.endX;
    this.resizer.bottomRight.y = dimensions.endY;
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
      const resizersAdd = new Map();
      resizersAdd.set('x', mouseMove.deltaX);
      resizersAdd.set('y', mouseMove.deltaY);
      this.elementResizersAdd = resizersAdd;
    }
  }

  rotate(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    const matrix = this.rotationMatrix;
    this.transformation.rotationMatrix = matrix;
    const {
      translationX,
      translationY,
    } = this.translationPoints;
    editor.ctx.translate(translationX, translationY);
    editor.ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
    editor.ctx.translate(-translationX, -translationY);
    this.transformation.rotated = true;
  }

  get translationPoints() {
    let translationX;
    let translationY;
    switch (this.transformation.translationOrigin) {
      case 'center':
        translationX = this.dimensions.startX + this.dimensions.width / 2;
        translationY = this.dimensions.startY + this.dimensions.height / 2;
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

  get rotationMatrix() {
    const rotationAngel = Utilities.degreesToRadians(this.transformation.rotationAngle + this.transformation.rotationFactor);
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

  set elementResizersAdd(map) {
    if (!(map instanceof Map)) return 'property "map" of this function must be an instance of Map';
    const elementResizers = Object.values(this.resizer);
    elementResizers.forEach((resizer) => {
      map.forEach((value, key) => {
        resizer[key] += value;
      });
    });
    return true;
  }

  set elementResizersSubtract(map) {
    if (!(map instanceof Map)) return 'property "map" of this function must be an instance of Map';
    const elementResizers = Object.values(this.resizer);
    elementResizers.forEach((resizer) => {
      map.forEach((value, key) => {
        resizer[key] += value;
      });
    });
    return true;
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
    const corners = Object.values(this.resizer);
    let cornerX = 'x';
    let cornerY = 'y';
    if (this.transformation.rotationMatrix) {
      cornerX = 'rotatedX';
      cornerY = 'rotatedY';
    }

    console.log(`[rotateresizer]
    lefttop rotated x: ${corners[0][cornerX]}
    lefttop rotated y: ${corners[0][cornerY]}
    righttop rotated x: ${corners[1][cornerX]}
    righttop rotated y: ${corners[1][cornerY]}
    bottomleft rotated x: ${corners[2][cornerX]}
    bottomleft rotated y: ${corners[2][cornerY]}
    bottomright rotated x: ${corners[3][cornerX]}
    bottomright rotated y: ${corners[3][cornerY]}`);

    let m = Element.lineIncline(
      corners[0][cornerX],
      corners[0][cornerY],
      corners[1][cornerX],
      corners[1][cornerY],
    );
    const borderYTop = Element.borderY(mousePositionX, m);

    m = Element.lineIncline(
      corners[1][cornerX],
      corners[1][cornerY],
      corners[3][cornerX],
      corners[3][cornerY],
    );
    let borderXRight = 0;
    if (m.m === Infinity || m.m === -Infinity) {
      borderXRight = corners[1][cornerX];
    } else {
      borderXRight = Element.borderX(mousePositionY, m);
    }

    m = Element.lineIncline(
      corners[3][cornerX],
      corners[3][cornerY],
      corners[2][cornerX],
      corners[2][cornerY],
    );
    const borderYBottom = Element.borderY(mousePositionX, m);

    m = Element.lineIncline(
      corners[2][cornerX],
      corners[2][cornerY],
      corners[0][cornerX],
      corners[0][cornerY],
    );
    let borderXLeft = 0;
    if (m.m === Infinity || m.m === -Infinity) {
      borderXLeft = corners[0][cornerX];
    } else {
      borderXLeft = Element.borderX(mousePositionY, m);
    }

    console.log(`borderYTop: ${borderYTop}
    borderYBottom: ${borderYBottom}
    borderXRight: ${borderXRight}
    borderXLeft: ${borderXLeft}`);
    // eslint-disable-next-line no-restricted-globals
    if ((isNaN(borderYTop) ? true : mousePositionY >= borderYTop)
      && (mousePositionY <= borderYBottom)
      && (mousePositionX <= borderXRight)
      && (mousePositionX >= borderXLeft)) {
      return this;
    }
    return false;
  }

  static lineIncline(x1, y1, x2, y2) {
    const m = (y1 - y2) / (x1 - x2);
    const lineEq = -(m * x1) + y1;
    return {
      lineEq,
      m,
    };
  }

  static borderX(mousePositionY, m) {
    return (m.lineEq - mousePositionY) / -(m.m);
  }

  static borderY(mousePositionX, m) {
    return m.m * mousePositionX + m.lineEq;
  }

  static relativeMousePosition(e) {
    const rect = this.editor.boundingRect;
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }
}
