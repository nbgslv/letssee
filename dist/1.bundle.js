(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./js/hold.js":
/*!********************!*\
  !*** ./js/hold.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Hold; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Hold =
/*#__PURE__*/
function () {
  function Hold() {
    _classCallCheck(this, Hold);
  }

  _createClass(Hold, null, [{
    key: "mouseDown",
    value: function mouseDown(e) {
      var _this = this;

      var mousePosition = Editor.checkMousePosition(e, this.canvas);
      var mouse = {
        positionX: mousePosition.x,
        positionY: mousePosition.y
      };
      this.elements.forEach(function (element) {
        if (element.mouseInShape(mouse.positionX, mouse.positionY)) {
          // let selection = this.selection;
          _this.dragoffx = mouse.positionX - element.x;
          _this.dragoffy = mouse.positionY - element.y;
          _this.dragging = true;
          _this.selection = element;
          var selection = _this.selection;
          _this.valid = false;
          _this.canvas.upperCanvas.ctx.strokeStyle = '#CC0000';
          _this.canvas.upperCanvas.ctx.lineWidth = 2;

          _this.canvas.upperCanvas.ctx.strokeRect(selection.x, selection.y, selection.width, selection.height);
        }
      });
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      if (this.dragging) {
        var mousePosition = Editor.checkMousePosition(e, this.canvas);
        this.selection.x = mousePosition.x - this.dragoffx;
        this.selection.y = mousePosition.y - this.dragoffy;
        this.valid = false;
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(e) {
      this.dragging = false;
    }
  }]);

  return Hold;
}();



/***/ })

}]);
//# sourceMappingURL=1.bundle.js.map