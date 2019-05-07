import Events from './events';

export default class Editor {
  constructor(containerID, height, width, options = {}, tools, pluginsMap) {
    this.editorContainerID = containerID;
    this.height = height;
    this.width = width;
    this.position = {
      left: 0,
      top: 0,
    };
    this.options = options;
    this.elements = [];
    this.tools = tools;
    this.activeTool = undefined;
    this.pluginsMap = pluginsMap;
    this.undo = [];
    this.redo = [];
    this.layers = 1;
    this.selection = [];
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

    this.position = canvas.canvas.getBoundingClientRect();

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
    canvas.document = {};
    canvas.document.width = canvas.canvas.width;
    canvas.document.height = canvas.canvas.height;
    canvas.center = {};
    canvas.center.x = canvas.canvas.width / 2;
    canvas.center.y = canvas.canvas.height / 2;
    canvas.viewPort = {};
    canvas.viewPort.bottomRight = {};
    canvas.viewPort.bottomRight.x = canvas.canvas.width;
    canvas.viewPort.bottomRight.y = canvas.canvas.height;

    this.canvas = canvas;
  }

  initToolBars() {
    // TODO change css by tool events
    // build toolbars
    this.activeTool = this.tools[0];
    this.tools.forEach((tool) => {
      const div = document.createElement('div');
      div.style.backgroundImage = `url("${tool.toolInstance.properties.icon}")`;
      div.setAttribute('id', tool.name);
      div.setAttribute('class', 'tool enable unactive');
      div.addEventListener('click', (e) => {
        const lastTool = this.activeTool;
        this.activeTool = tool;
        if (tool.properties.type === 'own-click') {
          tool.ownClickEvent();
        }
      });
      if (tool.properties.toolbar === 'main') {
        this.canvas.mainToolbar.appendChild(div);
      } else if (tool.properties.toolbar === 'second') {
        this.canvas.secondToolbar.appendChild(div);
      }
      tool.editor = this;
    });
    // canvas event listeners for default tool

    const events = new Events(this);
    this.canvas.upperCanvas.addEventListener('mousedown', e => events.mainEventHandler(e));
    this.canvas.upperCanvas.addEventListener('mousemove', e => events.mainEventHandler(e));
    this.canvas.upperCanvas.addEventListener('mouseup', e => events.mainEventHandler(e));

    this.events = events;
  }

  createElement(moduleName, tool) {
    return new this.pluginsMap[moduleName](tool.name, tool.moduleName, tool.properties, tool.events, this);
  }

  set newElement(element) {
    this.elements.push(element);
  }

  get boundingRect() {
    return this.canvas.canvas.getBoundingClientRect();
  }

  get hasSelection() {
    return this.selection.length > 1;
  }

  renderAll() {
    this.clearCanvas(2);
    this.renderCanvas();
  }

  clearCanvas(canvas, {
    x,
    y = 0,
    width = this.width,
    height = this.height,
  } = {
    x: 0,
    y: 0,
    width: this.width,
    height: this.height,
  }) {
    switch (canvas) {
      case 0:
        this.canvas.upperCanvas.ctx.clearRect(x, y, width, height);
        break;
      case 1:
        this.canvas.canvas.ctx.clearRect(x, y, width, height);
        break;
      case 2:
        this.canvas.canvas.ctx.clearRect(x, y, width, height);
        this.canvas.upperCanvas.ctx.clearRect(x, y, width, height);
        break;
      case 3:
        break;
      default:
        console.log('canvas parameter is not set properly. Try 0, 1, 2');
    }
  }

  renderCanvas() {
    // Layers.sortByLayers();
    this.canvas.canvas.ctx.save();
    this.canvas.canvas.ctx.transform(1, 0, 0, 1, 0, 0);
    this.elements.forEach((element) => {
      this.canvas.canvas.ctx.save();
      if (element.transformation.operation.length > 0) {
        element.transformation.operation.forEach((operation) => {
          element[operation.name]();
        });
      }
      element.draw();
      if (element.selected) {
        Editor.updateSelection(element);
      }
      this.canvas.canvas.ctx.restore();
    });
    this.canvas.canvas.ctx.restore();
  }

  static updateSelection(element) {
    element.holder.updateResizersArrays();
    element.holder.draw();
    if (element.transformation.rotationMatrix) {
      element.holder.updateResizersAfterRotation();
    }
  }

  deselectAll() {
    for (let i = 0; i < this.selection.length; i += 1) {
      const selected = this.selection[i];
      selected.holder.deselect();
      i = -1;
    }
  }
}
