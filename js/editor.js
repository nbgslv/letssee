'use strict';

let Editor = {};
Editor.canvas = {};


Editor.canvas.initCanvas = function (containerID, height, width, plugins, options) {
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
    let divRow = document.createElement('div');
    divRow.setAttribute('class', 'row');

    _canvas.setAttribute('height', _height);
    _canvas.setAttribute('width', _width);
    _canvas.setAttribute('id', 'letse-canvas');
    _canvas.style.border = '1px solid #000'; //TODO add to css
    let row = _canvasContainer.appendChild(divRow);
    row.appendChild(_canvas);

    _container.setAttribute('id', 'letse-editor');
    _container.style.height = '${_height}px'; //TODO add to css
    _container.style.width = '${_width}px'; //TODO add to css

    _canvasContainer.parentNode.insertBefore(_container, _canvasContainer);
    _container.appendChild(_canvasContainer);

    let plugins = {};
    let options = {};
    //Editor.canvas.initToolbars(_container, _containerID, options, _width, _height);
};

Editor.canvas.initToolbars = function(container, containerID, plugins, options, width, height){

    let _width = width;
    let _height = height;
    let _containerID = containerID;

    //Main toolbart
    let row = container.appendChild(divRow);
    let _mainToolbar = document.createElement('div');
    _mainToolbar.setAttribute('id', 'letse-canvas-maintoolbar-container');
    _mainToolbar.style.width = _width;
    _mainToolbar.style.height = '50px'; //TODO select height from options
    _mainToolbar.style.border = '1px solid rgb(0, 0, 0)'; //TODO select style from options
    row.appendChild(_mainToolbar);

    //Second toolbar
    let _secondToolbar = document.createElement('div');
    let _canvas = document.getElementById(_containerID);
    _secondToolbar.setAttribute('id', 'letse-canvas-secondtoolbar-container');
    _secondToolbar.style.height = _height;
    _secondToolbar.style.width = '50px'; //TODO select height from options
    _secondToolbar.style.border = '1px solid rgb(0, 0, 0)'; //TODO select style from options
    _canvas.parentNode.insertBefore(_secondToolbar, _canvas);

    // Editor.plugins.insertToToolbars(plugins, _mainToolbar, _secondToolbar);
};
/*
Editor.plugins.insertToToolbars = function(plugins, mainToolbar, secondToolbar){
    for (let i=0; i < plugins.length; i++){
        let _pluginDiv = document.createElement('div');
        Editor.plugins.plugin = Editor.plugins.getPlugin(plugin[i]);
        if (Editor.plugins.plugin[i].toolbar === 'main') {
            mainToolbar.appendChild(_pluginDiv);
        } else {
            secondToolbar.appendChild(_pluginDiv);
        }

    }
};
*/
let editor = Editor.canvas.initCanvas('letse-canvas-container');

