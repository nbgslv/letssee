(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./js/undoredo.js":
/*!************************!*\
  !*** ./js/undoredo.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UndoRedo; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ "./js/globals.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element */ "./js/element.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var UndoRedo =
/*#__PURE__*/
function () {
  function UndoRedo() {
    _classCallCheck(this, UndoRedo);
  }

  _createClass(UndoRedo, null, [{
    key: "canvasUndo",
    value: function canvasUndo(e, canvas) {
      var i = 0;
      canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);

      for (i; i < _globals__WEBPACK_IMPORTED_MODULE_0__["Undo"].length - 1; i++) {
        canvas.upperCanvas.ctx.strokeRect(_globals__WEBPACK_IMPORTED_MODULE_0__["Undo"][i].x, _globals__WEBPACK_IMPORTED_MODULE_0__["Undo"][i].y, _globals__WEBPACK_IMPORTED_MODULE_0__["Undo"][i].width, _globals__WEBPACK_IMPORTED_MODULE_0__["Undo"][i].height);
      }

      _globals__WEBPACK_IMPORTED_MODULE_0__["Redo"].push(_globals__WEBPACK_IMPORTED_MODULE_0__["Undo"][_globals__WEBPACK_IMPORTED_MODULE_0__["Undo"].length - 1]);
      _globals__WEBPACK_IMPORTED_MODULE_0__["Undo"].pop();
      _element__WEBPACK_IMPORTED_MODULE_1__["Elements"].length = 0;
      _globals__WEBPACK_IMPORTED_MODULE_0__["Undo"].forEach(function (element) {
        _element__WEBPACK_IMPORTED_MODULE_1__["Elements"].push(element);
      });
    }
  }, {
    key: "canvasRedo",
    value: function canvasRedo(e, canvas) {
      var element = _globals__WEBPACK_IMPORTED_MODULE_0__["Redo"].shift();
      canvas.upperCanvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
    }
  }]);

  return UndoRedo;
}();



/***/ })

}]);
//# sourceMappingURL=2.bundle.js.map