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
    this.resizing = false;
    this.id = Math.random();
  }

  drawResizers(tool) {
    const resizerWidth = 10;
    const resizerHeight = 10;
    const strokeDistX = 10;
    const strokeDistY = 10;
    const resizers = [];
    const element = this.element;
    let resizer;
    resizer = {
      x: element.resizer.x - strokeDistX - resizerWidth / 2,
      y: element.resizer.y - strokeDistY - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x + element.width / 2 - resizerWidth / 2,
      y: element.resizer.y - strokeDistY - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x + element.width + strokeDistX - resizerWidth / 2,
      y: element.resizer.y - strokeDistY - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x + element.width + strokeDistX - resizerWidth / 2,
      y: element.resizer.y + element.height / 2 - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x + element.width + strokeDistX - resizerWidth / 2,
      y: element.resizer.y + element.height + strokeDistY - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x + element.width / 2 - resizerWidth / 2,
      y: element.resizer.y + element.height + strokeDistY - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x - strokeDistX - resizerWidth / 2,
      y: element.resizer.y + element.height + strokeDistY - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x - strokeDistX - resizerWidth / 2,
      y: element.resizer.y + element.height / 2 - resizerHeight / 2,
    };
    resizers.push(resizer);
    resizers.forEach((resize) => {
      const dimensions = {
        startX: resize.x,
        startY: resize.y,
        x: resize.x + this.resizerWidth,
        y: resize.y + this.resizerHeight,
        width: this.resizerWidth,
        height: this.resizerHeight,
        element: this.element,
      };
      const box = new Hold(
        tool.name,
        tool.properties,
        tool.events,
        tool.editor,
        dimensions,
        null,
      );
      this.resizers.push(box);
      this.editor.elements.push(box);
    });
    const stroke = new Hold(
      tool.name,
      tool.properties,
      tool.events,
      tool.editor,
      {
        x: element.resizer.x - strokeDistX,
        y: element.resizer.y - strokeDistY,
        width: element.width + strokeDistX * 2,
        height: element.height + strokeDistY * 2,
      },
      null,
    );
    stroke.draw(true, true);
  }

  draw(canvas = true, stroke = false) {
    const editor = canvas ? this.editor.canvas.canvas : this.canvas.upperCanvas;
    editor.ctx.beginPath();
    if (stroke) {
      editor.ctx.strokeRect(this.x, this.y, this.width, this.height);
    } else {
      editor.ctx.fillRect(this.startX, this.startY, this.width, this.height);
    }
  }

  select(element, tool) {
    this.element = element;
    this.element.selected = true;
    this.editor.canvasUpdate(2, false);
    this.drawResizers(tool);
    this.editor.canvasUpdate(3, true);
    this.element.holder = this;
    this.editor.selection.push(element);
  }

  deselect() {
    for (let i = this.editor.elements.length - 1; i >= 0; i -= 1) {
      let restart = false;
      const element = this.editor.elements[i];
      for (let j = 0; j < this.resizers.length; j += 1) {
        const resizer = this.resizers[j];
        if (element.name === 'hold' && element.id === resizer.id) {
          this.editor.elements.splice(i, 1);
          restart = true;
        }
      }
      if (restart) i = this.editor.elements.length;
    }
    for (let k = 0; k < this.editor.selection.length; k += 1) {
      const element = this.editor.selection[k];
      if (this.element.id === element.id) {
        this.editor.selection.splice(k, 1);
        break;
      }
    }
    this.editor.canvasUpdate(2, true);
    this.resizers = [];
    this.dragging = false;
    this.resizing = false;
    this.element.holder = null;
    this.element.selected = false;
    this.element = undefined;
  }

  resize(mouse, e) {
    this.element.element.holder.resizers.forEach((resizer) => {
      if (resizer.mouseInElement(mouse.positionX, mouse.positionY)) {
        mouse.deltaX = e.deltaX;
        mouse.deltaY = e.deltaY;
        resizer.element.element.width += mouse.deltaX;
        resizer.element.element.height += mouse.deltaY;
        resizer.element.element.draw();
        resizer.editor.canvasUpdate(2, true);
      }
    });
  }

  moveElement(mouse, e) {
    this.element.startX += e.movementX;
    this.element.startY += e.movementY;
    this.element.x += e.movementX;
    this.element.y += e.movementY;
    this.element.resizer.x += e.movementX;
    this.element.resizer.y += e.movementY;
    this.editor.canvasUpdate(2, true);
  }

  static deselectAll(tool) {
    for (let i = 0; i < tool.editor.selection.length; i += 1) {
      const selected = tool.editor.selection[i];
      selected.holder.deselect();
      i = -1;
    }
  }

  static mouseDown(e, tool) {
    const relativeMousePosition = tool.relativeMousePosition(e);
    const mouse = {
      positionX: relativeMousePosition.x,
      positionY: relativeMousePosition.y,
    };
    let selected = false;
    tool.editor.elements.forEach((element) => {
      if (element.mouseInElement(mouse.positionX, mouse.positionY)) {
        if (element.selected) {
          tool.editor.selection.forEach((select) => {
            select.holder.dragging = true;
          });
          selected = true;
        } else if (element.name === 'hold') {
          element.resizing = true;
          element.resize(mouse, e);
          selected = true;
        } else {
          if (!(e.ctrlKey) && element.editor.selection.length > 0) this.deselectAll(tool);
          element.holder = new Hold(
            tool.name,
            tool.properties,
            tool.events,
            tool.editor,
            element,
            null,
          );
          element.holder.select(element, tool);
          selected = true;
        }
      }
    });
    if (!selected) {
      this.deselectAll(tool);
      tool.editor.canvasUpdate(2, true);
    }
  }

  static mouseMove(e, tool) {
    const relativeMousePosition = tool.relativeMousePosition(e);
    const mouse = {
      positionX: relativeMousePosition.x,
      positionY: relativeMousePosition.y,
    };
    tool.editor.selection.forEach((element) => {
      if (element.holder !== null && element.holder.dragging) {
        element.holder.moveElement(mouse, e, tool);
      }
    });
    tool.editor.selection.forEach((element) => {
      if (element.holder !== null && element.holder.dragging) {
        element.holder.deselect();
        element.holder = new Hold(
          tool.name,
          tool.properties,
          tool.events,
          tool.editor,
          element,
          null,
        );
        element.holder.select(element, tool);
        element.holder.dragging = true;
        element.selected = true;
      }
    });
  }

  static mouseUp(e, tool) {
    const relativeMousePosition = tool.relativeMousePosition(e);
    const mouse = {
      positionX: relativeMousePosition.x,
      positionY: relativeMousePosition.y,
    };
    tool.editor.elements.forEach((element) => {
      if (element.holder !== null && element.holder.dragging) {
        element.holder.moveElement(mouse, e, tool);
      }
      if (element.holder !== null) element.holder.dragging = false;
    });
  }
}

// TODO resolve stroke problem
// TODO rotate
// TODO hold line and hold text
