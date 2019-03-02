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
      editor.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  select(element, tool) {
    this.element = element;
    this.element.selected = true;
    this.editor.selection.push(element);
    this.editor.canvasUpdate(2, false);
    this.drawResizers(tool);
    this.editor.canvasUpdate(3, true);
    this.element.holder = this;
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

  moveElement(mouse, e, tool) {
    const selection1 = [...tool.editor.selection];
    for (let i = 0; i < selection1.length; i += 1) {
      const element = selection1[i];
      element.startX += e.movementX;
      element.startY += e.movementY;
      element.x += e.movementX;
      element.y += e.movementY;
      element.resizer.x += e.movementX;
      element.resizer.y += e.movementY;
      this.deselect();
      this.dragging = true;
      this.select(element, tool);
      this.element.selected = true;
    }
  }

  static deselectAll(tool) {
    for (let i = 0; i < tool.editor.selection.length; i += 1) {
      const selected = tool.editor.selection[i];
      selected.holder.deselect();
      i = -1;
    }
  }

  static mouseDown(e, tool) {
    const mouse = {
      positionX: e.clientX,
      positionY: e.clientY,
    };
    let selected = false;
    tool.editor.elements.forEach((element) => {
      if (element.mouseInElement(mouse.positionX, mouse.positionY)) {
        if (element.selected) {
          element.holder.dragging = true;
          selected = true;
        } else if (element.name === 'hold') {
          element.holder.resizing = true;
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
    const mouse = {
      positionX: e.clientX,
      positionY: e.clientY,
    };
    tool.editor.selection.forEach((element) => {
      if (element.holder !== null && element.holder.dragging) {
        element.holder.moveElement(mouse, e, tool);
      }
    });
  }

  static mouseUp(e, tool) {
    const mouse = {
      positionX: e.clientX,
      positionY: e.clientY,
    };
    tool.editor.elements.forEach((element) => {
      if (element.holder !== null && element.holder.dragging) {
        element.holder.moveElement(mouse, e, tool);
      }
      if (element.holder !== null) element.holder.dragging = false;
    });
  }
}
