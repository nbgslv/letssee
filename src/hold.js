import Element from './elements';

export default class Hold {
  constructor(element) {
    this.resizerWidth = 10;
    this.resizerHeight = 10;
    this.strokeDistX = 10;
    this.strokeDistY = 10;
    this.rotateDistY = 25;
    this.element = element;
    this.resizers = this.resizersArrays.resizers;
    this.lines = this.resizersArrays.lines;
    this.activeResizer = -1;
    this.rotated = false;
    this.dragging = false;
    this.resizing = false;
  }
  
  draw(canvas = true) {
    const editor = canvas ? this.element.editor.canvas.canvas : this.element.canvas.upperCanvas;
    for (let i = 0; i < this.resizers.length; i += 1) {
      editor.ctx.fillRect(
        this.resizers[i].startX,
        this.resizers[i].startY,
        this.resizers[i].width,
        this.resizers[i].height,
      );
    }
    for (let j = 0; j < this.lines.length; j += 1) {
      editor.ctx.beginPath();
      editor.ctx.moveTo(this.lines[j].startX, this.lines[j].startY);
      editor.ctx.lineTo(this.lines[j].x, this.lines[j].y);
      editor.ctx.stroke();
      editor.ctx.closePath();
    }
  }

  select() {
    this.element.editor.renderAll();
    this.draw(true);
    this.element.editor.selection.push(this.element);
    this.element.selected = true; // must be set after rendering canvas
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

  static mouseMove (e, tool) {
    const relativeMousePosition = tool.relativeMousePosition(e);
    const mouse = {
      positionX: relativeMousePosition.x,
      positionY: relativeMousePosition.y,
    };
    tool.editor.elements.forEach((element) => {
      if (element.holder !== null) {
        if (element.holder.dragging) {
          element.holder.moveElement(mouse, e, tool);
          element.holder.draw();
        } else if (element.holder.resizing && element.holder.activeResizer >= 0) {
          element.holder.resize(mouse, e, tool, element.holder.activeResizer);
        }
      }
    });
  }

  mouseUp() {
    const relativeMousePosition = tool.relativeMousePosition(e);
    const mouse = {
      positionX: relativeMousePosition.x,
      positionY: relativeMousePosition.y,
    };
    tool.editor.elements.forEach((element) => {
      if (element.holder !== null) {
        let resized;
        if (element.holder.dragging) {
          element.holder.moveElement(mouse, e, tool);
          //element.holder.draw();
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



  deselect() {
    for (let k = 0; k < this.editor.selection.length; k += 1) {
      const element = this.editor.selection[k];
      if (this.element.id === element.id) {
        this.editor.selection.splice(k, 1);
        break;
      }
    }
    this.editor.renderAll();
    this.resizers = [];
    this.dragging = false;
    this.resizing = false;
    this.element.holder = null;
    this.element.selected = false;
    this.element = undefined;
  }

  rotate(editor) {
    editor.ctx.rotate(this.element.rotation);
  }

  resize(mouse, e, tool, activeResizer) {
    const relativeMousePosition = tool.relativeMousePosition(e);
    const mousePosition = mouse;
    mousePosition.x = relativeMousePosition.x;
    mousePosition.y = relativeMousePosition.y;
    mousePosition.deltaX = e.movementX;
    mousePosition.deltaY = e.movementY;
    this.element.resize(mouse, this.resizers[activeResizer].affect);
    this.editor.renderAll();
    this.draw();
  }

  moveElement(mouse, e) {
    this.editor.clearCanvas(2);
    const mousePosition = mouse;
    mousePosition.deltaX = e.movementX;
    mousePosition.deltaY = e.movementY;
    this.element.move(mouse);
    this.editor.clearCanvas(2);
    this.editor.renderAll();
    this.draw();
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

  mouseDown() {
    const relativeMousePosition = Element.relativeMousePosition(e);
    [this.element.positionX, this.element.positionY] = [
      relativeMousePosition.x,
      relativeMousePosition.y,
    ];
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
          element.editor.canvasUpdate(3, true);
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
}

// TODO rotate
// TODO hold line and hold text
