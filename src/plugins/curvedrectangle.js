import Element from '../elements';

export default class CurvedRectangle extends Element {
  constructor(name, moduleName, properties, events, editor) {
    super(name, moduleName, properties, events, editor);
    // TODO get from tools options
    this.curveXY = 25;
    this.curveX = 25;
    this.curveY = 25;
  }

  draw(canvas = true) {
    const editor = super.draw(canvas);
    editor.ctx.beginPath();
    editor.ctx.moveTo(this.dimensions.startX + this.curveX, this.dimensions.startY);
    editor.ctx.lineTo(this.dimensions.endX - this.curveX, this.dimensions.startY);
    editor.ctx.quadraticCurveTo(
      this.dimensions.endX,
      this.dimensions.startY,
      this.dimensions.endX,
      this.dimensions.startY + this.curveY,
    );
    editor.ctx.lineTo(this.dimensions.endX, this.dimensions.endY - this.curveY);
    editor.ctx.quadraticCurveTo(
      this.dimensions.endX,
      this.dimensions.endY,
      this.dimensions.endX - this.curveX,
      this.dimensions.endY,
    );
    editor.ctx.lineTo(this.dimensions.startX + this.curveX, this.dimensions.endY);
    editor.ctx.quadraticCurveTo(
      this.dimensions.startX,
      this.dimensions.endY,
      this.dimensions.startX,
      this.dimensions.endY - this.curveY,
    );
    editor.ctx.lineTo(this.dimensions.startX, this.dimensions.startY + this.curveY);
    editor.ctx.quadraticCurveTo(
      this.dimensions.startX,
      this.dimensions.startY,
      this.dimensions.startX + this.curveX,
      this.dimensions.startY,
    );
    editor.ctx.stroke();
    //editor.ctx.restore();
  }

  updateElement() {
    const startX = this.editor.events.canvasEvent.mouse.startCanvasX;
    const startY = this.editor.events.canvasEvent.mouse.startCanvasY;
    const endX = this.editor.events.canvasEvent.mouse.canvasX;
    const endY = this.editor.events.canvasEvent.mouse.canvasY;
    let transformedStartX;
    let transformedStartY;
    let transformedX;
    let transformedY;
    if (endX > startX && endY > startY) {
      transformedStartX = startX;
      transformedStartY = startY;
      transformedX = endX;
      transformedY = endY;
    } else if (endX < startX && endY < startY) {
      transformedStartX = endX;
      transformedStartY = endY;
      transformedX = startX;
      transformedY = startY;
    } else if (endX < startX && endY > startY) {
      transformedStartX = endX;
      transformedStartY = startY;
      transformedX = startX;
      transformedY = endY;
    } else if (endX > startX && endY < startY) {
      transformedStartX = startX;
      transformedStartY = endY;
      transformedX = endX;
      transformedY = startY;
    }
    this.elementDimensions = {
      startX: transformedStartX,
      startY: transformedStartY,
      endX: transformedX,
      endY: transformedY,
      width: Math.abs(startX - endX),
      height: Math.abs(startY - endY),
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
    this.curveX = width <= this.curveXY * 2 ? Math.abs(width) / 2 : this.curveXY;
    this.curveY = height <= this.curveXY * 2 ? Math.abs(height) / 2 : this.curveXY;
    this.resizer.topLeftX = dimensions.startX;
    this.resizer.topLeftY = dimensions.startY;
  }
}
