/*
let clickX = [];
let clickY = [];
let clickDrag = [];

function Pencil() {
  this.options = {
    name: 'pencil',
    enable: true,
    event: 'click',
    icon: 'assets/images/pencil-icon.png',
  };
  this.usage = function (e) {
    const canvas = document.getElementById('letse-canvas');
    const ctx = canvas.getContext('2d');
    ctx.rect(20, 10, 10, 10);
    ctx.stroke();
  };
}

function Clear() {
  this.options = {
    name: 'clear',
    enable: true,
    event: 'click',
    icon: 'assets/images/sweep.png',
  };

  this.usage = {

  };

}

let plugins = [
  new Pencil(),
  new Clear(),
];
*/

const Editor = function (containerID, height, width, options = {}, plugins = []) {
  this.editorContainerID = containerID;
  this.height = height;
  this.width = width;
  this.options = options;
  this.plugins = plugins;

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
  */

  // Canvas initiation
  this.canvas = {};
  this.canvas.container = document.getElementById(containerID);
  this.canvas.canvas = document.createElement('canvas');

  // rowA and rowB creation
  this.canvas.rowA = document.createElement('div');
  this.canvas.rowA.setAttribute('class', 'row');
  this.canvas.rowA.setAttribute('id', 'rowA');
  this.canvas.rowB = document.createElement('div');
  this.canvas.rowB.setAttribute('class', 'row');
  this.canvas.rowB.setAttribute('id', 'rowB');

  // nesting rowA and rowB inside containerID
  this.canvas.container.appendChild(this.canvas.rowA);
  this.canvas.container.appendChild(this.canvas.rowB);

  // main tool bar creation
  this.canvas.mainToolbar = document.createElement('div');
  this.canvas.mainToolbar.setAttribute('id', 'letse-canvas-maintoolbar-container');
  this.canvas.mainToolbar.setAttribute('class', 'letse-maintoolbar');
  this.canvas.mainToolbar.style.width = `${width + 50}px`; // TODO check if attribute contains px/is text
  this.canvas.rowA.appendChild(this.canvas.mainToolbar);

  // canvas container and canvas creation
  this.canvas.canvasContainer = document.createElement('div');
  this.canvas.canvasContainer.setAttribute('id', 'letse-canvas-container');
  this.canvas.rowB.appendChild(this.canvas.canvasContainer);
  this.canvas.canvas.setAttribute('height', height);
  this.canvas.canvas.setAttribute('width', width);
  this.canvas.canvas.setAttribute('id', 'letse-canvas');
  this.canvas.canvasContainer.appendChild(this.canvas.canvas);

  // second tool bar creation
  this.canvas.secondToolbar = document.createElement('div');
  this.canvas.secondToolbar.setAttribute('id', 'letse-canvas-secondtoolbar-container');
  this.canvas.secondToolbar.setAttribute('class', 'letse-secondtoolbar');
  this.canvas.secondToolbar.style.height = `${height}px`;
  this.canvas.rowB.appendChild(this.canvas.secondToolbar);
};

/*
let paint = false;

function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw() {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.strokeStyle = '#000';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 5;
  for (let i = 0; i < clickX.length; i++) {
    ctx.beginPath();
    if (clickDrag[i] && i) {
      ctx.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      ctx.moveTo(clickX[i] - 1, clickY[i] - 1);
    }
    ctx.lineTo(clickX[i], clickY[i]);
    ctx.closePath();
    ctx.stroke();
  }
}
canvas.addEventListener('mousedown', function (e) {
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});
canvas.addEventListener('mousemove', function (e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
  }
});
canvas.addEventListener('mouseup', () => {
  paint = false;
});
canvas.addEventListener('mouseleave', () => {
  paint = false;
});
canvasContainer.appendChild(canvas);


// set plugins to tool bars
for (let i = 0; i < plugins.length; i++) {
  const div = document.createElement('div');
  div.setAttribute('id', plugins[i].options.name);
  div.setAttribute('class', 'tool-second');
  div.style.backgroundImage = `url("${plugins[i].options.icon}")`;
  const usage = plugins[i].usage;
  div.addEventListener(plugins[i].options.event, usage);
  secondToolbar.appendChild(div);
}
*/

const editor = new Editor('letse-canvas-container', 300, 300);
