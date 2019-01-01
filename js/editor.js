import { Elements } from './element';

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

    // canvas event listeners for element select/drag
    canvas.upperCanvas.addEventListener('mousedown', (e) => {
      const mousePosition = Editor.checkMousePosition(e, this.canvas);
      const mouse = {
        positionX: mousePosition.x,
        positionY: mousePosition.y,
      };

      this.elements.forEach((element) => {
        if (element.mouseInShape(mouse.positionX, mouse.positionY)) {
          let selection = this.selection;
          this.dragoffx = mouse.positionX - this.selection.positionX;
          this.dragoffy = mouse.positionY - this.selection.positionY;
          this.dragging = true;
          selection = element;
          this.valid = false;
          this.canvas.ctx.strokeStyle = '#CC0000';
          this.canvas.ctx.lineWidth = 2;
          this.canvas.ctx.strokeRect(selection.x, selection.y, selection.width, selection.height);
          return;
        }
      });
      if (this.selection) {
        this.selection = null;
        this.valid = false;
      }
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
    if (canvas.upperCanvas.offsetParent !== undefined) {
      do {
        offsetX += canvas.upperCanvas.offsetLeft;
        offsetY += canvas.upperCanvas.offsetTop;
      } while ((canvas.upperCanvas = canvas.upperCanvas.offsetParent));
    }
    offsetX += canvas.upperCanvas.stylePaddingLeft + canvas.upperCanvas.styleBorderLeft + canvas.upperCanvas.htmlLeft;
    offsetY += canvas.upperCanvas.stylePaddingTop + canvas.upperCanvas.styleBorderTop + canvas.upperCanvas.htmlTop;
    mousePositionX = e.pageX - offsetX;
    mousePositionY = e.pageY - offsetY;
    return { x: mousePositionX, y: mousePositionY };
  }
}
