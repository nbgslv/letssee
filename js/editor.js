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
  /*
  this.usage = {

  };
  */
}

const plugins = [
  new Pencil(),
  new Clear(),
];

const Editor = function EditorConstructor(containerID, height, width, options) {
  this.canvas = {};
  this.canvas.initCanvas = ((() => {
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

    // rowA and rowB creation
    const rowA = document.createElement('div');
    rowA.setAttribute('class', 'row');
    rowA.setAttribute('id', 'rowA');
    const rowB = document.createElement('div');
    rowB.setAttribute('class', 'row');
    rowB.setAttribute('id', 'rowB');

    // nesting rowA and rowB inside containerID
    const container = document.getElementById(containerID);
    container.appendChild(rowA);
    container.appendChild(rowB);

    // main tool bar creation
    const mainToolbar = document.createElement('div');
    mainToolbar.setAttribute('id', 'letse-canvas-maintoolbar-container');
    mainToolbar.setAttribute('class', 'letse-maintoolbar');
    mainToolbar.style.width = `${width + 50}px`; // TODO check if attribute contains px/is text
    rowA.appendChild(mainToolbar);

    // canvas container and canvas creation
    const canvasContainer = document.createElement('div');
    canvasContainer.setAttribute('id', 'letse-canvas-container');
    rowB.appendChild(canvasContainer);

    let paint = false;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('id', 'letse-canvas');
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
    // second tool bar creation
    const secondToolbar = document.createElement('div');
    secondToolbar.setAttribute('id', 'letse-canvas-secondtoolbar-container');
    secondToolbar.setAttribute('class', 'letse-secondtoolbar');
    secondToolbar.style.height = `${height}px`;
    rowB.appendChild(secondToolbar);

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
  })());
};




const editor = new Editor('letse-canvas-container', 300, 300);
