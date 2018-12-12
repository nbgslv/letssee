'use strict';

let Editor = {};
Editor.canvas = {};

Editor.canvas.initCanvas = function (containerID, height, width) {
    let _containerID = containerID;
    let _height = height || 300;
    let _width = width || 300;

    /*
    * The canvas element is nested inside the canvas container <div> which id is set by the user.
    * The canvas container <div> is nested inside the main container <div>
     */

    let _canvasContainer = document.getElementById(_containerID);
    let _canvas = document.createElement('canvas');
    let _container = document.createElement('div');

    _canvas.setAttribute('height', _height);
    _canvas.setAttribute('width', _width);
    _canvas.setAttribute('id', 'letse-canvas');
    _canvas.style.border = '1px solid #000'; //TODO add to css
    _canvasContainer.appendChild(_canvas);

    _container.setAttribute('id', 'letse-editor');
    _container.style.height = '${_height}px'; //TODO add to css
    _container.style.width = '${_width}px'; //TODO add to css

    _canvasContainer.parentNode.insertBefore(_container, _canvasContainer);
    _container.appendChild(_canvasContainer);
};

Editor.canvas.eventHandler = function (event, eventFunction){

};

let editor = Editor.canvas.initCanvas('letse-canvas-container');

