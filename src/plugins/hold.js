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
    this.element.startX += e.movementX;
    this.element.startY += e.movementY;
    this.element.x += e.movementX;
    this.element.y += e.movementY;
    this.element.resizer.x += e.movementX;
    this.element.resizer.y += e.movementY;
    this.element.draw(true);
    for (let i = this.editor.elements.length - 1; i >= 0; i -= 1) {
      const element = this.editor.elements[i];
      this.resizers.forEach((resizer) => {
        if (element.name === 'hold' && element.id === resizer.id) {
          this.editor.elements.splice(i, 1);
        }
      });
    }
    this.editor.canvasUpdate(2, false);
    this.drawResizers(this.element, tool);
    this.editor.canvasUpdate(3, true);
  }

  static deselect(tool, element = null) {
    if (element === null) {
      for (let i = tool.editor.elements.length - 1; i >= 0; i -= 1) {
        const elementer = tool.editor.elements[i];
        if (elementer.name === 'hold') tool.editor.elements.splice(i, 1);
        elementer.select = false;
        elementer.holder = null;
      }
      tool.editor.selection = [];
    } else {
      element.holder.select = false;
      for (let i = element.editor.elements.length; i >= 0; i -= 1) {
        const elementer = element.editor.elements[i];
        elementer.resizers.forEach((resizer) => {
          if (elementer.name === 'hold' && elementer.id === resizer.id) {
            element.editor.elements.splice(i, 1);
          }
        });
        element.editor.selection.forEach((select) => {
          if (elementer.id === select.id) {
            element.editor.selection.splice(i, 1);
          }
        });
      }
      element.holder.resizers = [];
      element.holder = null;
    }
    tool.editor.canvasUpdate(2, true);
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
          element.resize(element, mouse, e);
          selected = true;
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
          holder.editor.canvasUpdate(2, false);
          holder.drawResizers(element, tool);
          holder.editor.canvasUpdate(3, true);
          element.holder = holder;
          element.select = true;
          selected = true;
        } else if (element.select) {
          element.holder.dragging = true;
          selected = true;
        }
      }
    });
    if (!selected) {
      this.deselect(tool);
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
        element.holder.dragging = false;
      }
    });
  }
}
