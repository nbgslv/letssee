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
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./js/element.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Rectangle =
/*#__PURE__*/
function () {
  function Rectangle() {
    _classCallCheck(this, Rectangle);

    this.mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      width: 0,
      height: 0
    };
    this.ctx = null;
    this.started = false;
  }

  _createClass(Rectangle, null, [{
    key: "mouseDown",
    value: function mouseDown(e) {
      this.started = true;
      this.mouse.startX = e.clientX;
      this.mouse.startY = e.clientY;
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e, canvas) {
      if (this.started) {
        this.mouse.x = Math.min(e.screenX, this.mouse.startX);
        this.mouse.y = Math.min(e.screenY, this.mouse.startY);
        this.mouse.width = Math.abs(e.screenX - this.mouse.startX);
        this.mouse.height = Math.abs(e.screenY - this.mouse.startY);
        this.ctx = canvas.canvas.getContext('2d');
        this.upperCTX = canvas.upperCanvas.getContext('2d');
        this.upperCTX.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);
        this.upperCTX.strokeRect(this.mouse.x, this.mouse.y, this.mouse.width, this.mouse.height);
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(e, canvas) {
      if (this.started) {
        this.mouseMove(e, canvas);
        this.started = false;
        Rectangle.canvasUpdate(this.ctx, this.upperCTX, canvas);
        var rect = new _element__WEBPACK_IMPORTED_MODULE_0__["Element"](this.mouse.x, this.mouse.y, this.mouse.width, this.mouse.height);
        _element__WEBPACK_IMPORTED_MODULE_0__["Elements"].push(rect);
      }
    }
  }]);

  return Rectangle;
}();



/***/ })

}]);
//# sourceMappingURL=1.bundle.js.map