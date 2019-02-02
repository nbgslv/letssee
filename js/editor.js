import { Elements } from './element';
import { CANVAS_PROPERTIES, CANVAS_STATE } from './globals';
import { Tool, Tools } from './tools';

export default class Editor {
  constructor(containerID, height, width, options = {}) {
    this.editorContainerID = containerID;
    this.height = height;
    this.width = width;
    this.options = options;

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
    canvas.upperCanvas.height = height;
    canvas.upperCanvas.setAttribute('width', this.width);
    canvas.upperCanvas.width = width;
    canvas.upperCanvas.setAttribute('id', 'letse-upper-canvas');
    canvas.upperCanvas.ctx = canvas.upperCanvas.getContext('2d');

    // TODO put it as part of canvas options deconstruction
    CANVAS_PROPERTIES.document.width = canvas.canvas.width;
    CANVAS_PROPERTIES.document.height = canvas.canvas.height;
    CANVAS_STATE.canvas.width = canvas.canvas.width;
    CANVAS_STATE.canvas.height = canvas.canvas.height;
    CANVAS_STATE.canvas.center.x = canvas.canvas.width / 2;
    CANVAS_STATE.canvas.center.y = canvas.canvas.height / 2;

    CANVAS_STATE.canvas.viewPort.bottomRight.x = canvas.canvas.width;
    CANVAS_STATE.canvas.viewPort.bottomRight.y = canvas.canvas.height;

    // init default hold tool
    const defaultTool = {
      category: 'tool',
      name: 'hold',
      properties: {
        enable: true,
        type: 'canvas-tool',
        toolbar: 'main',
        icon: '/assets/images/hand.png',
        cursor: 'grab',
        active: false,
      },
      events: {
        mouseDown: 'mousedown',
        mouseMove: 'mousemove',
        mouseUp: 'mouseup',
      },
    };

    const defaultToolInstance = new Tool(defaultTool.name, defaultTool.properties, defaultTool.events);
    Tools.push(defaultTool);
    CANVAS_STATE.activeTool = defaultTool;

    // built-in tools
    // Undo
    const undoTool = {
      category: 'tool',
      name: 'undoredo',
      properties: {
        enable: true,
        type: 'own-click',
        toolbar: 'second',
        icon: '/assets/images/reply.png',
        cursor: 'default',
        active: false,
      },
      events: {
        canvasUndo: 'click',
      },
    };

    const undoToolInstance = new Tool(undoTool);
    Tools.push(undoTool);

    // Redo
    const redoTool = {
      category: 'tool',
      name: 'undoredo',
      properties: {
        enable: true,
        type: 'own-click',
        toolbar: 'second',
        icon: '/assets/images/redo.png',
        cursor: 'default',
        active: false,
      },
      events: {
        canvasRedo: 'click',
      },
    };
    const redoToolInstance = new Tool(redoTool);
    Tools.push(redoTool);

    // Zoom in
    const zoominTool = {
      category: 'tool',
      name: 'zoominout',
      properties: {
        enable: true,
        type: 'own-click',
        toolbar: 'second',
        icon: '/assets/images/zoom.png',
        cursor: 'default',
        active: false,
      },
      events: {
        canvasZoomIn: 'click',
      },
    };
    const zoominToolInstance = new Tool(zoominTool);
    Tools.push(zoominTool);

    // Zoom out
    const zoomoutTool = {
      category: 'tool',
      name: 'zoominout',
      properties: {
        enable: true,
        type: 'own-click',
        toolbar: 'second',
        icon: '/assets/images/zoom-out.png',
        cursor: 'default',
        active: false,
      },
      events: {
        canvasZoomOut: 'click',
      },
    };
    const zoomoutToolInstance = new Tool(zoomoutTool);
    Tools.push(zoomoutTool);

    // Drag Canvas
    const dragTool = {
      category: 'tool',
      name: 'viewport',
      properties: {
        enable: true,
        type: 'canvas-tool',
        toolbar: 'second',
        icon: '/assets/images/drag.png',
        cursor: 'all-scroll',
        active: false,
      },
      events: {
        mouseDown: 'mousedown',
        drag: 'mousemove',
        mouseUp: 'mouseup',
      },
    };
    const dragToolInstance = new Tool(dragTool);
    Tools.push(dragTool);

    // Shapes Tools
    // Line Tool
    const lineTool = {
      category: 'tool',
      name: 'line',
      properties: {
        enable: true,
        type: 'canvas-tool',
        toolbar: 'main',
        icon: '/assets/images/line.png',
        cursor: 'crosshair',
        active: false,
      },
      events: {
        mouseDown: 'mousedown',
        mouseMove: 'mousemove',
        mouseUp: 'mouseup',
      },
    };
    const lineToolInstance = new Tool(lineTool);
    Tools.push(lineTool);


    // TODO change css by tool events
    // build toolbars
    Tools.forEach((tool) => {
      const div = document.createElement('div');
      div.style.backgroundImage = `url("${tool.properties.icon}")`;
      div.setAttribute('id', tool.name);
      div.setAttribute('class', 'tool enable unactive');
      if (tool.properties.type === 'canvas-tool') {
        div.addEventListener('click', () => { CANVAS_STATE.activeTool = tool; });
      } else if (tool.properties.type === 'own-click') {
        div.addEventListener('click', (e) => { Tool.eventHandler(e, tool, canvas); });
      }
      if (tool.properties.toolbar === 'main') {
        canvas.mainToolbar.appendChild(div);
      } else if (tool.properties.toolbar === 'second') {
        canvas.secondToolbar.appendChild(div);
      }
    });
    // canvas event listeners for default tool
    const toolEventHandler = (function (e) {
      const promise = new Promise((resolve) => {
        Tool.eventHandler(e, CANVAS_STATE.activeTool, canvas);
        resolve(Tool.recordUndo());
      });
    });
    canvas.upperCanvas.addEventListener('mousedown', e => toolEventHandler(e));
    canvas.upperCanvas.addEventListener('mousemove', e => toolEventHandler(e));
    canvas.upperCanvas.addEventListener('mouseup', e => toolEventHandler(e));

    this.canvas = canvas;
  }

  static canvasUpdate(canvas, draw, {
    x,
    y,
    width,
    height,
  }) {
    canvas.ctx.clearRect(x, y, width, height);
    if (draw) {
      Elements.forEach((element) => {
        canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
      });
    }

  }
}
