import { Tool } from './tools.js'

const Elements = [];

class Element extends Tool {
  constructor(x, y, width, height, tool, style) {
    // TODO elements file
    // TODO figure out how to implement different types of elements
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tool = tool;
    this.style = style;
    this.layer = 1;
  }

  mouseInShape(mousePositionX, mousePositionY) {
    return (this.x <= mousePositionX) && (this.x + this.width >= mousePositionX)
      && (this.y <= mousePositionY) && (this.y + this.height >= mousePositionY);
  }
}

export { Elements, Element };
