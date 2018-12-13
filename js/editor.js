'use strict';

let Editor = {};
Editor.canvas = {};


Editor.canvas.initCanvas = function (containerID, height, width, plugins, options) {
    let _containerID = containerID;
    let _height = height || 300;
    let _width = width || 300;

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
    let _rowA = document.createElement('div');
    _rowA.setAttribute('class', 'row');
    _rowA.setAttribute('id', 'rowA')
    let _rowB = document.createElement('div');
    _rowB.setAttribute('class', 'row');
    _rowB.setAttribute('id', 'rowB');
    _rowB.style.position = 'absolute';

    // nesting rowA and rowB inside containerID
    let _container = document.getElementById(_containerID);
    _container.appendChild(_rowA);
    _container.appendChild(_rowB);

    // main tool bar creation
    let _mainToolbar = document.createElement('div');
    _mainToolbar.setAttribute('id', 'letse-canvas-maintoolbar-container');
    _mainToolbar.style.width = _width + 'px';//TODO check if attribute contains px/is textעןא
    _mainToolbar.style.height = '50px'; //TODO select height from options
    _mainToolbar.style.border = '1px solid rgb(0, 0, 0)'; //TODO select style from options
    _rowA.appendChild(_mainToolbar);

    // canvas container and canvas creation
    let _canvasContainer = document.createElement('div');
    _canvasContainer.setAttribute('id', 'letse-canvas-container');
    _canvasContainer.style.cssFloat = 'left';
    _rowB.appendChild(_canvasContainer);

    let _canvas = document.createElement('canvas');
    _canvas.setAttribute('height', _height);
    _canvas.setAttribute('width', _width);
    _canvas.setAttribute('id', 'letse-canvas');
    _canvas.style.border = '1px solid #000'; //TODO add to css
    _canvasContainer.appendChild(_canvas);

    // second tool bar creation
    let _secondToolbar = document.createElement('div');
    _secondToolbar.setAttribute('id', 'letse-canvas-secondtoolbar-container');
    _secondToolbar.style.height = _height + 'px';
    _secondToolbar.style.width = '50px'; //TODO select height from options
    _secondToolbar.style.border = '1px solid rgb(0, 0, 0)'; //TODO select style from options
    _secondToolbar.style.cssFloat = 'right';
    _rowB.appendChild(_secondToolbar);
};


let editor = Editor.canvas.initCanvas('letse-canvas-container', 300, 300);

