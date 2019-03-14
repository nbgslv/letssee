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

  get resizers() {
    const resizerWidth = 10;
    const resizerHeight = 10;
    const strokeDistX = 10;
    const strokeDistY = 10;
    const rotateDistY = 25;
    const element = this.element;
    let resizer;
    const resizers = [
      {
        startX: element.resizer.x - strokeDistX - resizerWidth / 2,
        startY: element.resizer.y - strokeDistY - resizerHeight / 2,
        x: (element.resizer.x - strokeDistX - resizerWidth / 2) + this.resizerWidth,
        y: (element.resizer.y - strokeDistY - resizerHeight / 2) + this.resizerHeight,
        width: this.resizerWidth,
        height: this.resizerHeight,
        affect: [1, 2],
        type: 'resizer',
        selfId: 1,
      },
      {
        startX: element.resizer.x + element.width / 2 - resizerWidth / 2,
        startY: element.resizer.y - strokeDistY - resizerHeight / 2,
        x: (element.resizer.x + element.width / 2 - resizerWidth / 2) + this.resizerWidth,
        y: (element.resizer.y - strokeDistY - resizerHeight / 2) + this.resizerHeight,
        width: this.resizerWidth,
        height: this.resizerHeight,
        affect: [2],
        type: 'resizer',
        selfId: 2,
      },
      {
        startX: element.resizer.x + element.width + strokeDistX - resizerWidth / 2,
        startY: element.resizer.y - strokeDistY - resizerHeight / 2,
        x: (element.resizer.x + element.width + strokeDistX - resizerWidth / 2) + this.resizerWidth,
        y: (element.resizer.y - strokeDistY - resizerHeight / 2) + this.resizerHeight,
        width: this.resizerWidth,
        height: this.resizerHeight,
        affect: [2, 3],
        type: 'resizer',
        selfId: 3,
      },
      {
        startX: element.resizer.x + element.width + strokeDistX - resizerWidth / 2,
        startY: element.resizer.y + element.height / 2 - resizerHeight / 2,
        x: (element.resizer.x + element.width + strokeDistX - resizerWidth / 2) + this.resizerWidth,
        y: (element.resizer.y + element.height / 2 - resizerHeight / 2) + this.resizerHeight,
        width: this.resizerWidth,
        height: this.resizerHeight,
        affect: [3],
        type: 'resizer',
        selfId: 4,
      },
      {
        startX: element.resizer.x + element.width + strokeDistX - resizerWidth / 2,
        startY: element.resizer.y + element.height + strokeDistY - resizerHeight / 2,
        x: (element.resizer.x + element.width + strokeDistX - resizerWidth / 2) + this.resizerWidth,
        y: (
          element.resizer.y + element.height + strokeDistY - resizerHeight / 2
        ) + this.resizerHeight,
        width: this.resizerWidth,
        height: this.resizerHeight,
        affect: [3, 4],
        type: 'resizer',
        selfId: 5,
      },
      {
        startX: element.resizer.x + element.width / 2 - resizerWidth / 2,
        startY: element.resizer.y + element.height + strokeDistY - resizerHeight / 2,
        x: (element.resizer.x + element.width / 2 - resizerWidth / 2) + this.resizerWidth,
        y: (
          element.resizer.y + element.height + strokeDistY - resizerHeight / 2
        ) + this.resizerHeight,
        width: this.resizerWidth,
        height: this.resizerHeight,
        affect: [4],
        type: 'resizer',
        selfId: 6,
      },
      {
        startX: element.resizer.x - strokeDistX - resizerWidth / 2,
        startY: element.resizer.y + element.height + strokeDistY - resizerHeight / 2,
        x: (element.resizer.x - strokeDistX - resizerWidth / 2) + this.resizerWidth,
        y: (
          element.resizer.y + element.height + strokeDistY - resizerHeight / 2
        ) + this.resizerHeight,
        width: this.resizerWidth,
        height: this.resizerHeight,
        affect: [4, 1],
        type: 'resizer',
        selfId: 7,
      },
      {
        startX: element.resizer.x - strokeDistX - resizerWidth / 2,
        startY: element.resizer.y + element.height / 2 - resizerHeight / 2,
        x: (element.resizer.x - strokeDistX - resizerWidth / 2) + this.resizerWidth,
        y: (element.resizer.y + element.height / 2 - resizerHeight / 2) + this.resizerHeight,
        width: this.resizerWidth,
        height: this.resizerHeight,
        affect: [1],
        type: 'resizer',
        selfId: 8,
      },
      {
        startX: element.resizer.x + element.width / 2 - resizerWidth / 2,
        startY: element.resizer.y - rotateDistY - resizerHeight / 2,
        x: (element.resizer.x + element.width / 2 - resizerWidth / 2) + this.resizerWidth,
        y: (element.resizer.y - rotateDistY - resizerHeight / 2) + this.resizerHeight,
        width: this.resizerWidth,
        height: this.resizerHeight,
        affect: [5],
        type: 'rotator',
        selfId: 9,
      },
    ];
    const lines = [
      {
        startX: resizers[0].x,
        startY: resizers[0].y - this.resizerHeight / 2,
        x: resizers[1].startX,
        y: resizers[1].startY - this.resizerHeight / 2,
        type: 'line',
        selfId: 1,
      },
      {
        startX: resizers[1].x,
        startY: resizers[1].y - this.resizerHeight / 2,
        x: resizers[2].startX,
        y: resizers[2].startY - this.resizerHeight / 2,
        type: 'line',
        selfId: 2,
      },
      {
        startX: resizers[2].x - this.resizerWidth / 2,
        startY: resizers[2].y,
        x: resizers[3].startX + this.resizerWidth / 2,
        y: resizers[3].startY,
        type: 'line',
        selfId: 3,
      },
      {
        startX: resizers[3].x - this.resizerWidth / 2,
        startY: resizers[3].y,
        x: resizers[4].startX + this.resizerWidth / 2,
        y: resizers[4].startY,
        type: 'line',
        selfId: 4,
      },
      {
        startX: resizers[4].startX,
        startY: resizers[4].startY + this.resizerHeight / 2,
        x: resizers[5].x,
        y: resizers[5].y - this.resizerHeight / 2,
        type: 'line',
        selfId: 5,
      },
      {
        startX: resizers[5].startX,
        startY: resizers[5].startY + this.resizerHeight / 2,
        x: resizers[6].x,
        y: resizers[6].y - this.resizerHeight / 2,
        type: 'line',
        selfId: 6,
      },
      {
        startX: resizers[6].startX + this.resizerWidth / 2,
        startY: resizers[6].startY,
        x: resizers
      }
    ];
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
