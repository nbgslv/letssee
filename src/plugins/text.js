import { CANVAS_STATE, ELEMENTS } from '../globals';
import Element from '../elements';
import Editor from '../editor';

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
    this.font = element.font;
    this.size = element.size;
    this.inputId = element.inputId;
    this.draw = function (canvas) {
      canvas.ctx.font = `${this.size}px ${this.font}`;
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
    input.element = document.createElement('input');
    input.element.inputId = Math.random();
    input.container.setAttribute('class', 'canvas-text-container');
    input.container.setAttribute('id', input.element.inputId);
    canvas.canvasContainer.appendChild(input.container);
    input.element.setAttribute('class', 'canvas-text-input');
    input.element.setAttribute('id', `${input.element.inputId}`);
    input.element.setAttribute('type', 'text');
    input.element.setAttribute('placeholder', 'Add your text here');
    input.element.style.position = 'absolute';
    input.element.style.left = `${x}px`;
    input.element.style.top = `${y}px`;
    input.font = document.createElement('select');
    input.font.fonts = [
      'Arial',
      'Helvetica',
      'Times New Roman',
      'Courier New',
    ];
    input.font.fonts.forEach((font) => {
      const option = document.createElement('option');
      option.text = font;
      option.value = font;
      input.font.appendChild(option);
    });
    input.font.setAttribute('class', 'canvas-text-font-dropdown');
    input.font.setAttribute('id', input.inputId);
    input.font.addEventListener('change', () => {
      input.font.font = input.font.value;
    });
    input.container.appendChild(input.font);
    input.size = document.createElement('input');
    input.size.setAttribute('class', 'canvas-text-size-input');
    input.size.setAttribute('id', input.inputId);
    input.size.addEventListener('blur', () => {
      input.size.size = input.size.value;
    });
    input.container.appendChild(input.size);
    input.element.addEventListener('blur', () => {
      input.element.style.visibility = 'hidden';
      input.element.text = input.element.value;
      Text.fillText(input, x, y, canvas, tool);
    });
    canvas.canvasContainer.appendChild(input.element);
  }

  static fillText(input, x, y, canvas, tool) {
    const element = {
      x: mouse.x,
      y: mouse.y,
      text: input.element.text,
      font: input.font.font,
      size: input.size.size,
      inputId: input.element.inputId,
    };
    const textElement = new Text(
      tool.name,
      tool.properties,
      tool.events,
      element,
      null,
    );
    ELEMENTS.push(textElement);
    canvas.upperCanvas.ctx.font = `${element.size}px ${element.font}`
    canvas.upperCanvas.ctx.fillText(input.value, x, y);
    Editor.canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
    Editor.canvasUpdate(canvas.canvas, true, canvasClearParam);
  }
}

// TODO activate hold tool after finished adding text(blur)
// TODO make code less complicated
