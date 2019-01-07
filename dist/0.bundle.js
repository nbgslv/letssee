(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./js/hold.js":
/*!********************!*\
  !*** ./js/hold.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Hold; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./js/element.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor */ "./js/editor.js");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./globals */ "./js/globals.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var selection;

var Hold =
/*#__PURE__*/
function () {
  function Hold() {
    _classCallCheck(this, Hold);
  }

  _createClass(Hold, null, [{
    key: "mouseDown",
    value: function mouseDown(e, canvas) {
      var _this = this;

      var mousePosition = _editor__WEBPACK_IMPORTED_MODULE_1__["default"].checkMousePosition(e, canvas);
      var mouse = {
        positionX: mousePosition.x,
        positionY: mousePosition.y
      };
      _element__WEBPACK_IMPORTED_MODULE_0__["Elements"].forEach(function (element) {
        if (element.mouseInShape(mouse.positionX, mouse.positionY)) {
          // let selection = this.selection;
          _this.dragoffx = mouse.positionX - element.x;
          _this.dragoffy = mouse.positionY - element.y;
          _globals__WEBPACK_IMPORTED_MODULE_2__["CANVAS_STATE"].dragging = true;
          _globals__WEBPACK_IMPORTED_MODULE_2__["CANVAS_STATE"].selection = element;
          selection = _globals__WEBPACK_IMPORTED_MODULE_2__["CANVAS_STATE"].selection;
          Hold.draw(canvas); //return;
        }
        /*
        if (CANVAS_STATE.selection) {
         CANVAS_STATE.selection = null;
         selection = null;
         Hold.draw(canvas);
        } */

      });
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e, canvas) {
      if (_globals__WEBPACK_IMPORTED_MODULE_2__["CANVAS_STATE"].dragging) {
        var mousePosition = _editor__WEBPACK_IMPORTED_MODULE_1__["default"].checkMousePosition(e, canvas);
        selection.x = mousePosition.x - this.dragoffx;
        selection.y = mousePosition.y - this.dragoffy;
        Hold.draw(canvas);
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(e, canvas) {
      _globals__WEBPACK_IMPORTED_MODULE_2__["CANVAS_STATE"].dragging = false;
    }
  }, {
    key: "draw",
    value: function draw(canvas) {
      canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
      canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);
      _element__WEBPACK_IMPORTED_MODULE_0__["Elements"].forEach(function (element) {
        if (!(element.x > canvas.upperCanvas.width || element.y > canvas.upperCanvas.height || element.x + element.width < 0 || element.y + element.height < 0)) {
          canvas.upperCanvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
        }

        if (selection !== null) {
          canvas.upperCanvas.ctx.strokeRect(selection.x, selection.y, selection.width, selection.height);
        }

        _editor__WEBPACK_IMPORTED_MODULE_1__["default"].canvasUpdate(canvas);
      });
    }
  }]);

  return Hold;
}();



/***/ })

}]);
//# sourceMappingURL=0.bundle.js.map