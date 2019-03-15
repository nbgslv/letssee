import Element from '../elements';

let selection;

export default class Hold extends Element {
  constructor(name, properties, events, editor, element = null, style) {
    super(name, properties, events, editor, element, style);
    this.resizerWidth = 10;
    this.resizerHeight = 10;
    this.strokeDistX = 10;
    this.strokeDistY = 10;
    this.rotateDistY = 25;
    this.element = element;
    this.resizers = [];
    this.lines = [];
    this.activeResizer = -1;
    this.rotated = false;
    this.dragging = false;
    this.resizing = false;
    this.id = Math.random();
  }

  get resizersArrays() {
    const {
      resizerWidth,
      resizerHeight,
      strokeDistX,
      strokeDistY,
      rotateDistY,
      element,
    } = this;
    const resizers = [
      {
        startX: element.resizer.x - strokeDistX - resizerWidth / 2,
        startY: element.resizer.y - strokeDistY - resizerHeight / 2,
        x: (element.resizer.x - strokeDistX - resizerWidth / 2) + resizerWidth,
        y: (element.resizer.y - strokeDistY - resizerHeight / 2) + resizerHeight,
        width: resizerWidth,
        height: resizerHeight,
        affect: [1, 2],
        type: 'resizer',
        selfId: 1,
      },
      {
        startX: element.resizer.x + element.width / 2 - resizerWidth / 2,
        startY: element.resizer.y - strokeDistY - resizerHeight / 2,
        x: (element.resizer.x + element.width / 2 - resizerWidth / 2) + resizerWidth,
        y: (element.resizer.y - strokeDistY - resizerHeight / 2) + resizerHeight,
        width: resizerWidth,
        height: resizerHeight,
        affect: [2],
        type: 'resizer',
        selfId: 2,
      },
      {
        startX: element.resizer.x + element.width + strokeDistX - resizerWidth / 2,
        startY: element.resizer.y - strokeDistY - resizerHeight / 2,
        x: (element.resizer.x + element.width + strokeDistX - resizerWidth / 2) + resizerWidth,
        y: (element.resizer.y - strokeDistY - resizerHeight / 2) + resizerHeight,
        width: resizerWidth,
        height: resizerHeight,
        affect: [2, 3],
        type: 'resizer',
        selfId: 3,
      },
      {
        startX: element.resizer.x + element.width + strokeDistX - resizerWidth / 2,
        startY: element.resizer.y + element.height / 2 - resizerHeight / 2,
        x: (element.resizer.x + element.width + strokeDistX - resizerWidth / 2) + resizerWidth,
        y: (element.resizer.y + element.height / 2 - resizerHeight / 2) + resizerHeight,
        width: resizerWidth,
        height: resizerHeight,
        affect: [3],
        type: 'resizer',
        selfId: 4,
      },
      {
        startX: element.resizer.x + element.width + strokeDistX - resizerWidth / 2,
        startY: element.resizer.y + element.height + strokeDistY - resizerHeight / 2,
        x: (element.resizer.x + element.width + strokeDistX - resizerWidth / 2) + resizerWidth,
        y: (
          element.resizer.y + element.height + strokeDistY - resizerHeight / 2
        ) + resizerHeight,
        width: resizerWidth,
        height: resizerHeight,
        affect: [3, 4],
        type: 'resizer',
        selfId: 5,
      },
      {
        startX: element.resizer.x + element.width / 2 - resizerWidth / 2,
        startY: element.resizer.y + element.height + strokeDistY - resizerHeight / 2,
        x: (element.resizer.x + element.width / 2 - resizerWidth / 2) + resizerWidth,
        y: (
          element.resizer.y + element.height + strokeDistY - resizerHeight / 2
        ) + resizerHeight,
        width: resizerWidth,
        height: resizerHeight,
        affect: [4],
        type: 'resizer',
        selfId: 6,
      },
      {
        startX: element.resizer.x - strokeDistX - resizerWidth / 2,
        startY: element.resizer.y + element.height + strokeDistY - resizerHeight / 2,
        x: (element.resizer.x - strokeDistX - resizerWidth / 2) + resizerWidth,
        y: (
          element.resizer.y + element.height + strokeDistY - resizerHeight / 2
        ) + resizerHeight,
        width: resizerWidth,
        height: resizerHeight,
        affect: [4, 1],
        type: 'resizer',
        selfId: 7,
      },
      {
        startX: element.resizer.x - strokeDistX - resizerWidth / 2,
        startY: element.resizer.y + element.height / 2 - resizerHeight / 2,
        x: (element.resizer.x - strokeDistX - resizerWidth / 2) + resizerWidth,
        y: (element.resizer.y + element.height / 2 - resizerHeight / 2) + resizerHeight,
        width: resizerWidth,
        height: resizerHeight,
        affect: [1],
        type: 'resizer',
        selfId: 8,
      },
      {
        startX: element.resizer.x + element.width / 2 - resizerWidth / 2,
        startY: element.resizer.y - rotateDistY - resizerHeight / 2,
        x: (element.resizer.x + element.width / 2 - resizerWidth / 2) + resizerWidth,
        y: (element.resizer.y - rotateDistY - resizerHeight / 2) + resizerHeight,
        width: resizerWidth,
        height: resizerHeight,
        affect: [5],
        type: 'rotator',
        selfId: 9,
      },
    ];
    const lines = [
      {
        startX: resizers[0].x,
        startY: resizers[0].y - resizerHeight / 2,
        x: resizers[1].startX,
        y: resizers[1].startY + resizerHeight / 2,
        type: 'line',
        selfId: 1,
      },
      {
        startX: resizers[1].x,
        startY: resizers[1].y - resizerHeight / 2,
        x: resizers[2].startX,
        y: resizers[2].startY + resizerHeight / 2,
        type: 'line',
        selfId: 2,
      },
      {
        startX: resizers[2].x - resizerWidth / 2,
        startY: resizers[2].y,
        x: resizers[3].startX + resizerWidth / 2,
        y: resizers[3].startY,
        type: 'line',
        selfId: 3,
      },
      {
        startX: resizers[3].x - resizerWidth / 2,
        startY: resizers[3].y,
        x: resizers[4].startX + resizerWidth / 2,
        y: resizers[4].startY,
        type: 'line',
        selfId: 4,
      },
      {
        startX: resizers[4].startX,
        startY: resizers[4].startY + resizerHeight / 2,
        x: resizers[5].x,
        y: resizers[5].y - resizerHeight / 2,
        type: 'line',
        selfId: 5,
      },
      {
        startX: resizers[5].startX,
        startY: resizers[5].startY + resizerHeight / 2,
        x: resizers[6].x,
        y: resizers[6].y - resizerHeight / 2,
        type: 'line',
        selfId: 6,
      },
      {
        startX: resizers[6].startX + resizerWidth / 2,
        startY: resizers[6].startY,
        x: resizers[7].x - resizerWidth / 2,
        y: resizers[7].y,
        type: 'line',
        selfId: 7,
      },
      {
        startX: resizers[7].startX + resizerWidth / 2,
        startY: resizers[7].startY,
        x: resizers[0].x - resizerWidth / 2,
        y: resizers[0].y,
        type: 'line',
        selfId: 8,
      },
      {
        startX: resizers[1].startX + resizerWidth / 2,
        startY: resizers[1].startY,
        x: resizers[8].x - resizerWidth / 2,
        y: resizers[8].y,
        type: 'line',
        selfId: 9,
      },
    ];
    return {
      resizers,
      lines,
    };
  }

  draw(canvas = true) {
    const editor = canvas ? this.editor.canvas.canvas : this.canvas.upperCanvas;
    const { resizers, lines } = this.resizersArrays;
    for (let i = 0; i < resizers.length; i += 1) {
      editor.ctx.fillRect(
        resizers[i].startX,
        resizers[i].startY,
        resizers[i].width,
        resizers[i].height,
      );
    }
    for (let j = 0; j < lines.length; j += 1) {
      editor.ctx.moveTo(lines[j].startX, lines[j].startY);
      editor.ctx.lineTo(lines[j].x, lines[j].y);
      editor.ctx.stroke();
    }
    this.resizers = resizers;
    this.lines = lines;
  }

  select(element, tool, canvas = true) {
    //const editor = canvas ? this.editor.canvas.canvas : this.editor.canvas.upperCanvas;
    this.element = element;
    this.element.selected = true;
    this.editor.canvasUpdate(2, false);
    //this.rotate(editor);
    this.draw(true);
    this.element.holder = this;
    this.editor.selection.push(element);
  }

  deselect() {
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

  resize(mouse, e, tool, activeResizer) {
    const relativeMousePosition = tool.relativeMousePosition(e);
    mouse.x = relativeMousePosition.x;
    mouse.y = relativeMousePosition.y;
    mouse.deltaX = e.movementX;
    mouse.deltaY = e.movementY;
    this.element.resize(mouse, this.resizers[activeResizer].affect);
  }

  moveElement(mouse, e) {
    mouse.deltaX = e.movementX;
    mouse.deltaY = e.movementY;
    this.element.move(mouse);
    this.editor.canvasUpdate(2, true);
  }

  mouseInResizer(mousePositionX, mousePositionY) {
    for (let i = 0; i < this.resizers.length; i += 1) {
      if ((this.resizers[i].startX <= mousePositionX)
      && (this.resizers[i].startX + this.resizers[i].width >= mousePositionX)
      && (this.resizers[i].startY <= mousePositionY)
      && (this.resizers[i].startY + this.resizers[i].height >= mousePositionY)) {
        return i;
      }
    }
    return -1;
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
          /*
        } else if (element.name === 'hold') {
          tool.editor.selection.forEach((select) => {
            select.holder.resizing = true;
          });
          element.resizing = true;
          selected = true;
          */
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
          element.editor.canvasUpdate(2, true);
        }
      } else if (element.holder.mouseInResizer(mouse.positionX, mouse.positionY) >= 0) {
        element.holder.activeResizer = element.holder.mouseInResizer(
          mouse.positionX, mouse.positionY,
        );
        console.log(element.holder.activeResizer);
        element.holder.resizing = true;
        selected = true;
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
    tool.editor.elements.forEach((element) => {
      if (element.holder !== null) {
        if (element.name !== 'hold' && element.holder.dragging) {
          element.holder.moveElement(mouse, e, tool);
        } else if (element.holder.resizing && element.holder.activeResizer >= 0) {
          element.holder.resize(mouse, e, tool, element.holder.activeResizer);
          resizerElement = element;
        }
      }
    });
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
          element.holder.resize(mouse, e, tool, element.holder.activeResizer);
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
