(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./js/zoominout.js":
/*!*************************!*\
  !*** ./js/zoominout.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ZoomInOut; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./js/element.js");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals */ "./js/globals.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var ZoomInOut =
/*#__PURE__*/
function () {
  function ZoomInOut() {
    _classCallCheck(this, ZoomInOut);
  }

  _createClass(ZoomInOut, null, [{
    key: "canvasZoomIn",
    value: function canvasZoomIn(e, canvas) {
      var scale = 1.1;
      var newZoom = parseFloat(_globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.zoom * scale).toFixed(2);
      console.log(newZoom);
      canvas.upperCanvas.ctx.translate(canvas.upperCanvas.width / 2 - scale * (canvas.upperCanvas.width / 2), canvas.upperCanvas.height / 2 - scale * (canvas.upperCanvas.height / 2));
      canvas.upperCanvas.ctx.scale(scale, scale);
      canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);
      canvas.canvas.ctx.translate(canvas.canvas.width / 2 - scale * (canvas.canvas.width / 2), canvas.canvas.height / 2 - scale * (canvas.canvas.height / 2));
      canvas.canvas.ctx.scale(scale, scale);
      canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
      _element__WEBPACK_IMPORTED_MODULE_0__["Elements"].forEach(function (element) {
        canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
      });

      if (newZoom === 1.00) {
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.topLeft.x = 0;
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.topLeft.y = 0;
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.bottomRight.x = canvas.canvas.width;
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.bottomRight.y = canvas.canvas.height;
      } else {
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.topLeft.x += canvas.canvas.width / 2 - newZoom / _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.zoom * (canvas.canvas.width / 2);
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.topLeft.y += canvas.canvas.height / 2 - newZoom / _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.zoom * (canvas.canvas.height / 2);
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.bottomRight.x -= canvas.canvas.width / 2 - newZoom / _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.zoom * (canvas.canvas.width / 2);
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.bottomRight.y -= canvas.canvas.height / 2 - newZoom / _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.zoom * (canvas.canvas.height / 2);
        console.log(_globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.topLeft.x);
        console.log(_globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.bottomRight.x);
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.zoom = newZoom;
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.width *= scale;
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.height *= scale;
      }

      _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.draggable = canvas.canvas.width < _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.width || canvas.canvas.height < _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.height;
    }
  }, {
    key: "canvasZoomOut",
    value: function canvasZoomOut(e, canvas) {
      var scale = 1 / 1.1;
      var newZoom = parseFloat(_globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.zoom * scale).toFixed(2);
      console.log(newZoom);
      canvas.upperCanvas.ctx.translate(canvas.upperCanvas.width / 2 - scale * (canvas.upperCanvas.width / 2), canvas.upperCanvas.height / 2 - scale * (canvas.upperCanvas.height / 2));
      canvas.upperCanvas.ctx.scale(scale, scale);
      canvas.upperCanvas.ctx.clearRect(0, 0, canvas.upperCanvas.width, canvas.upperCanvas.height);
      canvas.canvas.ctx.translate(canvas.canvas.width / 2 - scale * (canvas.canvas.width / 2), canvas.canvas.height / 2 - scale * (canvas.canvas.height / 2));
      canvas.canvas.ctx.scale(scale, scale);
      canvas.canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
      _element__WEBPACK_IMPORTED_MODULE_0__["Elements"].forEach(function (element) {
        canvas.canvas.ctx.strokeRect(element.x, element.y, element.width, element.height);
      });

      if (newZoom === 1.00) {
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.topLeft.x = 0;
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.topLeft.y = 0;
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.bottomRight.x = canvas.canvas.width;
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.bottomRight.y = canvas.canvas.height;
      } else {
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.topLeft.x += canvas.canvas.width / 2 - newZoom / _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.zoom * (canvas.canvas.width / 2);
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.topLeft.y += canvas.canvas.height / 2 - newZoom / _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.zoom * (canvas.canvas.height / 2);
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.bottomRight.x -= canvas.canvas.width / 2 - newZoom / _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.zoom * (canvas.canvas.width / 2);
        _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.bottomRight.y -= canvas.canvas.height / 2 - newZoom / _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.zoom * (canvas.canvas.height / 2);
      }

      console.log(_globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.topLeft.x);
      console.log(_globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.viewPort.bottomRight.x);
      _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.zoom = newZoom;
      _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.width *= scale;
      _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.height *= scale;
      _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.draggable = canvas.canvas.width < _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.width || canvas.canvas.height < _globals__WEBPACK_IMPORTED_MODULE_1__["CANVAS_STATE"].canvas.height;
    }
  }]);

  return ZoomInOut;
}(); // TODO make newZoom integer
// TODO set canvas place on zoom = 1
// TODO set zoom min and max




/***/ })

}]);
//# sourceMappingURL=1.bundle.js.map