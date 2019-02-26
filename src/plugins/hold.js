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

  drawResizers(element, tool) {
    const resizerWidth = 10;
    const resizerHeight = 10;
    const strokeDistX = 10;
    const strokeDistY = 10;
    const resizers = [];
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
    this.drawResizers(element, tool);
    this.editor.canvasUpdate(3, true);
    this.drawResizers(element, tool);
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
    this.editor.selection.forEach((element) => {
      element.startX += e.movementX;
      element.startY += e.movementY;
      element.x += e.movementX;
      element.y += e.movementY;
      element.resizer.x += e.movementX;
      element.resizer.y += e.movementY;
      element.draw(true);
      for (let i = this.editor.elements.length - 1; i >= 0; i -= 1) {
        for (let j = 0; j < this.resizers.length; j += 1) {
          const resizer = this.resizers[j];
          console.log(`i: ${i}`);
          console.log(`j: ${j}`);
          if (this.editor.elements[i].name === 'hold' && this.editor.elements[i].id === resizer.id) {
            this.editor.elements.splice(i, 1);
          }
        }
      }
      this.editor.canvasUpdate(2, false);
      this.drawResizers(this.element, tool);
      this.editor.canvasUpdate(3, true);
    });
  }

  static deselectAll(tool) {
    for (let i = tool.editor.elements.length - 1; i >= 0; i -= 1) {
      const element = tool.editor.elements[i];
      if (element.name === 'hold') tool.editor.elements.splice(i, 1);
      element.selected = false;
      element.holder = null;
    }
    tool.editor.selection = [];
  }

  static mouseDown(e, tool) {
    const mouse = {
      positionX: e.clientX,
      positionY: e.clientY,
    };
    let selected = false;
    tool.editor.elements.forEach((element) => {
      if (element.mouseInElement(mouse.positionX, mouse.positionY)) {
        if (element.name === 'hold') {
          element.holder.resizing = true;
          selected = true;
          return;
        }
        if (element.selected) {
          element.holder.dragging = true;
          selected = true;
        } else {
          if (!e.ctrlKey && element.editor.selection.length > 0) {
            this.deselectAll(tool);
          }
          const holder = new Hold(
            tool.name,
            tool.properties,
            tool.events,
            tool.editor,
            element,
            null,
          );
          element.holder = holder;
          holder.select(element, tool);
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
