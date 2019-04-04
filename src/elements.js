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
      dragging: false,
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
          this.rotation = Element.calculateRotationDegrees(
            mouseResize.positionX,
            mouseResize.positionY,
            this.startX + this.width / 2,
            this.startY + this.height / 2,
          );
          break;
        default:
          console.log('wrong affect parameter');
      }
    }));
  }

  rotate(editor) {
    editor.ctx.setTransform(1, 0, 0, 1, 0, 0);
    const translationPointX = this.startX + this.width / 2;
    const translationPointY = this.startY + this.height / 2;
    if (this.holder !== null) {
      this.holder.draw();
    }
    editor.ctx.translate(translationPointX, translationPointY);
    const rotation = this.rotation === 0 ? 0.01 : this.rotation - 90 * Math.PI / 180;
    console.log(this.rotation);
    editor.ctx.rotate(rotation);
    this.rotationChange = false;
    editor.ctx.translate(-translationPointX, -translationPointY);
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

  move(mouseMove) {
    this.startX += mouseMove.deltaX;
    this.startY += mouseMove.deltaY;
    this.x += mouseMove.deltaX;
    this.y += mouseMove.deltaY;
    this.resizer.x += mouseMove.deltaX;
    this.resizer.y += mouseMove.deltaY;
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
