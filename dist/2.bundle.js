(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./js/rectangle.js":
/*!*************************!*\
  !*** ./js/rectangle.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rectangle; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./js/element.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor */ "./js/editor.js");
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

    this.started = false;
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
        _editor__WEBPACK_IMPORTED_MODULE_1__["default"].canvasUpdate(canvas);
        var rect = new _element__WEBPACK_IMPORTED_MODULE_0__["Element"](mouse.x, mouse.y, mouse.width, mouse.height);
        _element__WEBPACK_IMPORTED_MODULE_0__["Elements"].push(rect);
      }
    }
  }]);

  return Rectangle;
}();



/***/ })

}]);
//# sourceMappingURL=2.bundle.js.map