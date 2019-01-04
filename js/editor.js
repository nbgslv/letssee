import { Elements } from './element';
import { tools } from './tools';

export default class Editor {
  constructor(containerID, height, width, options = {}, plugins = []) {
    this.editorContainerID = containerID;
    this.height = height;
    this.width = width;
    this.options = options;
    this.plugins = plugins;
    this.activeTool = undefined;

    this.valid = false;
    this.elements = Elements;
    this.dragging = false;
    this.selection = null;
    this.dragoffx = 0;
    this.dragoffy = 0;

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
    canvas.canvas.setAttribute('width', this.width);
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
    canvas.upperCanvas.setAttribute('width', this.width);
    canvas.upperCanvas.setAttribute('id', 'letse-upper-canvas');
    canvas.upperCanvas.ctx = canvas.upperCanvas.getContext('2d');

    // build toolbars
    tools.forEach((tool) => {
      const div = document.createElement('div');
      div.style.backgroundImage = `url("${tool.tool.properties.icon}")`;
      div.setAttribute('id', tool.name);
      div.setAttribute('class', 'tool enable unactive');
      div.addEventListener('click', () => Editor.toolHandler(tool));
      if (tool.tool.properties.toolbar === 'main') {
        canvas.mainToolbar.appendChild(div);
      } else if (tool.tool.properties.toolbar === 'second') {
        canvas.secondToolbar.appendChild(div);
      }
    });

    // init default hold tool

    // canvas event listeners for element select/drag
    canvas.upperCanvas.addEventListener('mousedown', (e) => {
      const mousePosition = Editor.checkMousePosition(e, this.canvas);
      const mouse = {
        positionX: mousePosition.x,
        positionY: mousePosition.y,
      };

      this.elements.forEach((element) => {
        if (element.mouseInShape(mouse.positionX, mouse.positionY)) {
          // let selection = this.selection;
          this.dragoffx = mouse.positionX - element.x;
          this.dragoffy = mouse.positionY - element.y;
          this.dragging = true;
          this.selection = element;
          let selection = this.selection;
          this.valid = false;
          this.canvas.upperCanvas.ctx.strokeStyle = '#CC0000';
          this.canvas.upperCanvas.ctx.lineWidth = 2;
          this.canvas.upperCanvas.ctx.strokeRect(selection.x,
            selection.y,
            selection.width,
            selection.height);
        }
      });
    });
    canvas.upperCanvas.addEventListener('mousemove', (e) => {
      if (this.dragging) {
        const mousePosition = Editor.checkMousePosition(e, this.canvas);
        this.selection.x = mousePosition.x - this.dragoffx;
        this.selection.y = mousePosition.y - this.dragoffy;
        this.valid = false;
      }
    });
    canvas.upperCanvas.addEventListener('mouseup', (e) => {
      this.dragging = false;
    });
    this.canvas = canvas;
  }

  static checkMousePosition(e, canvas) {
    let offsetX = 0;
    let offsetY = 0;
    let mousePositionX;
    let mousePositionY;
    const html = document.body.parentNode;
    let upperCanvas = canvas.upperCanvas;
    if (upperCanvas.offsetParent !== undefined) {
      do {
        offsetX += upperCanvas.offsetLeft;
        offsetY += upperCanvas.offsetTop;
      } while ((upperCanvas = upperCanvas.offsetParent));
    }
    upperCanvas = canvas.upperCanvas;
    const stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(upperCanvas)
      .paddingLeft, 10) || 0;
    const stylePaddingTop = parseInt(document.defaultView.getComputedStyle(upperCanvas)
      .paddingTop, 10) || 0;
    const styleBorderLeft = parseInt(document.defaultView.getComputedStyle(upperCanvas)
      .borderLeftWidth, 10) || 0;
    const styleBorderTop = parseInt(document.defaultView.getComputedStyle(upperCanvas)
      .borderTopWidth, 10) || 0;

    offsetX += stylePaddingLeft
  + styleBorderLeft
  + html.offsetLeft;
    offsetY += stylePaddingTop
  + styleBorderTop
  + html.offsetTop;
    mousePositionX = e.pageX - offsetX;
    mousePositionY = e.pageY - offsetY;
    return { x: mousePositionX, y: mousePositionY };
  }

  static toolHandler(tool, canvas) {
    tool.tool.properties.active = true;
    canvas.upperCanvas.addEventListener(tool.tool.properties.events.start, (e) => {
      tool.tool.mouseDown(e);
    });
    canvas.upperCanvas.addEventListener(tool.tool.properties.events.control, (e) => {
      tool.tool.mouseMove(e, canvas);
    });
    canvas.upperCanvas.addEventListener(tool.tool.properties.events.end, (e) => {
      tool.tool.mouseUp(e, canvas);
    });
    this.activeToolName(tool.tool.name);
  }
}
