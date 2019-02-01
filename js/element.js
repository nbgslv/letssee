const Elements = [];

class Element {
  constructor(type, x, y, width, height, style) {
    this.type = type;
    // TODO elements file
    // TODO figure out how to implement different types of elements
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.style = style;
    this.layer = 1;
  }

  mouseInShape(mousePositionX, mousePositionY) {
    return (this.x <= mousePositionX) && (this.x + this.width >= mousePositionX)
      && (this.y <= mousePositionY) && (this.y + this.height >= mousePositionY);
  }
}

export { Elements, Element };
