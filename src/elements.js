import Tool from './tools'


export default class Element extends Tool {
  constructor(name, properties, events, editor, element, style, layer = 1) {
    // TODO elements file
    // TODO figure out how to implement different types of elements
    super(name, properties, events, editor);
    this.id = Math.random();
    this.startX = element.startX;
    this.startY = element.startY;
    this.x = element.x;
    this.y = element.y;
    this.width = element.width;
    this.height = element.height;
    this.rotation = 0;
    this.rotationChange = false;
    this.style = style;
    this.selected = false;
    this.layer = layer;
    this.addLayer();
    this.holder = null;
    if (element.resizer === undefined) {
      this.resizer = null;
    } else {
      this.resizer = {
        x: element.resizer.x,
        y: element.resizer.y,
      };
    }
  }

  draw(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    editor.ctx.save();
    if (this.rotation !== 0 || this.rotationChange) {
      this.rotate(editor);
      this.holder.rotate(editor);
    }
    return editor;
  }

  rotate(editor) {
    editor.ctx.setTransform(1, 0, 0, 1, 0, 0);
    const translationPointX = this.startX + this.width / 2;
    const translationPointY = this.startY + this.height / 2;
    editor.ctx.translate(translationPointX, translationPointY);
    const rotation = this.rotation === 0 ? 0.01 : this.rotation - 90 * Math.PI / 180;
    console.log(this.rotation);
    editor.ctx.rotate(rotation);
    this.rotationChange = false;
    editor.ctx.translate(-translationPointX, -translationPointY);
  }

  resize(mouseResize, affecter) {
    affecter.forEach(((affect) => {
      switch (affect) {
        case 1:
          this.width -= mouseResize.deltaX;
          this.startX += mouseResize.deltaX;
          this.resizer.x += mouseResize.deltaX;
          break;
        case 2:
          this.height -= mouseResize.deltaY;
          this.startY += mouseResize.deltaY;
          this.resizer.y += mouseResize.deltaY;
          break;
        case 3:
          this.width += mouseResize.deltaX;
          this.x += mouseResize.deltaX;
          break;
        case 4:
          this.height += mouseResize.deltaY;
          this.y += mouseResize.deltaY;
          break;
        case 5:
          this.rotation = Element.calculateRotationDegrees(
            mouseResize.positionX,
            mouseResize.positionY,
            this.startX + this.width / 2,
            this.startY + this.height / 2,
          );
          console.log(Element.calculateRotationDegrees(
            mouseResize.positionX,
            mouseResize.positionY,
            this.startX + this.width / 2,
            this.startY + this.height / 2,
          ) * 180 / Math.PI);
          this.rotationChange = true;
          break;
        default:
          console.log('wrong affect parameter');
      }
    }));
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
    return (this.resizer.x <= mousePositionX) && (this.resizer.x + this.width >= mousePositionX)
      && (this.resizer.y <= mousePositionY) && (this.resizer.y + this.height >= mousePositionY);
  }

  static calculateRotationDegrees(x, y, centerX, centerY) {
    return Math.atan2(y - centerY, x - centerX);
  }
}
