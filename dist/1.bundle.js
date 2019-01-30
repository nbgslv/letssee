(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./js/utilities.js":
/*!*************************!*\
  !*** ./js/utilities.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Utilities; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Utilities =
/*#__PURE__*/
function () {
  function Utilities() {
    _classCallCheck(this, Utilities);
  }

  _createClass(Utilities, null, [{
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
    key: "getBaseLog",
    value: function getBaseLog(x, y) {
      return Math.log(y) / Math.log(x);
    }
  }]);

  return Utilities;
}();



/***/ }),

/***/ "./js/zoominout.js":
/*!*************************!*\
  !*** ./js/zoominout.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ZoomInOut; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ "./js/globals.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor */ "./js/editor.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities */ "./js/utilities.js");
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
      ZoomInOut.setZoom(1, canvas);
    }
  }, {
    key: "canvasZoomOut",
    value: function canvasZoomOut(e, canvas) {
      ZoomInOut.setZoom(0, canvas);
    }
  }, {
    key: "setZoom",
    value: function setZoom(zoom, canvas) {
      var zoomStep;

      if (zoom === 1) {
        zoomStep = _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_PROPERTIES"].zoom.zoomStep;
      } else if (zoom === 0) {
        zoomStep = 1 / _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_PROPERTIES"].zoom.zoomStep;
      }

      var newZoom = _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.zoom * zoomStep;

      if (newZoom > _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_PROPERTIES"].zoom.maxZoom || newZoom < _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_PROPERTIES"].zoom.minZoom) {
        return;
      }

      var zoomDifference = newZoom - _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.zoom;
      console.log(newZoom);
      var docWidth = _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.width * zoomStep;
      var docHeight = _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.height * zoomStep;
      var zoomSteps = _utilities__WEBPACK_IMPORTED_MODULE_2__["default"].getBaseLog(_globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_PROPERTIES"].zoom.zoomStep, _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.zoom);
      zoomSteps = zoomSteps === 0 ? 1 : zoomSteps;
      var canvasCenterX = _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_PROPERTIES"].document.width / 2;
      var canvasCenterY = _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_PROPERTIES"].document.height / 2;
      var stepToCenterX = 0;
      var stepToCenterY = 0;

      if (canvasCenterX !== _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.center.x) {
        stepToCenterX = (_globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.center.x - canvasCenterX) / zoomSteps;
        _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.center.x -= stepToCenterX;
      }

      if (canvasCenterY !== _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.center.y) {
        stepToCenterY = (_globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.center.y - canvasCenterY) / zoomSteps;
        _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.center.y -= stepToCenterY;
      }

      var translateX = -(_globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_PROPERTIES"].document.width / 2 * zoomDifference / newZoom - stepToCenterX);
      var translateY = -(_globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_PROPERTIES"].document.height / 2 * zoomDifference / newZoom - stepToCenterY);
      var canvasClearParam = {
        x: 0,
        y: 0,
        width: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_PROPERTIES"].document.width,
        height: _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_PROPERTIES"].document.height
      };
      canvas.upperCanvas.ctx.scale(zoomStep, zoomStep);
      canvas.upperCanvas.ctx.translate(translateX, translateY);
      _editor__WEBPACK_IMPORTED_MODULE_1__["default"].canvasUpdate(canvas.upperCanvas, false, canvasClearParam);
      canvas.canvas.ctx.scale(zoomStep, zoomStep);
      canvas.canvas.ctx.translate(translateX, translateY);
      _editor__WEBPACK_IMPORTED_MODULE_1__["default"].canvasUpdate(canvas.canvas, true, canvasClearParam);
      _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.zoom = newZoom;

      if (zoom === 1) {
        _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.topLeft.x -= (docWidth - _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.width) / 2;
        _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.topLeft.y -= (docHeight - _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.height) / 2;
        _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.bottomRight.x += (docWidth - _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.width) / 2;
        _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.bottomRight.y += (docHeight - _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.height) / 2;
      } else if (zoom === 0) {
        _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.topLeft.x += (docWidth - _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.width) / 2;
        _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.topLeft.y += (docHeight - _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.height) / 2;
        _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.bottomRight.x -= (docWidth - _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.width) / 2;
        _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.viewPort.bottomRight.y -= (docHeight - _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.height) / 2;
      }

      _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.width = docWidth;
      _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.height = docHeight;
      _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.draggable = canvas.canvas.width < Math.round(_globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.width) || canvas.canvas.height < Math.round(_globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].canvas.height);
    }
  }]);

  return ZoomInOut;
}();



/***/ })

}]);
//# sourceMappingURL=1.bundle.js.map