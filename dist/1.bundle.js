(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

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
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element */ "./js/element.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor */ "./js/editor.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  width: 0,
  height: 0
};

var Rectangle =
/*#__PURE__*/
function () {
  function Rectangle() {
    _classCallCheck(this, Rectangle);
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
        canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);
        canvas.upperCanvas.ctx.strokeRect(mouse.x, mouse.y, mouse.width, mouse.height);
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(e, canvas) {
      if (this.started) {
        this.mouseMove(e, canvas);
        this.started = false;
        var rect = new _element__WEBPACK_IMPORTED_MODULE_1__["Element"](mouse.x, mouse.y, mouse.width, mouse.height);
        _element__WEBPACK_IMPORTED_MODULE_1__["Elements"].push(rect);
        _editor__WEBPACK_IMPORTED_MODULE_2__["default"].canvasUpdate(canvas, {
          x: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.topLeft.x,
          y: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.topLeft.y,
          width: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.width,
          height: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.height
        });
      }
    }
  }]);

  return Rectangle;
}();



/***/ })

}]);
//# sourceMappingURL=1.bundle.js.map