import { CANVAS_STATE, ELEMENTS } from './globals';
import Element from './elements';
import Editor from './editor';

const mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  width: 0,
  height: 0,
};

const canvasClearParam = {
  x: CANVAS_STATE.canvas.viewPort.topLeft.x,
  y: CANVAS_STATE.canvas.viewPort.topLeft.y,
  width: CANVAS_STATE.canvas.width,
  height: CANVAS_STATE.canvas.height,
};

export default class Text extends Element {
  constructor(name, properties, events, element, style) {
    super(name, properties, events, element, style);
    this.text = element.text;
    this.inputId = element.inputId;
    this.draw = function (canvas) {
      canvas.ctx.fillText(this.text, this.x, this.y);
    };
  }

  static mouseDown(e, canvas, tool) {
    this.started = true;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    Text.addInput(mouse.x, mouse.y, canvas, tool);
  }

  static addInput(x, y, canvas, tool) {
    const input = document.createElement('input');
    const inputId = Math.random();
    input.setAttribute('class', 'canvas-text-input');
    input.setAttribute('id', `${inputId}`);
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Add your text here');
    input.style.position = 'absolute';
    input.style.left = `${x}px`;
    input.style.top = `${y}px`;
    input.addEventListener('focus', () => {
      this.edit = true;
    });
    input.addEventListener('blur', () => {
      input.style.visibility = 'hidden';

      const element = {
        x: mouse.x,
        y: mouse.y,
        text: input.value,
        inputId,
      };
      const text = new Text(
        tool.name,
        tool.properties,
        tool.events,
        element,
        null,
      );
      ELEMENTS.push(text);
      canvas.upperCanvas.ctx.fillText(input.value, x, y);
      Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
      Editor.canvasUpdate(canvas.canvas, true, canvasClearParam);
    });
    canvas.canvasContainer.appendChild(input);
  }
}

// TODO activate hold tool after finished adding text(blur)
