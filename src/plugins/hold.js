import Element from '../elements';

let selection;

export default class Hold extends Element {
  constructor(name, properties, events, editor, element = null, style) {
    super(name, properties, events, editor, element, style);
    this.resizerWidth = 10;
    this.resizerHeight = 10;
    this.resizers = [];
    this.element = element;
    this.dragging = false;
  }

  drawResizers(element, tool) {
    const resizerWidth = 10;
    const resizerHeight = 10;
    const strokeDistX = 10;
    const strokeDistY = 10;
    const resizers = [];
    let resizer;
    resizer = {
      x: element.x - strokeDistX - resizerWidth / 2,
      y: element.y - strokeDistY - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.x + element.width / 2 - resizerWidth / 2,
      y: element.y - strokeDistY - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.x + element.width + strokeDistX - resizerWidth / 2,
      y: element.y - strokeDistY - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.x + element.width + strokeDistX - resizerWidth / 2,
      y: element.y + element.height / 2 - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.x + element.width + strokeDistX - resizerWidth / 2,
      y: element.y + element.height + strokeDistY - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.x + element.width / 2 - resizerWidth / 2,
      y: element.y + element.height + strokeDistY - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.x - strokeDistX - resizerWidth / 2,
      y: element.y + element.height + strokeDistY - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.x - strokeDistX - resizerWidth / 2,
      y: element.y + element.height / 2 - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizers.forEach((resize) => {
      const dimensions = {
        x: resize.x,
        y: resize.y,
        width: this.resizerWidth,
        height: this.resizerHeight,
      };
      const box = new Hold(
        tool.name,
        tool.properties,
        tool.events,
        tool.editor,
        dimensions,
        null,
      );
      box.editor.canvasUpdate(2, true);
      box.draw();
      this.resizers.push(box);
      this.editor.elements.push(box);
    });
    const stroke = new Hold(
      tool.name,
      tool.properties,
      tool.events,
      tool.editor,
      {
        x: element.x - strokeDistX,
        y: element.y - strokeDistY,
        width: element.width + strokeDistX * 2,
        height: element.height + strokeDistY * 2,
      },
      null,
    );
    stroke.editor.canvasUpdate(2, true);
    stroke.editor.canvas.canvas.ctx.strokeRect(stroke.x, stroke.y, stroke.width, stroke.height);
  }

  draw(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.canvas.upperCanvas;
    editor.ctx.beginPath();
    editor.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  resize(element, mouse, e = null) {
    this.resizers.forEach((resizer) => {
      if (resizer.mouseInElement(mouse.positionX, mouse.positionY)) {
        mouse.deltaX = e.deltaX;
        mouse.deltaY = e.deltaY;
        element.element.width += mouse.deltaX;
        element.element.height += mouse.deltaY;
        element.draw();
      }
    });
  }

  static mouseDown(e, tool) {
    const mouse = {
      positionX: e.clientX,
      positionY: e.clientY,
    };
    for (let i = 0; i < tool.editor.elements.length; i += 1) {
      const element = tool.editor.elements[i];
      if (element.mouseInElement(mouse.positionX, mouse.positionY)) {
        if (element.name === 'hold') {
          element.resize(element, mouse, e);
        } else if (!element.select) {
          const holder = new Hold(
            tool.name,
            tool.properties,
            tool.events,
            tool.editor,
            element,
            null,
          );
          holder.editor.selection.push(element);
          holder.drawResizers(element, tool);
          element.select = true;
        }
      }
    }
  }

  static mouseMove(e, tool) {
    const mouse = {
      positionX: e.clientX,
      positionY: e.clientY,
    };
  }
}
