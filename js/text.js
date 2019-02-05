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
    const input = {};
    input.container = document.createElement('div');
    input.element.inputId = Math.random();
    input.container.setAttribute('class', 'canvas-text-input-container');
    input.container.setAttribute('id', input.element.inputId);
    canvas.canvasContainer.appendChild(input.container);
    input.element = document.createElement('input');
    input.element.setAttribute('class', 'canvas-text-input');
    input.element.setAttribute('id', `${input.element.inputId}`);
    input.element.setAttribute('type', 'text');
    input.element.setAttribute('placeholder', 'Add your text here');
    input.element.style.position = 'absolute';
    input.element.style.left = `${x}px`;
    input.element.style.top = `${y}px`;
    input.element.addEventListener('focus', () => {
      this.edit = true;
    });
    input.element.addEventListener('blur', () => {
      input.style.visibility = 'hidden';

      const element = {
        x: mouse.x,
        y: mouse.y,
        text: input.value,
        inputId: input.element.inputId,
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
