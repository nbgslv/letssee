import Element from '../elements';

let selection;

export default class Hold extends Element {
  constructor(name, properties, events, editor, element = null, type, affect = null, holder = null, resizerId = 0, style) {
    super(name, properties, events, editor, element, style);
    this.resizerWidth = 10;
    this.resizerHeight = 10;
    this.resizers = [];
    this.stroke = {};
    this.element = element;
    this.type = type;
    this.affect = affect;
    this.holder = holder;
    this.rotated = false;
    this.dragging = false;
    this.resizing = false;
    this.resizerId = resizerId;
    this.id = Math.random();
  }

  drawResizers(tool) {
    const resizerWidth = 10;
    const resizerHeight = 10;
    const strokeDistX = 10;
    const strokeDistY = 10;
    const rotateDistY = 25;
    const resizers = [];
    const element = this.element;
    let resizer;
    resizer = {
      x: element.resizer.x - strokeDistX - resizerWidth / 2,
      y: element.resizer.y - strokeDistY - resizerHeight / 2,
      affect: [1, 2],
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x + element.width / 2 - resizerWidth / 2,
      y: element.resizer.y - strokeDistY - resizerHeight / 2,
      affect: [2],
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x + element.width + strokeDistX - resizerWidth / 2,
      y: element.resizer.y - strokeDistY - resizerHeight / 2,
      affect: [2, 3],
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x + element.width + strokeDistX - resizerWidth / 2,
      y: element.resizer.y + element.height / 2 - resizerHeight / 2,
      affect: [3],
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x + element.width + strokeDistX - resizerWidth / 2,
      y: element.resizer.y + element.height + strokeDistY - resizerHeight / 2,
      affect: [3, 4],
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x + element.width / 2 - resizerWidth / 2,
      y: element.resizer.y + element.height + strokeDistY - resizerHeight / 2,
      affect: [4],
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x - strokeDistX - resizerWidth / 2,
      y: element.resizer.y + element.height + strokeDistY - resizerHeight / 2,
      affect: [4, 1],
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x - strokeDistX - resizerWidth / 2,
      y: element.resizer.y + element.height / 2 - resizerHeight / 2,
      affect: [1],
    };
    resizers.push(resizer);
    resizer = {
      x: element.resizer.x + element.width / 2 - resizerWidth / 2,
      y: element.resizer.y - rotateDistY - resizerHeight / 2,
      affect: [5],
    };
    resizers.push(resizer);
    for (let i = 1; i <= resizers.length; i += 1) {
      const resize = resizers[i - 1];
      const dimensions = {
        startX: resize.x,
        startY: resize.y,
        x: resize.x + this.resizerWidth,
        y: resize.y + this.resizerHeight,
        width: this.resizerWidth,
        height: this.resizerHeight,
        element: this.element,
        resizer: {
          x: resize.x,
          y: resize.y,
        },
      };
      const box = new Hold(
        tool.name,
        tool.properties,
        tool.events,
        tool.editor,
        dimensions,
        'resizer',
        resize.affect,
        this,
        i,
        null,
      );
      this.resizers.push(box);
      this.editor.elements.push(box);
    }
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
        rotateDistY: rotateDistY - resizerHeight,
        resizer: {
          x: element.resizer.x,
          y: element.resizer.y,
        },
      },
      'stroke',
      null,
      null,
      null,
      null,
    );
    this.resizers.push(stroke);
    this.editor.elements.push(stroke);
  }

  draw(canvas = true, type = this.type) {
    const editor = canvas ? this.editor.canvas.canvas : this.canvas.upperCanvas;
    editor.ctx.beginPath();
    if (type === 'stroke') {
      editor.ctx.strokeRect(this.x, this.y, this.width, this.height);
      editor.ctx.moveTo(this.x + this.width / 2, this.y);
      editor.ctx.lineTo(this.x + this.width / 2, this.y - this.element.rotateDistY);
      editor.ctx.stroke();
    } else if (type === 'resizer') {
      editor.ctx.fillRect(this.startX, this.startY, this.width, this.height);
    }
  }

  rotate(editor) {
    const element = this.element;
    const tool = {

    }
    this.drawResizers({this.name, this.properties, this.events});
  }

  select(element, tool, canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    this.element = element;
    this.element.selected = true;
    this.editor.canvasUpdate(2, false);
    editor.ctx.save();
    this.drawResizers(tool);
    this.rotate(editor);
    this.editor.canvasUpdate(3, true);
    editor.ctx.restore();
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

  resize(mouse, e, tool) {
    const relativeMousePosition = tool.relativeMousePosition(e);
    mouse.x = relativeMousePosition.x;
    mouse.y = relativeMousePosition.y;
    mouse.deltaX = e.movementX;
    mouse.deltaY = e.movementY;
    this.element.element.resize(mouse, this.affect);
  }

  moveElement(mouse, e) {
    mouse.deltaX = e.movementX;
    mouse.deltaY = e.movementY;
    this.element.move(mouse);
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
          tool.editor.selection.forEach((select) => {
            select.holder.resizing = true;
          });
          element.resizing = true;
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
    let resizerElement;
    let rotationAngle;
    tool.editor.elements.forEach((element) => {
      if (element.holder !== null) {
        if (element.name !== 'hold' && element.holder.dragging) {
          element.holder.moveElement(mouse, e, tool);
        } else if (element.resizing) {
          rotationAngle = element.rotation;
          element.resize(mouse, e, tool);
          resizerElement = element;
        }
      }
    });
    let rotation;
    tool.editor.selection.forEach((element) => {
      if (element.holder.dragging || element.holder.resizing) {
        const dragged = element.holder.dragging;
        const resized = element.holder.resizing;
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
        element.holder.dragging = dragged;
        element.holder.resizing = resized;
        element.holder.resizers.forEach((resizer) => {
          if (resizerElement !== undefined) {
            if (resizer.resizerId === resizerElement.resizerId) {
              resizer.resizing = resizerElement.resizing;
            }
          }
        });
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
      if (element.holder !== null) {
        let resized;
        if (element.name !== 'hold' && element.holder.dragging) {
          element.holder.moveElement(mouse, e, tool);
        } else if (element.holder.resizing) {
          element.holder.resizers.forEach((resizer) => {
            if (resizer.resizing) {
              resizer.resize(mouse, e, tool);
              resized = resizer;
            }
          });
        }
        if (element.holder !== null) {
          element.holder.dragging = false;
          element.holder.resizing = false;
          if (resized !== undefined) resized.resizing = false;
        }
      }
    });
  }
}

// TODO resolve stroke problem
// TODO rotate
// TODO hold line and hold text
