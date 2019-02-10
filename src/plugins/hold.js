import Editor from '../editor';
import { CANVAS_STATE, ELEMENTS } from '../globals';
import Utilities from '../utilities';

let selection;

export default class Hold extends Element {
  constructor(name, properties, events, editor, element, style) {
    super(name, properties, events, editor, element, style);
    this.x = element.x;
    this.y = element.y;
    this.width = element.width;
    this.height = element.height;
    this.resizerWidth = 5;
    this.resizerHeight = 5;
    this.resizers = [];
    this.selection = element.selection;
  }

  drawResizers() {
    this.selection.forEach((select) => {
      const resizer = [];
      resizer.a = {
        x: select.x - 2.5,
        y: select.y - 2.5,
      };
      resizer.b = {
        x: select.x + select.width / 2 - 2.5,
        y: select.y,
      };
      resizer.c = {
        x: select.x + select.width - 2.5,
        y: select.y + select.height - 2.5,
      };
      resizer.d = {
        x: select.x + select.width,
        y: select.y + select.height / 2 - 2.5,
      };
      resizer.e = {
        x: select.x + select.width,
        y: select.y + select.height - 2.5,
      };
      resizer.f = {
        x: select.x + select.width / 2 - 2.5,
        y: select.y + select.height,
      };
      resizer.g = {
        x: select.x,
        y: select.y + select.height - 2.5,
      };
      resizer.h = {
        x: select.x,
        y: select.y + select.height / 2 - 2.5,
      };
      resizer.forEach((resize) => {
        const dimensions = {
          x: resize.x,
          y: resize.y,
          width: this.resizerWidth,
          height: this.resizerHeight,
        };
        const box = new Hold(
          this.name,
          this.properties,
          this.events,
          this.editor,
          dimensions,
          null,
        );
        box.draw();
        this.resizers.push(box);
        this.editor.elements.push(box);
      });
    });
  }

  draw() {
    this.editor.canvas.upperCanvas.ctx.beginPath();
    this.editor.canvas.upperCanvas.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  static mouseDown(e) {
    const mouse = {
      positionX: e.clientX,
      positionY: e.clientY,
    };
    this.editor.elements.forEach((element) => {
      if (element.mouseInShape(mouse.positionX, mouse.positionY)) {
        if (element.name === 'hold') {
          this.resize(element);
        } else {
          this.dragoffx = mouse.positionX - element.x;
          this.dragoffy = mouse.positionY - element.y;
          const holder = new Hold(
            this.name,
            this.properties,
            this.events,
            this.editor,
            element,
            null,
          );
          this.selection.push(element);
          holder.drawResizers();
        }
      }
    });
  }

  static mouseMove(e, canvas) {
    if (this.dragging) {
      const mousePosition = Utilities.checkMousePosition(e, canvas);
      selection.x = mousePosition.x - this.dragoffx;
      selection.y = mousePosition.y - this.dragoffy;
      Hold.draw(canvas);
    }
  }

  static mouseUp(e, canvas) {
    CANVAS_STATE.dragging = false;
  }

  static draw(canvas) {
    canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);
    ELEMENTS.forEach((element) => {
      if (!(element.x > canvas.upperCanvas.width || element.y > canvas.upperCanvas.height
        || element.x + element.width < 0 || element.y + element.height < 0)) {
        canvas.upperCanvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
      }
      if (selection !== null) {
        canvas.upperCanvas.ctx.strokeRect(
          selection.x,
          selection.y,
          selection.width,
          selection.height,
        );
      }
      Editor.canvasUpdate(canvas);
    });
  }
}
