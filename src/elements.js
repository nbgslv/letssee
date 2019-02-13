import Tool from './tools'

export default class Element extends Tool {
  constructor(name, properties, events, editor, element, style, layer = 1) {
    // TODO elements file
    // TODO figure out how to implement different types of elements
    super(name, properties, events, editor);
    this.x = element.x;
    this.y = element.y;
    this.width = element.width;
    this.height = element.height;
    this.style = style;
    this.layer = layer;
    this.addLayer();
  }

  addLayer() {
    this.layer = this.editor.layers + 1;
    this.editor.layers += 1;
  }

  mouseInElement(mousePositionX, mousePositionY) {
    return (this.x <= mousePositionX) && (this.x + this.width >= mousePositionX)
      && (this.y <= mousePositionY) && (this.y + this.height >= mousePositionY);
  }
}
