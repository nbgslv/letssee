const Elements = [];

class Element {
  constructor(x, y, width, height, style) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.style = style;
  }

  mouseInShape(mousePositionX, mousePositionY) {
    return (this.x <= mousePositionX) && (this.x + this.width >= mousePositionX)
      && (this.y <= mousePositionY) && (this.y + this.height >= mousePositionY);
  }
}

export { Elements, Element };
