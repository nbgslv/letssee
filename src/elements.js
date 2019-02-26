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

  addLayer() {
    this.layer = this.editor.layers + 1;
    this.editor.layers += 1;
  }

  mouseInElement(mousePositionX, mousePositionY) {
    return (this.startX - 10 <= mousePositionX) && (this.startX + this.width + 10 >= mousePositionX)
      && (this.startY - 10 <= mousePositionY) && (this.startY + this.height + 10 >= mousePositionY);
  }
}
