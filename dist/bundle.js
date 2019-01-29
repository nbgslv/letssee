/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js lazy recursive ^\\.\\/.*$":
/*!*******************************************!*\
  !*** ./js lazy ^\.\/.*$ namespace object ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./editor": [
		"./js/editor.js"
	],
	"./editor.js": [
		"./js/editor.js"
	],
	"./element": [
		"./js/element.js"
	],
	"./element.js": [
		"./js/element.js"
	],
	"./globals": [
		"./js/globals.js"
	],
	"./globals.js": [
		"./js/globals.js"
	],
	"./hold": [
		"./js/hold.js",
		0
	],
	"./hold.js": [
		"./js/hold.js",
		0
	],
	"./layers": [
		"./js/layers.js",
		1
	],
	"./layers.js": [
		"./js/layers.js",
		1
	],
	"./letse.config": [
		"./js/letse.config.js"
	],
	"./letse.config.js": [
		"./js/letse.config.js"
	],
	"./main": [
		"./js/main.js"
	],
	"./main.js": [
		"./js/main.js"
	],
	"./rectangle": [
		"./js/rectangle.js",
		2
	],
	"./rectangle.js": [
		"./js/rectangle.js",
		2
	],
	"./settings": [
		"./js/settings.js"
	],
	"./settings.js": [
		"./js/settings.js"
	],
	"./tools": [
		"./js/tools.js"
	],
	"./tools.js": [
		"./js/tools.js"
	],
	"./undoredo": [
		"./js/undoredo.js",
		3
	],
	"./undoredo.js": [
		"./js/undoredo.js",
		3
	],
	"./utilities": [
		"./js/utilities.js",
		4
	],
	"./utilities.js": [
		"./js/utilities.js",
		4
	],
	"./viewport": [
		"./js/viewport.js",
		5
	],
	"./viewport.js": [
		"./js/viewport.js",
		5
	],
	"./zoominout": [
		"./js/zoominout.js",
		7
	],
	"./zoominout.backup": [
		"./js/zoominout.backup.js",
		6
	],
	"./zoominout.backup.js": [
		"./js/zoominout.backup.js",
		6
	],
	"./zoominout.js": [
		"./js/zoominout.js",
		7
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./js lazy recursive ^\\.\\/.*$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./js/editor.js":
/*!**********************!*\
  !*** ./js/editor.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Editor; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./js/element.js");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals */ "./js/globals.js");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools */ "./js/tools.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Editor =
/*#__PURE__*/
function () {
  function Editor(containerID, height, width) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Editor);

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

    var canvas = {};
    canvas.container = document.getElementById(this.editorContainerID);
    canvas.canvas = document.createElement('canvas'); // rowA and rowB creation

    canvas.rowA = document.createElement('div');
    canvas.rowA.setAttribute('class', 'row');
    canvas.rowA.setAttribute('id', 'rowA');
    canvas.rowB = document.createElement('div');
    canvas.rowB.setAttribute('class', 'row');
    canvas.rowB.setAttribute('id', 'rowB'); // nesting rowA and rowB inside containerID

    canvas.container.appendChild(canvas.rowA);
    canvas.container.appendChild(canvas.rowB); // main tool bar creation

    canvas.mainToolbar = document.createElement('div');
    canvas.mainToolbar.setAttribute('id', 'letse-canvas-maintoolbar-container');
    canvas.mainToolbar.setAttribute('class', 'letse-maintoolbar');
    canvas.mainToolbar.style.width = "".concat(this.width + 50, "px"); // TODO check if attribute contains px/is text

    canvas.rowA.appendChild(canvas.mainToolbar); // canvas container and canvas creation

    canvas.canvasContainer = document.createElement('div');
    canvas.canvasContainer.setAttribute('id', 'letse-canvas-container');
    canvas.rowB.appendChild(canvas.canvasContainer);
    canvas.canvas.setAttribute('height', this.height);
    canvas.canvas.height = this.height;
    canvas.canvas.setAttribute('width', this.width);
    canvas.canvas.width = this.width;
    canvas.canvas.setAttribute('id', 'letse-canvas');
    canvas.canvas.ctx = canvas.canvas.getContext('2d');
    canvas.canvasContainer.appendChild(canvas.canvas); // second tool bar creation

    canvas.secondToolbar = document.createElement('div');
    canvas.secondToolbar.setAttribute('id', 'letse-canvas-secondtoolbar-container');
    canvas.secondToolbar.setAttribute('class', 'letse-secondtoolbar');
    canvas.secondToolbar.style.height = "".concat(this.height, "px");
    canvas.rowB.appendChild(canvas.secondToolbar); // upper canvas

    canvas.upperCanvas = document.createElement('canvas');
    canvas.canvasContainer.appendChild(canvas.upperCanvas);
    canvas.upperCanvas.setAttribute('height', this.height);
    canvas.upperCanvas.height = height;
    canvas.upperCanvas.setAttribute('width', this.width);
    canvas.upperCanvas.width = width;
    canvas.upperCanvas.setAttribute('id', 'letse-upper-canvas');
    canvas.upperCanvas.ctx = canvas.upperCanvas.getContext('2d'); // TODO put it as part of canvas options deconstruction

    _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_PROPERTIES"].document.width = canvas.canvas.width;
    _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_PROPERTIES"].document.height = canvas.canvas.height;
    _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.width = canvas.canvas.width;
    _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.height = canvas.canvas.height;
    _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.center.x = canvas.canvas.width / 2;
    _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.center.y = canvas.canvas.height / 2;
    _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.bottomRight.x = canvas.canvas.width;
    _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.bottomRight.y = canvas.canvas.height; // init default hold tool

    var defaultTool = {
      category: 'tool',
      name: 'hold',
      properties: {
        enable: true,
        type: 'canvas-tool',
        toolbar: 'main',
        icon: '/assets/images/hand.png',
        cursor: 'grab',
        active: false
      },
      events: {
        mouseDown: 'mousedown',
        mouseMove: 'mousemove',
        mouseUp: 'mouseup'
      }
    };
    var defaultToolInstance = new _tools__WEBPACK_IMPORTED_MODULE_2__["Tool"](defaultTool);
    _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].push(defaultTool);
    _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].activeTool = defaultTool; // built-in tools
    // Undo

    var undoTool = {
      category: 'tool',
      name: 'undoredo',
      properties: {
        enable: true,
        type: 'own-click',
        toolbar: 'second',
        icon: '/assets/images/reply.png',
        cursor: 'default',
        active: false
      },
      events: {
        canvasUndo: 'click'
      }
    };
    var undoToolInstance = new _tools__WEBPACK_IMPORTED_MODULE_2__["Tool"](undoTool);
    _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].push(undoTool); // Redo

    var redoTool = {
      category: 'tool',
      name: 'undoredo',
      properties: {
        enable: true,
        type: 'own-click',
        toolbar: 'second',
        icon: '/assets/images/redo.png',
        cursor: 'default',
        active: false
      },
      events: {
        canvasRedo: 'click'
      }
    };
    var redoToolInstance = new _tools__WEBPACK_IMPORTED_MODULE_2__["Tool"](redoTool);
    _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].push(redoTool); // Zoom in

    var zoominTool = {
      category: 'tool',
      name: 'zoominout',
      properties: {
        enable: true,
        type: 'own-click',
        toolbar: 'second',
        icon: '/assets/images/zoom.png',
        cursor: 'default',
        active: false
      },
      events: {
        canvasZoomIn: 'click'
      }
    };
    var zoominToolInstance = new _tools__WEBPACK_IMPORTED_MODULE_2__["Tool"](zoominTool);
    _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].push(zoominTool); // Zoom out

    var zoomoutTool = {
      category: 'tool',
      name: 'zoominout',
      properties: {
        enable: true,
        type: 'own-click',
        toolbar: 'second',
        icon: '/assets/images/zoom-out.png',
        cursor: 'default',
        active: false
      },
      events: {
        canvasZoomOut: 'click'
      }
    };
    var zoomoutToolInstance = new _tools__WEBPACK_IMPORTED_MODULE_2__["Tool"](zoomoutTool);
    _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].push(zoomoutTool); // Drag Canvas

    var dragTool = {
      category: 'tool',
      name: 'viewport',
      properties: {
        enable: true,
        type: 'canvas-tool',
        toolbar: 'second',
        icon: '/assets/images/drag.png',
        cursor: 'all-scroll',
        active: false
      },
      events: {
        mouseDown: 'mousedown',
        drag: 'mousemove',
        mouseUp: 'mouseup'
      }
    };
    var dragToolInstance = new _tools__WEBPACK_IMPORTED_MODULE_2__["Tool"](dragTool);
    _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].push(dragTool); // TODO change css by tool events
    // build toolbars

    _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].forEach(function (tool) {
      var div = document.createElement('div');
      div.style.backgroundImage = "url(\"".concat(tool.properties.icon, "\")");
      div.setAttribute('id', tool.name);
      div.setAttribute('class', 'tool enable unactive');

      if (tool.properties.type === 'canvas-tool') {
        div.addEventListener('click', function () {
          _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].activeTool = tool;
        });
      } else if (tool.properties.type === 'own-click') {
        div.addEventListener('click', function (e) {
          _tools__WEBPACK_IMPORTED_MODULE_2__["Tool"].eventHandler(e, tool, canvas);
        });
      }

      if (tool.properties.toolbar === 'main') {
        canvas.mainToolbar.appendChild(div);
      } else if (tool.properties.toolbar === 'second') {
        canvas.secondToolbar.appendChild(div);
      }
    }); // canvas event listeners for default tool

    var toolEventHandler = function toolEventHandler(e) {
      var promise = new Promise(function (resolve) {
        _tools__WEBPACK_IMPORTED_MODULE_2__["Tool"].eventHandler(e, _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].activeTool, canvas);
        resolve(_tools__WEBPACK_IMPORTED_MODULE_2__["Tool"].recordUndo());
      });
    };

    canvas.upperCanvas.addEventListener('mousedown', function (e) {
      return toolEventHandler(e);
    });
    canvas.upperCanvas.addEventListener('mousemove', function (e) {
      return toolEventHandler(e);
    });
    canvas.upperCanvas.addEventListener('mouseup', function (e) {
      return toolEventHandler(e);
    });
    this.canvas = canvas;
  }

  _createClass(Editor, null, [{
    key: "canvasUpdate",
    value: function canvasUpdate(canvas, _ref) {
      var x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          height = _ref.height;
      canvas.upperCanvas.ctx.clearRect(x, y, width, height);
      canvas.canvas.ctx.clearRect(x, y, width, height);
      _element__WEBPACK_IMPORTED_MODULE_0__["Elements"].forEach(function (element) {
        canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
      });
    }
  }]);

  return Editor;
}();



/***/ }),

/***/ "./js/element.js":
/*!***********************!*\
  !*** ./js/element.js ***!
  \***********************/
/*! exports provided: Elements, Element */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Elements", function() { return Elements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return Element; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Elements = [];

var Element =
/*#__PURE__*/
function () {
  function Element(x, y, width, height, style) {
    _classCallCheck(this, Element);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.style = style;
    this.layer = 1;
  }

  _createClass(Element, [{
    key: "mouseInShape",
    value: function mouseInShape(mousePositionX, mousePositionY) {
      return this.x <= mousePositionX && this.x + this.width >= mousePositionX && this.y <= mousePositionY && this.y + this.height >= mousePositionY;
    }
  }]);

  return Element;
}();



/***/ }),

/***/ "./js/globals.js":
/*!***********************!*\
  !*** ./js/globals.js ***!
  \***********************/
/*! exports provided: CANVAS_PROPERTIES, CANVAS_STATE, UNDO, REDO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CANVAS_PROPERTIES", function() { return CANVAS_PROPERTIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CANVAS_STATE", function() { return CANVAS_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNDO", function() { return UNDO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REDO", function() { return REDO; });
var CANVAS_PROPERTIES = {
  document: {
    width: 0,
    height: 0
  },
  zoom: {
    zoomStep: 1.1,
    maxZoom: 2,
    minZoom: 0.5
  }
};
var CANVAS_STATE = {
  dragging: false,
  activeTool: 'hold',
  valid: false,
  selection: [],
  dragoffx: 0,
  dragoffy: 0,
  layers: 0,
  canvas: {
    zoom: 1,
    draggable: false,
    dragging: false,
    width: 0,
    height: 0,
    center: {
      x: 0,
      y: 0
    },
    viewPort: {
      topLeft: {
        x: 0.1,
        y: 0.1
      },
      bottomRight: {
        x: CANVAS_PROPERTIES.document.width,
        y: CANVAS_PROPERTIES.document.height
      }
    }
  }
};
var UNDO = [];
var REDO = [];

/***/ }),

/***/ "./js/letse.config.js":
/*!****************************!*\
  !*** ./js/letse.config.js ***!
  \****************************/
/*! exports provided: plugins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugins", function() { return plugins; });
var plugins = [{
  category: 'tool',
  name: 'rectangle',
  properties: {
    enable: true,
    type: 'canvas-tool',
    toolbar: 'main',
    icon: '/assets/images/sweep.png',
    cursor: 'crosshair',
    active: false
  },
  events: {
    mouseDown: 'mousedown',
    mouseMove: 'mousemove',
    mouseUp: 'mouseup'
  }
}]; // TODO validity check for plugin structure

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./js/settings.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor */ "./js/editor.js");
/* harmony import */ var _letse_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./letse.config */ "./js/letse.config.js");



try {
  var checkConfig = __webpack_require__(/*! ./letse.config */ "./js/letse.config.js");
} catch (e) {
  console.log('Config file doesn\'t exists');
}


_settings__WEBPACK_IMPORTED_MODULE_0__["default"].getPlugins(_letse_config__WEBPACK_IMPORTED_MODULE_2__["plugins"]);
var editor = new _editor__WEBPACK_IMPORTED_MODULE_1__["default"]('letse-canvas-container', 300, 300, null);

/***/ }),

/***/ "./js/settings.js":
/*!************************!*\
  !*** ./js/settings.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Settings; });
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ "./js/tools.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Settings =
/*#__PURE__*/
function () {
  function Settings() {
    _classCallCheck(this, Settings);
  }

  _createClass(Settings, null, [{
    key: "getPlugins",
    value: function getPlugins(plugins) {
      plugins.forEach(function (plugin) {
        if (plugin.category === 'tool') {
          var tool = new _tools__WEBPACK_IMPORTED_MODULE_0__["Tool"](plugin);
          _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].push(tool);
        }
      });
    }
  }]);

  return Settings;
}();



/***/ }),

/***/ "./js/tools.js":
/*!*********************!*\
  !*** ./js/tools.js ***!
  \*********************/
/*! exports provided: Tools, Tool */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tools", function() { return Tools; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tool", function() { return Tool; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ "./js/globals.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element */ "./js/element.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Tools = [];
var Tool =
/*#__PURE__*/
function () {
  function Tool(tool) {
    _classCallCheck(this, Tool);

    this.name = tool.name;
    this.category = 'tool';
    this.active = false;
    this.properties = tool.properties;
    this.events = tool.events;
    this.enable = tool.enable;
  }

  _createClass(Tool, null, [{
    key: "eventHandler",
    value: function eventHandler(e, tool, canvas) {
      __webpack_require__("./js lazy recursive ^\\.\\/.*$")("./" + tool.name).then(function (toolModule) {
        Object.keys(tool.events).forEach(function (event) {
          if (tool.events[event] === e.type) {
            var toolEventFunction = toolModule.default[event](e, canvas);
          }
        });
      });
    }
  }, {
    key: "recordUndo",
    value: function recordUndo() {
      _globals__WEBPACK_IMPORTED_MODULE_0__["UNDO"].length = 0;
      _element__WEBPACK_IMPORTED_MODULE_1__["Elements"].forEach(function (element) {
        _globals__WEBPACK_IMPORTED_MODULE_0__["UNDO"].push(element);
      });
    }
  }]);

  return Tool;
}();

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map