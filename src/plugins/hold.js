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
    this.element = null;
    this.dragging = false;
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
      const stroke = new Hold(
        this.name,
        this.properties,
        this.events,
        this.editor,
        {
          x: select.x - 2.5,
          y: select.y - 2.5,
          width: select.width,
          height: select.height,
        },
        null,
      );
      stroke.draw();
    });
  }

  draw() {
    this.editor.canvas.upperCanvas.ctx.beginPath();
    this.editor.canvas.upperCanvas.ctx.fillRect(this.x, this.y, this.width, this.height);
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

  static mouseDown(e) {
    const mouse = {
      positionX: e.clientX,
      positionY: e.clientY,
    };
    for (let i = 0; i < this.editor.elements.length; i += 1) {
      const element = this.editor.elements[i];
      if (element.mouseInElement(mouse.positionX, mouse.positionY)) {
        if (element.name === 'hold') {
          element.resize(element, mouse, e);
        } else {
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
    }
  }

  static mouseMove(e) {
    const mouse = {
      positionX: e.clientX,
      positionY: e.clientY,
    };
    for (let i = 0; i < this.editor.elements.length; i += 1) {
      const element = this.editor.elements[i];
      if (element.mouseInElement(mouse.positionX, mouse.positionY)) {
        if (element.name === 'hold') {
          element.resize(element, mouse, e);
        } else {
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
    }
  }
}
