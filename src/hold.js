import Utilities from './utilities';

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
    editor.ctx.beginPath();
    editor.ctx.fillStyle = '#000000';
    for (let i = 0; i < this.resizers.length; i += 1) {
      editor.ctx.moveTo(this.resizers[i].corners.topLeft.x, this.resizers[i].corners.topLeft.y);
      editor.ctx.lineTo(this.resizers[i].corners.topRight.x, this.resizers[i].corners.topLeft.y);
      editor.ctx.lineTo(
        this.resizers[i].corners.bottomRight.x,
        this.resizers[i].corners.bottomRight.y,
      );
      editor.ctx.lineTo(
        this.resizers[i].corners.bottomLeft.x,
        this.resizers[i].corners.bottomLeft.y,
      );
    }
    editor.ctx.fill();
    editor.ctx.closePath();
    editor.ctx.beginPath();
    editor.ctx.strokeStyle = '#000000';
    for (let j = 0; j < this.lines.length; j += 1) {
      editor.ctx.moveTo(this.lines[j].startX, this.lines[j].startY);
      editor.ctx.lineTo(this.lines[j].x, this.lines[j].y);
    }
    editor.ctx.stroke();
    editor.ctx.closePath();
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
        corners: {
          topLeft: {
            x: element.resizer.topLeft.x - strokeDistX - resizerWidth / 2,
            y: element.resizer.topLeft.y - strokeDistY - resizerHeight / 2,
          },
          topRight: {
            x: (element.resizer.topLeft.x - strokeDistX - resizerWidth / 2) + resizerWidth,
            y: element.resizer.topLeft.y - strokeDistY - resizerHeight / 2,
          },
          bottomLeft: {
            x: element.resizer.topLeft.x - strokeDistX - resizerWidth / 2,
            y: (element.resizer.topLeft.y - strokeDistY - resizerHeight / 2) + resizerHeight,
          },
          bottomRight: {
            x: (element.resizer.topLeft.x - strokeDistX - resizerWidth / 2) + resizerWidth,
            y: (element.resizer.topLeft.y - strokeDistY - resizerHeight / 2) + resizerHeight,
          },
        },
        width: resizerWidth,
        height: resizerHeight,
        affect: [1, 2],
        type: 'resizer',
        selfId: 1,
      },
      {
        corners: {
          topLeft: {
            x: element.resizer.topLeft.x + element.dimensions.width / 2 - resizerWidth / 2,
            y: element.resizer.topLeft.y - strokeDistY - resizerHeight / 2,
          },
          topRight: {
            x: (element.resizer.topLeft.x + element.dimensions.width / 2 - resizerWidth / 2)
              + resizerWidth,
            y: element.resizer.topLeft.y - strokeDistY - resizerHeight / 2,
          },
          bottomLeft: {
            x: element.resizer.topLeft.x + element.dimensions.width / 2 - resizerWidth / 2,
            y: (element.resizer.topLeft.y - strokeDistY - resizerHeight / 2) + resizerHeight,
          },
          bottomRight: {
            x: (element.resizer.topLeft.x + element.dimensions.width / 2 - resizerWidth / 2)
              + resizerWidth,
            y: (element.resizer.topLeft.y - strokeDistY - resizerHeight / 2) + resizerHeight,
          },
        },
        width: resizerWidth,
        height: resizerHeight,
        affect: [2],
        type: 'resizer',
        selfId: 2,
      },
      {
        corners: {
          topLeft: {
            x: element.resizer.topLeft.x
              + element.dimensions.width
              + strokeDistX
              - resizerWidth / 2,
            y: element.resizer.topLeft.y - strokeDistY - resizerHeight / 2,
          },
          topRight: {
            x: (
              element.resizer.topLeft.x + element.dimensions.width + strokeDistX - resizerWidth / 2
            ) + resizerWidth,
            y: element.resizer.topLeft.y - strokeDistY - resizerHeight / 2,
          },
          bottomLeft: {
            x: element.resizer.topLeft.x
              + element.dimensions.width
              + strokeDistX
              - resizerWidth / 2,
            y: (element.resizer.topLeft.y - strokeDistY - resizerHeight / 2) + resizerHeight,
          },
          bottomRight: {
            x: (
              element.resizer.topLeft.x + element.dimensions.width + strokeDistX - resizerWidth / 2
            ) + resizerWidth,
            y: (element.resizer.topLeft.y - strokeDistY - resizerHeight / 2) + resizerHeight,
          },
        },
        width: resizerWidth,
        height: resizerHeight,
        affect: [2, 3],
        type: 'resizer',
        selfId: 3,
      },
      {
        corners: {
          topLeft: {
            x: element.resizer.topLeft.x
              + element.dimensions.width
              + strokeDistX
              - resizerWidth / 2,
            y: element.resizer.topLeft.y + element.dimensions.height / 2 - resizerHeight / 2,
          },
          topRight: {
            x: (
              element.resizer.topLeft.x + element.dimensions.width + strokeDistX - resizerWidth / 2
            ) + resizerWidth,
            y: element.resizer.topLeft.y + element.dimensions.height / 2 - resizerHeight / 2,
          },
          bottomLeft: {
            x: element.resizer.topLeft.x
              + element.dimensions.width
              + strokeDistX
              - resizerWidth / 2,
            y: (
              element.resizer.topLeft.y + element.dimensions.height / 2 - resizerHeight / 2
            ) + resizerHeight,
          },
          bottomRight: {
            x: (
              element.resizer.topLeft.x + element.dimensions.width + strokeDistX - resizerWidth / 2
            ) + resizerWidth,
            y: (
              element.resizer.topLeft.y + element.dimensions.height / 2 - resizerHeight / 2
            ) + resizerHeight,
          },
        },
        width: resizerWidth,
        height: resizerHeight,
        affect: [3],
        type: 'resizer',
        selfId: 4,
      },
      {
        corners: {
          topLeft: {
            x: element.resizer.topLeft.x
              + element.dimensions.width
              + strokeDistX
              - resizerWidth / 2,
            y: element.resizer.topLeft.y
              + element.dimensions.height
              + strokeDistY
              - resizerHeight / 2,
          },
          topRight: {
            x: (
              element.resizer.topLeft.x + element.dimensions.width + strokeDistX - resizerWidth / 2
            ) + resizerWidth,
            y: element.resizer.topLeft.y
              + element.dimensions.height
              + strokeDistY
              - resizerHeight / 2,
          },
          bottomLeft: {
            x: element.resizer.topLeft.x
              + element.dimensions.width
              + strokeDistX
              - resizerWidth / 2,
            y: (
              element.resizer.topLeft.y
              + element.dimensions.height
              + strokeDistY
              - resizerHeight / 2
            ) + resizerHeight,
          },
          bottomRight: {
            x: (
              element.resizer.topLeft.x + element.dimensions.width + strokeDistX - resizerWidth / 2
            ) + resizerWidth,
            y: (
              element.resizer.topLeft.y
              + element.dimensions.height
              + strokeDistY
              - resizerHeight / 2
            ) + resizerHeight,
          },
        },
        width: resizerWidth,
        height: resizerHeight,
        affect: [3, 4],
        type: 'resizer',
        selfId: 5,
      },
      {
        corners: {
          topLeft: {
            x: element.resizer.topLeft.x + element.dimensions.width / 2 - resizerWidth / 2,
            y: element.resizer.topLeft.y
              + element.dimensions.height
              + strokeDistY
              - resizerHeight / 2,
          },
          topRight: {
            x: (
              element.resizer.topLeft.x + element.dimensions.width / 2 - resizerWidth / 2
            ) + resizerWidth,
            y: element.resizer.topLeft.y
              + element.dimensions.height
              + strokeDistY
              - resizerHeight / 2,
          },
          bottomLeft: {
            x: element.resizer.topLeft.x + element.dimensions.width / 2 - resizerWidth / 2,
            y: (
              element.resizer.topLeft.y
              + element.dimensions.height
              + strokeDistY
              - resizerHeight / 2
            ) + resizerHeight,
          },
          bottomRight: {
            x: (
              element.resizer.topLeft.x + element.dimensions.width / 2 - resizerWidth / 2
            ) + resizerWidth,
            y: (
              element.resizer.topLeft.y
              + element.dimensions.height
              + strokeDistY
              - resizerHeight / 2
            ) + resizerHeight,
          },
        },
        width: resizerWidth,
        height: resizerHeight,
        affect: [4],
        type: 'resizer',
        selfId: 6,
      },
      {
        corners: {
          topLeft: {
            x: element.resizer.topLeft.x - strokeDistX - resizerWidth / 2,
            y: element.resizer.topLeft.y
              + element.dimensions.height
              + strokeDistY
              - resizerHeight / 2,
          },
          topRight: {
            x: (element.resizer.topLeft.x - strokeDistX - resizerWidth / 2) + resizerWidth,
            y: element.resizer.topLeft.y
              + element.dimensions.height
              + strokeDistY
              - resizerHeight / 2,
          },
          bottomLeft: {
            x: element.resizer.topLeft.x - strokeDistX - resizerWidth / 2,
            y: (
              element.resizer.topLeft.y
              + element.dimensions.height
              + strokeDistY
              - resizerHeight / 2
            ) + resizerHeight,
          },
          bottomRight: {
            x: (element.resizer.topLeft.x - strokeDistX - resizerWidth / 2) + resizerWidth,
            y: (
              element.resizer.topLeft.y
              + element.dimensions.height
              + strokeDistY
              - resizerHeight / 2
            ) + resizerHeight,
          },
        },
        width: resizerWidth,
        height: resizerHeight,
        affect: [4, 1],
        type: 'resizer',
        selfId: 7,
      },
      {
        corners: {
          topLeft: {
            x: element.resizer.topLeft.x - strokeDistX - resizerWidth / 2,
            y: element.resizer.topLeft.y + element.dimensions.height / 2 - resizerHeight / 2,
          },
          topRight: {
            x: (element.resizer.topLeft.x - strokeDistX - resizerWidth / 2) + resizerWidth,
            y: element.resizer.topLeft.y + element.dimensions.height / 2 - resizerHeight / 2,
          },
          bottomLeft: {
            x: element.resizer.topLeft.x - strokeDistX - resizerWidth / 2,
            y: (
              element.resizer.topLeft.y + element.dimensions.height / 2 - resizerHeight / 2
            ) + resizerHeight,
          },
          bottomRight: {
            x: (element.resizer.topLeft.x - strokeDistX - resizerWidth / 2) + resizerWidth,
            y: (
              element.resizer.topLeft.y + element.dimensions.height / 2 - resizerHeight / 2
            ) + resizerHeight,
          },
        },
        width: resizerWidth,
        height: resizerHeight,
        affect: [1],
        type: 'resizer',
        selfId: 8,
      },
      {
        corners: {
          topLeft: {
            x: element.resizer.topLeft.x + element.dimensions.width / 2 - resizerWidth / 2,
            y: element.resizer.topLeft.y - rotateDistY - resizerHeight / 2,
          },
          topRight: {
            x: (
              element.resizer.topLeft.x + element.dimensions.width / 2 - resizerWidth / 2
            ) + resizerWidth,
            y: element.resizer.topLeft.y - rotateDistY - resizerHeight / 2,
          },
          bottomLeft: {
            x: element.resizer.topLeft.x + element.dimensions.width / 2 - resizerWidth / 2,
            y: (element.resizer.topLeft.y - rotateDistY - resizerHeight / 2) + resizerHeight,
          },
          bottomRight: {
            x: (
              element.resizer.topLeft.x + element.dimensions.width / 2 - resizerWidth / 2
            ) + resizerWidth,
            y: (element.resizer.topLeft.y - rotateDistY - resizerHeight / 2) + resizerHeight,
          },
        },
        width: resizerWidth,
        height: resizerHeight,
        affect: [5],
        type: 'rotator',
        selfId: 9,
      },
    ];
    const lines = [
      {
        startX: resizers[0].corners.bottomRight.x,
        startY: resizers[0].corners.bottomRight.y - resizerHeight / 2,
        x: resizers[1].corners.topLeft.x,
        y: resizers[1].corners.topLeft.y + resizerHeight / 2,
        type: 'line',
        selfId: 1,
      },
      {
        startX: resizers[1].corners.bottomRight.x,
        startY: resizers[1].corners.bottomRight.y - resizerHeight / 2,
        x: resizers[2].corners.topLeft.x,
        y: resizers[2].corners.topLeft.y + resizerHeight / 2,
        type: 'line',
        selfId: 2,
      },
      {
        startX: resizers[2].corners.bottomRight.x - resizerWidth / 2,
        startY: resizers[2].corners.bottomRight.y,
        x: resizers[3].corners.topLeft.x + resizerWidth / 2,
        y: resizers[3].corners.topLeft.y,
        type: 'line',
        selfId: 3,
      },
      {
        startX: resizers[3].corners.bottomRight.x - resizerWidth / 2,
        startY: resizers[3].corners.bottomRight.y,
        x: resizers[4].corners.topLeft.x + resizerWidth / 2,
        y: resizers[4].corners.topLeft.y,
        type: 'line',
        selfId: 4,
      },
      {
        startX: resizers[4].corners.topLeft.x,
        startY: resizers[4].corners.topLeft.y + resizerHeight / 2,
        x: resizers[5].corners.bottomRight.x,
        y: resizers[5].corners.bottomRight.y - resizerHeight / 2,
        type: 'line',
        selfId: 5,
      },
      {
        startX: resizers[5].corners.topLeft.x,
        startY: resizers[5].corners.topLeft.y + resizerHeight / 2,
        x: resizers[6].corners.bottomRight.x,
        y: resizers[6].corners.bottomRight.y - resizerHeight / 2,
        type: 'line',
        selfId: 6,
      },
      {
        startX: resizers[6].corners.topLeft.x + resizerWidth / 2,
        startY: resizers[6].corners.topLeft.y,
        x: resizers[7].corners.bottomRight.x - resizerWidth / 2,
        y: resizers[7].corners.bottomRight.y,
        type: 'line',
        selfId: 7,
      },
      {
        startX: resizers[7].corners.topLeft.x + resizerWidth / 2,
        startY: resizers[7].corners.topLeft.y,
        x: resizers[0].corners.bottomRight.x - resizerWidth / 2,
        y: resizers[0].corners.bottomRight.y,
        type: 'line',
        selfId: 8,
      },
      {
        startX: resizers[1].corners.topLeft.x + resizerWidth / 2,
        startY: resizers[1].corners.topLeft.y,
        x: resizers[8].corners.bottomRight.x - resizerWidth / 2,
        y: resizers[8].corners.bottomRight.y,
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
    this.resizers.forEach((resizer) => {
      resizer.clickers = {
        topLeft: {
          x: resizer.corners.topLeft.x,
          y: resizer.corners.topLeft.y,
        },
        topRight: {
          x: resizer.corners.topRight.x,
          y: resizer.corners.topRight.y,
        },
        bottomLeft: {
          x: resizer.corners.bottomLeft.x,
          y: resizer.corners.bottomLeft.y,
        },
        bottomRight: {
          x: resizer.corners.bottomRight.x,
          y: resizer.corners.bottomRight.y,
        },
      };
    });
    this.lines = this.resizersArrays.lines;
  }

  updateResizersAfterRotation() {
    const editor = this.element.editor.canvas.upperCanvas;
    editor.ctx.save();
    const rotationAngle = Utilities.degreesToRadians(this.element.transformation.rotationAngle);
    for (let i = 0; i < this.resizers.length; i += 1) {
      const clickers = Object.values(this.resizers[i].clickers);
      const corners = Object.values(this.resizers[i].corners);
      for (let j = 0; j < clickers.length; j += 1) {
        clickers[j].x = (corners[j].x - (this.element.dimensions.startX + ((this.element.dimensions.width) / 2))) * Utilities.cos(-rotationAngle)
          + (corners[j].y - (this.element.dimensions.startY + ((this.element.dimensions.height) / 2))) * Utilities.sin(-rotationAngle);
        clickers[j].x += this.element.dimensions.startX + ((this.element.dimensions.width) / 2);
        clickers[j].y = (corners[j].y - (this.element.dimensions.startY + ((this.element.dimensions.height) / 2))) * Utilities.cos(-rotationAngle)
          - (corners[j].x - (this.element.dimensions.startX + ((this.element.dimensions.width) / 2))) * Utilities.sin(-rotationAngle);
        clickers[j].y += this.element.dimensions.startY + ((this.element.dimensions.height) / 2);
      }

      editor.ctx.beginPath();
      editor.ctx.fillStyle = '#FF0000';
      editor.ctx.moveTo(this.resizers[i].clickers.topLeft.x, this.resizers[i].clickers.topLeft.y);
      editor.ctx.lineTo(this.resizers[i].clickers.topRight.x, this.resizers[i].clickers.topRight.y);
      editor.ctx.lineTo(this.resizers[i].clickers.bottomRight.x, this.resizers[i].clickers.bottomRight.y);
      editor.ctx.lineTo(this.resizers[i].clickers.bottomLeft.x, this.resizers[i].clickers.bottomLeft.y);
      editor.ctx.fill();
      editor.ctx.closePath();

    }
    editor.ctx.restore();
    const corners = Object.values(this.element.resizer);
    for (let i = 0; i < corners.length; i += 1) {
      corners[i].rotatedX = (corners[i].x - (this.element.dimensions.startX + ((this.element.dimensions.width) / 2))) * Utilities.cos(-rotationAngle)
        + (corners[i].y - (this.element.dimensions.startY + ((this.element.dimensions.height) / 2))) * Utilities.sin(-rotationAngle);
      corners[i].rotatedX += this.element.dimensions.startX + ((this.element.dimensions.width) / 2);
      corners[i].rotatedY = (corners[i].y - (this.element.dimensions.startY + ((this.element.dimensions.height) / 2))) * Utilities.cos(-rotationAngle)
        - (corners[i].x - (this.element.dimensions.startX + ((this.element.dimensions.width) / 2))) * Utilities.sin(-rotationAngle);
      corners[i].rotatedY += this.element.dimensions.startY + ((this.element.dimensions.height) / 2);
      console.log(this.element);
    }
    editor.ctx.beginPath();
    editor.ctx.moveTo(corners[0].rotatedX, corners[0].rotatedY);
    editor.ctx.lineTo(corners[1].rotatedX, corners[1].rotatedY);
    editor.ctx.lineTo(corners[3].rotatedX, corners[3].rotatedY);
    editor.ctx.lineTo(corners[2].rotatedX, corners[2].rotatedY);
    editor.ctx.closePath();
    editor.ctx.stroke();
  }

  mouseInResizer(mousePositionX, mousePositionY) {
    let answer = null;
    this.resizers.forEach((resizer) => {
      const clickers = resizer.clickers;
      const minX = Math.min(
        clickers.topLeft.x,
        clickers.topRight.x,
        clickers.bottomLeft.x,
        clickers.bottomRight.x,
      );
      const maxX = Math.max(
        clickers.topLeft.x,
        clickers.topRight.x,
        clickers.bottomLeft.x,
        clickers.bottomRight.x,
      );
      const minY = Math.min(
        clickers.topLeft.y,
        clickers.topRight.y,
        clickers.bottomLeft.y,
        clickers.bottomRight.y,
      );
      const maxY = Math.max(
        clickers.topLeft.y,
        clickers.topRight.y,
        clickers.bottomLeft.y,
        clickers.bottomRight.y,
      );
      if ((minX <= mousePositionX)
        && (maxX >= mousePositionX)
        && (minY <= mousePositionY)
        && (maxY >= mousePositionY)) {
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
