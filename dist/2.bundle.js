(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./js/layers.js":
/*!**********************!*\
  !*** ./js/layers.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Layers; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ "./js/globals.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Layers =
/*#__PURE__*/
function () {
  function Layers() {
    _classCallCheck(this, Layers);
  }

  _createClass(Layers, null, [{
    key: "addLayer",
    value: function addLayer(element) {
      element.layer += _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].layers;
      _globals__WEBPACK_IMPORTED_MODULE_0__["CANVAS_STATE"].layers++;
    }
  }, {
    key: "layerBack",
    value: function layerBack(e, canvas) {}
  }]);

  return Layers;
}();



/***/ })

}]);
//# sourceMappingURL=2.bundle.js.map