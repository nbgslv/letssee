import Tool from './tools'
import { CANVAS_STATE } from './globals';

export default class Element extends Tool {
  constructor(name, properties, events, element, style, layer = 1) {
    // TODO elements file
    // TODO figure out how to implement different types of elements
    super(name, properties, events);
    this.x = element.x;
    this.y = element.y;
    this.width = element.width;
    this.height = element.height;
    this.style = style;
    this.layer = layer;
  }

  mouseInShape(mousePositionX, mousePositionY) {
    return (this.x <= mousePositionX) && (this.x + this.width >= mousePositionX)
      && (this.y <= mousePositionY) && (this.y + this.height >= mousePositionY);
  }

  layer() {
    this.layer = CANVAS_STATE.layers + 1;
    CANVAS_STATE.layers += 1;
  }
}
