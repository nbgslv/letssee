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
	"./ch": [
		"./js/ch.js",
		7,
		0
	],
	"./ch.js": [
		"./js/ch.js",
		7,
		0
	],
	"./editor": [
		"./js/editor.js",
		9
	],
	"./editor.js": [
		"./js/editor.js",
		9
	],
	"./element": [
		"./js/element.js",
		9
	],
	"./element.js": [
		"./js/element.js",
		9
	],
	"./globals": [
		"./js/globals.js",
		9
	],
	"./globals.js": [
		"./js/globals.js",
		9
	],
	"./hold": [
		"./js/hold.js",
		9,
		1
	],
	"./hold.js": [
		"./js/hold.js",
		9,
		1
	],
	"./letse.config": [
		"./js/letse.config.js",
		9
	],
	"./letse.config.js": [
		"./js/letse.config.js",
		9
	],
	"./main": [
		"./js/main.js",
		9
	],
	"./main.js": [
		"./js/main.js",
		9
	],
	"./rectangle": [
		"./js/rectangle.js",
		9,
		2
	],
	"./rectangle.js": [
		"./js/rectangle.js",
		9,
		2
	],
	"./settings": [
		"./js/settings.js",
		9
	],
	"./settings.js": [
		"./js/settings.js",
		9
	],
	"./tools": [
		"./js/tools.js",
		9
	],
	"./tools.js": [
		"./js/tools.js",
		9
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
	return Promise.all(ids.slice(2).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__.t(id, ids[1])
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
    canvas.canvas.setAttribute('width', this.width);
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
    canvas.upperCanvas.setAttribute('width', this.width);
    canvas.upperCanvas.setAttribute('id', 'letse-upper-canvas');
    canvas.upperCanvas.ctx = canvas.upperCanvas.getContext('2d'); // init default hold tool

    var defaultTool = {
      category: 'tool',
      name: 'hold',
      properties: {
        enable: true,
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
    _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].activeTool = defaultTool; // build toolbars

    _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].forEach(function (tool) {
      var div = document.createElement('div');
      div.style.backgroundImage = "url(\"".concat(tool.properties.icon, "\")");
      div.setAttribute('id', tool.name);
      div.setAttribute('class', 'tool enable unactive');
      div.addEventListener('click', function () {
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].activeTool = tool;
      });

      if (tool.properties.toolbar === 'main') {
        canvas.mainToolbar.appendChild(div);
      } else if (tool.properties.toolbar === 'second') {
        canvas.secondToolbar.appendChild(div);
      }
    }); // canvas event listeners for default tool

    canvas.upperCanvas.addEventListener('mousedown', function (e) {
      return _tools__WEBPACK_IMPORTED_MODULE_2__["Tool"].eventHandler(e, _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].activeTool, canvas);
    });
    canvas.upperCanvas.addEventListener('mousemove', function (e) {
      return _tools__WEBPACK_IMPORTED_MODULE_2__["Tool"].eventHandler(e, _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].activeTool, canvas);
    });
    canvas.upperCanvas.addEventListener('mouseup', function (e) {
      return _tools__WEBPACK_IMPORTED_MODULE_2__["Tool"].eventHandler(e, _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].activeTool, canvas);
    });
    this.canvas = canvas;
  }

  _createClass(Editor, null, [{
    key: "checkMousePosition",
    value: function checkMousePosition(e, canvas) {
      var offsetX = 0;
      var offsetY = 0;
      var mousePositionX;
      var mousePositionY;
      var html = document.body.parentNode;
      var upperCanvas = canvas.upperCanvas;

      if (upperCanvas.offsetParent !== undefined) {
        do {
          offsetX += upperCanvas.offsetLeft;
          offsetY += upperCanvas.offsetTop;
        } while (upperCanvas = upperCanvas.offsetParent);
      }

      upperCanvas = canvas.upperCanvas;
      var stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(upperCanvas).paddingLeft, 10) || 0;
      var stylePaddingTop = parseInt(document.defaultView.getComputedStyle(upperCanvas).paddingTop, 10) || 0;
      var styleBorderLeft = parseInt(document.defaultView.getComputedStyle(upperCanvas).borderLeftWidth, 10) || 0;
      var styleBorderTop = parseInt(document.defaultView.getComputedStyle(upperCanvas).borderTopWidth, 10) || 0;
      offsetX += stylePaddingLeft + styleBorderLeft + html.offsetLeft;
      offsetY += stylePaddingTop + styleBorderTop + html.offsetTop;
      mousePositionX = e.pageX - offsetX;
      mousePositionY = e.pageY - offsetY;
      return {
        x: mousePositionX,
        y: mousePositionY
      };
    }
  }, {
    key: "canvasUpdate",
    value: function canvasUpdate(canvas) {
      canvas.canvas.ctx.drawImage(canvas.upperCanvas, 0, 0);
      canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);
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
/*! exports provided: CANVAS_STATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CANVAS_STATE", function() { return CANVAS_STATE; });
var CANVAS_STATE = {
  dragging: false,
  activeTool: 'hold',
  valid: false,
  selection: [],
  dragoffx: 0,
  dragoffy: 0
};

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
  }]);

  return Tool;
}();

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map