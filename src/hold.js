export default class Hold {
  constructor (element) {
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

  draw (update = false, canvas = true) {
    const editor = canvas ? this.element.editor.canvas.canvas : this.element.canvas.upperCanvas;
    if (update) this.updateResizersArrays();
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

  select () {
    this.element.editor.renderAll();
    this.draw(true);
    this.element.editor.selection.push(this.element);
    this.element.selected = true; // must be set after rendering canvas
  }

  get resizersArrays () {
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
        startX: element.resizer.topLeftX - strokeDistX - resizerWidth / 2,
        startY: element.resizer.topLeftY - strokeDistY - resizerHeight / 2,
        x: (element.resizer.topLeftX - strokeDistX - resizerWidth / 2) + resizerWidth,
        y: (element.resizer.topLeftY - strokeDistY - resizerHeight / 2) + resizerHeight,
        clickStartX: element.resizer.topLeftX - strokeDistX - resizerWidth / 2,
        clickStartY: element.resizer.topLeftY - strokeDistY - resizerHeight / 2,

        width: resizerWidth,
        height: resizerHeight,
        affect: [1, 2],
        type: 'resizer',
        selfId: 1,
      },
      {
        startX: element.resizer.topLeftX + element.dimensions.width / 2 - resizerWidth / 2,
        startY: element.resizer.topLeftY - strokeDistY - resizerHeight / 2,
        x: (element.resizer.topLeftX + element.dimensions.width / 2 - resizerWidth / 2) + resizerWidth,
        y: (element.resizer.topLeftY - strokeDistY - resizerHeight / 2) + resizerHeight,
        clickStartX: element.resizer.topLeftX + element.dimensions.width / 2 - resizerWidth / 2,
        clickStartY: element.resizer.topLeftY - strokeDistY - resizerHeight / 2,
        width: resizerWidth,
        height: resizerHeight,
        affect: [2],
        type: 'resizer',
        selfId: 2,
      },
      {
        startX: element.resizer.topLeftX + element.dimensions.width + strokeDistX - resizerWidth / 2,
        startY: element.resizer.topLeftY - strokeDistY - resizerHeight / 2,
        x: (element.resizer.topLeftX + element.dimensions.width + strokeDistX - resizerWidth / 2) + resizerWidth,
        y: (element.resizer.topLeftY - strokeDistY - resizerHeight / 2) + resizerHeight,
        clickStartX: element.resizer.topLeftX + element.dimensions.width + strokeDistX - resizerWidth / 2,
        clickStartY: element.resizer.topLeftY - strokeDistY - resizerHeight / 2,
        width: resizerWidth,
        height: resizerHeight,
        affect: [2, 3],
        type: 'resizer',
        selfId: 3,
      },
      {
        startX: element.resizer.topLeftX + element.dimensions.width + strokeDistX - resizerWidth / 2,
        startY: element.resizer.topLeftY + element.dimensions.height / 2 - resizerHeight / 2,
        x: (element.resizer.topLeftX + element.dimensions.width + strokeDistX - resizerWidth / 2) + resizerWidth,
        y: (element.resizer.topLeftY + element.dimensions.height / 2 - resizerHeight / 2) + resizerHeight,
        clickStartX: element.resizer.topLeftX + element.dimensions.width + strokeDistX - resizerWidth / 2,
        clickStartY: element.resizer.topLeftY + element.dimensions.height / 2 - resizerHeight / 2,
        width: resizerWidth,
        height: resizerHeight,
        affect: [3],
        type: 'resizer',
        selfId: 4,
      },
      {
        startX: element.resizer.topLeftX + element.dimensions.width + strokeDistX - resizerWidth / 2,
        startY: element.resizer.topLeftY + element.dimensions.height + strokeDistY - resizerHeight / 2,
        x: (element.resizer.topLeftX + element.dimensions.width + strokeDistX - resizerWidth / 2) + resizerWidth,
        y: (
          element.resizer.topLeftY + element.dimensions.height + strokeDistY - resizerHeight / 2
        ) + resizerHeight,
        clickStartX: element.resizer.topLeftX + element.dimensions.width + strokeDistX - resizerWidth / 2,
        clickStartY: element.resizer.topLeftY + element.dimensions.height + strokeDistY - resizerHeight / 2,
        width: resizerWidth,
        height: resizerHeight,
        affect: [3, 4],
        type: 'resizer',
        selfId: 5,
      },
      {
        startX: element.resizer.topLeftX + element.dimensions.width / 2 - resizerWidth / 2,
        startY: element.resizer.topLeftY + element.dimensions.height + strokeDistY - resizerHeight / 2,
        x: (element.resizer.topLeftX + element.dimensions.width / 2 - resizerWidth / 2) + resizerWidth,
        y: (
          element.resizer.topLeftY + element.dimensions.height + strokeDistY - resizerHeight / 2
        ) + resizerHeight,
        clickStartX: element.resizer.topLeftX + element.dimensions.width / 2 - resizerWidth / 2,
        clickStartY: element.resizer.topLeftY + element.dimensions.height + strokeDistY - resizerHeight / 2,
        width: resizerWidth,
        height: resizerHeight,
        affect: [4],
        type: 'resizer',
        selfId: 6,
      },
      {
        startX: element.resizer.topLeftX - strokeDistX - resizerWidth / 2,
        startY: element.resizer.topLeftY + element.dimensions.height + strokeDistY - resizerHeight / 2,
        x: (element.resizer.topLeftX - strokeDistX - resizerWidth / 2) + resizerWidth,
        y: (
          element.resizer.topLeftY + element.dimensions.height + strokeDistY - resizerHeight / 2
        ) + resizerHeight,
        clickStartX: element.resizer.topLeftX - strokeDistX - resizerWidth / 2,
        clickStartY: element.resizer.topLeftY + element.dimensions.height + strokeDistY - resizerHeight / 2,
        width: resizerWidth,
        height: resizerHeight,
        affect: [4, 1],
        type: 'resizer',
        selfId: 7,
      },
      {
        startX: element.resizer.topLeftX - strokeDistX - resizerWidth / 2,
        startY: element.resizer.topLeftY + element.dimensions.height / 2 - resizerHeight / 2,
        x: (element.resizer.topLeftX - strokeDistX - resizerWidth / 2) + resizerWidth,
        y: (element.resizer.topLeftY + element.dimensions.height / 2 - resizerHeight / 2) + resizerHeight,
        clickStartX: element.resizer.topLeftX - strokeDistX - resizerWidth / 2,
        clickStartY: element.resizer.topLeftY + element.dimensions.height / 2 - resizerHeight / 2,
        width: resizerWidth,
        height: resizerHeight,
        affect: [1],
        type: 'resizer',
        selfId: 8,
      },
      {
        startX: element.resizer.topLeftX + element.dimensions.width / 2 - resizerWidth / 2,
        startY: element.resizer.topLeftY - rotateDistY - resizerHeight / 2,
        x: (element.resizer.topLeftX + element.dimensions.width / 2 - resizerWidth / 2) + resizerWidth,
        y: (element.resizer.topLeftY - rotateDistY - resizerHeight / 2) + resizerHeight,
        clickStartX: element.resizer.topLeftX + element.dimensions.width / 2 - resizerWidth / 2,
        clickStartY: element.resizer.topLeftY - rotateDistY - resizerHeight / 2,
        width: resizerWidth,
        height: resizerHeight,
        affect: [5],
        type: 'rotator',
        selfId: 9,
      },
    ];
    console.log(`clickStartX: ${resizers[0].clickStartX}
    clickStartY: ${resizers[0].clickStartY}
    resizerID: ${resizers[0].selfId}`);
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

  updateResizersArrays() {
    this.resizers = this.resizersArrays.resizers;
    this.lines = this.resizersArrays.lines;
  }

  updateResizersAfterRotation(rotationAngelDifference) {
    this.resizers.forEach((resizer) => {
      resizer.clickStartX = (resizer.clickStartX - (this.element.dimensions.startX + (this.element.dimensions.width / 2))) * Math.cos(-rotationAngelDifference)
        + (resizer.clickStartY - (this.element.dimensions.startY + (this.element.dimensions.height / 2))) * Math.sin(-rotationAngelDifference);
      resizer.clickStartX += this.element.dimensions.startX + (this.element.dimensions.width / 2);
      resizer.clickStartY = (resizer.clickStartY - (this.element.dimensions.startY + (this.element.dimensions.height / 2))) * Math.cos(-rotationAngelDifference)
        - (resizer.clickStartX - (this.element.dimensions.startX + (this.element.dimensions.width / 2))) * Math.sin(-rotationAngelDifference);
      resizer.clickStartY += this.element.dimensions.startY + (this.element.dimensions.height / 2);

      /*
      editor.ctx.save();
      if (transformMatrix !== null) {
        editor.ctx.transform(1, 0, 0, 1, 0, 0);
      }
      for (let i = 0; i < this.resizers.length; i += 1) {
        editor.ctx.fillStyle = '#FF0000';
        editor.ctx.fillRect(
          this.resizers[i].clickStartX,
          this.resizers[i].clickStartY,
          this.resizers[i].width,
          this.resizers[i].height,
        );
      }
      editor.ctx.restore();
       */
    });
  }

  mouseInResizer(mousePositionX, mousePositionY) {
    let answer = null;
    this.resizers.forEach((resizer) => {
      if ((resizer.clickStartX <= mousePositionX) && (resizer.clickStartX + resizer.width >= mousePositionX)
        && (resizer.clickStartY <= mousePositionY) && (resizer.clickStartY + resizer.height >= mousePositionY)) {
        answer = resizer;
      }
    });
    return answer;
  }

  deselect () {
    for (let k = 0; k < this.element.editor.selection.length; k += 1) {
      const element = this.element.editor.selection[k];
      if (this.element.id === element.id) {
        this.element.editor.selection.splice(k, 1);
        break;
      }
    }
    this.element.editor.renderAll();
    this.resizers = [];
    this.dragging = false;
    this.resizing = false;
    this.element.holder = null;
    this.element.selected = false;
    this.element = undefined;
  }

  resize (mouse, e, tool, activeResizer) {
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
}

// TODO rotate
// TODO hold line and hold text
