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

  resize(mouseResize, affecter) {
    affecter.forEach(((affect) => {
      switch (affect) {
        case 1:
          this.width -= mouseResize.deltaX;
          this.startX += mouseResize.deltaX;
          break;
        case 2:
          this.height -= mouseResize.deltaY;
          this.startY += mouseResize.deltaY;
          break;
        case 3:
          this.width += mouseResize.deltaX;
          this.x += mouseResize.deltaX;
          break;
        case 4:
          this.height += mouseResize.deltaY;
          this.y += mouseResize.deltaY;
          break;
        default:
          console.log('wrong affect parameter');
      }
      this.resizer.x = Math.min(this.element.element.startX, this.element.element.x);
      this.resizer.y = Math.min(this.element.element.startY, this.element.element.y);
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
    return (this.startX <= mousePositionX) && (this.startX + this.width >= mousePositionX)
      && (this.startY <= mousePositionY) && (this.startY + this.height >= mousePositionY);
  }
}
