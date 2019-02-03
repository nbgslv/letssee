(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

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

/***/ "./js/rectangle.js":
/*!*************************!*\
  !*** ./js/rectangle.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rectangle; });
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
  startY: 0,
  width: 0,
  height: 0
};
var canvasClearParam = {
  x: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.topLeft.x,
  y: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.topLeft.y,
  width: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.width,
  height: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.height
};

var Rectangle =
/*#__PURE__*/
function (_Element) {
  _inherits(Rectangle, _Element);

  function Rectangle(name, properties, events, element, style) {
    var _this;

    _classCallCheck(this, Rectangle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rectangle).call(this, name, properties, events, element, style));

    _this.draw = function (canvas) {
      canvas.ctx.strokeRect(this.x, this.y, this.width, this.height);
    };

    return _this;
  }

  _createClass(Rectangle, null, [{
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
        mouse.x = Math.min(e.screenX, mouse.startX);
        mouse.y = Math.min(e.screenY, mouse.startY);
        mouse.width = Math.abs(e.screenX - mouse.startX);
        mouse.height = Math.abs(e.screenY - mouse.startY);
        _editor__WEBPACK_IMPORTED_MODULE_2__["default"].canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
        canvas.upperCanvas.ctx.strokeRect(mouse.x, mouse.y, mouse.width, mouse.height);
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(e, canvas, tool) {
      if (this.started) {
        this.mouseMove(e, canvas);
        this.started = false;
        var element = {
          x: mouse.x,
          y: mouse.y,
          width: mouse.width,
          height: mouse.height
        };
        var rect = new Rectangle(tool.name, tool.properties, tool.events, element, null);
        _globals__WEBPACK_IMPORTED_MODULE_0__["ELEMENTS"].push(rect);
        _editor__WEBPACK_IMPORTED_MODULE_2__["default"].canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
        _editor__WEBPACK_IMPORTED_MODULE_2__["default"].canvasUpdate(canvas.canvas, true, canvasClearParam);
      }
    }
  }]);

  return Rectangle;
}(_elements__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ })

}]);
//# sourceMappingURL=1.bundle.js.map