(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./js/elements.js":
/*!************************!*\
  !*** ./js/elements.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Element; });
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ "./js/tools.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Element =
/*#__PURE__*/
function (_Tool) {
  _inherits(Element, _Tool);

  function Element(name, properties, events, element, style) {
    var _this;

    var layer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

    _classCallCheck(this, Element);

    // TODO elements file
    // TODO figure out how to implement different types of elements
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Element).call(this, name, properties, events));
    _this.x = element.x;
    _this.y = element.y;
    _this.width = element.width;
    _this.height = element.height;
    _this.style = style;
    _this.layer = layer;
    return _this;
  }

  _createClass(Element, [{
    key: "mouseInShape",
    value: function mouseInShape(mousePositionX, mousePositionY) {
      return this.x <= mousePositionX && this.x + this.width >= mousePositionX && this.y <= mousePositionY && this.y + this.height >= mousePositionY;
    }
  }]);

  return Element;
}(_tools__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./js/line.js":
/*!********************!*\
  !*** ./js/line.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Line; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ "./js/globals.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements */ "./js/elements.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor */ "./js/editor.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0
};
var canvasClearParam = {
  x: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.topLeft.x,
  y: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.topLeft.y,
  width: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.width,
  height: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.height
};

var Line =
/*#__PURE__*/
function (_Element) {
  _inherits(Line, _Element);

  function Line(name, properties, events, element, style) {
    var _this;

    _classCallCheck(this, Line);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Line).call(this, name, properties, events, element, style));
    _this.startX = element.startX;
    _this.startY = element.startY;

    _this.draw = function (canvas) {
      canvas.ctx.beginPath();
      canvas.ctx.moveTo(this.startX, this.startY);
      canvas.ctx.lineTo(this.x, this.y);
      canvas.ctx.stroke();
    };

    return _this;
  }

  _createClass(Line, null, [{
    key: "mouseDown",
    value: function mouseDown(e) {
      this.started = true;
      mouse.startX = e.clientX;
      mouse.startY = e.clientY;
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e, canvas) {
      if (this.started) {
        mouse.x = e.screenX;
        mouse.y = e.screenY;
        _editor__WEBPACK_IMPORTED_MODULE_2__["default"].canvasUpdate(canvas.upperCanvas, true, canvasClearParam);
        canvas.upperCanvas.ctx.beginPath();
        canvas.upperCanvas.ctx.moveTo(mouse.startX, mouse.startY);
        canvas.upperCanvas.ctx.lineTo(mouse.x, mouse.y);
        canvas.upperCanvas.ctx.stroke();
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(e, canvas, tool) {
      if (this.started) {
        this.mouseMove(e, canvas);
        this.started = false;
        var element = {
          startX: mouse.startX,
          startY: mouse.startY,
          x: mouse.x,
          y: mouse.y,
          width: mouse.x - mouse.startX,
          height: mouse.y - mouse.startY
        };
        var line = new Line(tool.name, tool.properties, tool.events, element, null);
        _globals__WEBPACK_IMPORTED_MODULE_0__["ELEMENTS"].push(line);
        _editor__WEBPACK_IMPORTED_MODULE_2__["default"].canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
        _editor__WEBPACK_IMPORTED_MODULE_2__["default"].canvasUpdate(canvas.canvas, true, canvasClearParam);
      }
    }
  }]);

  return Line;
}(_elements__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ })

}]);
//# sourceMappingURL=0.bundle.js.map