import { CANVAS_PROPERTIES, CANVAS_STATE, ELEMENTS, TOOLS } from './globals';
import Tool from './tools';
import Layers from './plugins/layers';

export default class Editor {
  constructor(containerID, height, width, options = {}) {
    this.editorContainerID = containerID;
    this.height = height;
    this.width = width;
    this.options = options;
    this.elements = [];
  }

  initCanvas() {
    /*
    * The canvas is built into the specified container(<div>).
    * Each element is nested inside a <div> container, following the structure:
    *
    * Editor-container(containerID)
    * |------- row container(rowA)
    * |   |--- main tool bar
    * |------- row container(rowB)
    *     |--- canvas container
    *     | |- canvas
    *     |--- second tool bar
    *     TODO update canvas structure
    */

    // Canvas initiation
    const canvas = {};
    canvas.container = document.getElementById(this.editorContainerID);
    canvas.canvas = document.createElement('canvas');

    // rowA and rowB creation
    canvas.rowA = document.createElement('div');
    canvas.rowA.setAttribute('class', 'row');
    canvas.rowA.setAttribute('id', 'rowA');
    canvas.rowB = document.createElement('div');
    canvas.rowB.setAttribute('class', 'row');
    canvas.rowB.setAttribute('id', 'rowB');

    // nesting rowA and rowB inside containerID
    canvas.container.appendChild(canvas.rowA);
    canvas.container.appendChild(canvas.rowB);

    // main tool bar creation
    canvas.mainToolbar = document.createElement('div');
    canvas.mainToolbar.setAttribute('id', 'letse-canvas-maintoolbar-container');
    canvas.mainToolbar.setAttribute('class', 'letse-maintoolbar');
    canvas.mainToolbar.style.width = `${this.width + 50}px`; // TODO check if attribute contains px/is text
    canvas.rowA.appendChild(canvas.mainToolbar);

    // canvas container and canvas creation
    canvas.canvasContainer = document.createElement('div');
    canvas.canvasContainer.setAttribute('id', 'letse-canvas-container');
    canvas.rowB.appendChild(canvas.canvasContainer);
    canvas.canvas.setAttribute('height', this.height);
    canvas.canvas.height = this.height;
    canvas.canvas.setAttribute('width', this.width);
    canvas.canvas.width = this.width;
    canvas.canvas.setAttribute('id', 'letse-canvas');
    canvas.canvas.ctx = canvas.canvas.getContext('2d');
    canvas.canvasContainer.appendChild(canvas.canvas);

    // second tool bar creation
    canvas.secondToolbar = document.createElement('div');
    canvas.secondToolbar.setAttribute('id', 'letse-canvas-secondtoolbar-container');
    canvas.secondToolbar.setAttribute('class', 'letse-secondtoolbar');
    canvas.secondToolbar.style.height = `${this.height}px`;
    canvas.rowB.appendChild(canvas.secondToolbar);

    // upper canvas
    canvas.upperCanvas = document.createElement('canvas');
    canvas.canvasContainer.appendChild(canvas.upperCanvas);
    canvas.upperCanvas.setAttribute('height', this.height);
    canvas.upperCanvas.height = this.height;
    canvas.upperCanvas.setAttribute('width', this.width);
    canvas.upperCanvas.width = this.width;
    canvas.upperCanvas.setAttribute('id', 'letse-upper-canvas');
    canvas.upperCanvas.ctx = canvas.upperCanvas.getContext('2d');

    // Setting up globals
    // TODO put it as part of canvas options deconstruction
    canvas.document.width = canvas.canvas.width;
    canvas.document.height = canvas.canvas.height;
    canvas.center.x = canvas.canvas.width / 2;
    canvas.center.y = canvas.canvas.height / 2;
    canvas.viewPort.bottomRight.x = canvas.canvas.width;
    canvas.viewPort.bottomRight.y = canvas.canvas.height;

    this.canvas = canvas;
  }

  initToolBars() {
    // TODO change css by tool events
    // build toolbars
    TOOLS.forEach((tool) => {
      const div = document.createElement('div');
      div.style.backgroundImage = `url("${tool.properties.icon}")`;
      div.setAttribute('id', tool.name);
      div.setAttribute('class', 'tool enable unactive');
      if (tool.properties.type === 'canvas-tool') {
        div.addEventListener('click', () => { CANVAS_STATE.activeTool = tool; });
      } else if (tool.properties.type === 'own-click') {
        div.addEventListener('click', (e) => { Tool.eventHandler(e, tool, this.canvas); });
      }
      if (tool.properties.toolbar === 'main') {
        this.canvas.mainToolbar.appendChild(div);
      } else if (tool.properties.toolbar === 'second') {
        this.canvas.secondToolbar.appendChild(div);
      }
    });
    // canvas event listeners for default tool
    const toolEventHandler = function (canvas, e) {
      const promise = new Promise((resolve) => {
        Tool.eventHandler(e, CANVAS_STATE.activeTool, canvas);
        resolve(Tool.recordUndo());
      });
    };
    this.canvas.upperCanvas.addEventListener('mousedown', e => toolEventHandler(this.canvas, e));
    this.canvas.upperCanvas.addEventListener('mousemove', e => toolEventHandler(this.canvas, e));
    this.canvas.upperCanvas.addEventListener('mouseup', e => toolEventHandler(this.canvas, e));
  }

  insertElement(...elements) {
    elements.forEach((element) => {
      this.elements.push(element);
    });
  }

  canvasUpdate(draw, {
    x,
    y,
    width,
    height,
  }) {
    this.canvas.upperCanvas.ctx.clearRect(x, y, width, height);
    this.canvas.canvas.ctx.clearRect(x, y, width, height);
    if (draw) {
      Layers.sortByLayers();
      this.elements.forEach((element) => {
        element.draw();
      });
    }
  }
}
