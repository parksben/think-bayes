"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _Pmf = _interopRequireDefault(require("../Pmf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Represents a probability density function (PDF).
 */
var Pdf =
/*#__PURE__*/
function () {
  function Pdf() {
    _classCallCheck(this, Pdf);
  }

  _createClass(Pdf, [{
    key: "density",

    /**
     * Evaluates this pdf at x.
     * This method needs implement by children class, if not there is an `UnimplementedMethodException` would be throw when the method is called
     * @param {number} x number
     * @returns float probability density
     */
    value: function density(x) {
      throw new _utils.UnimplementedMethodException();
    }
    /**
     * Makes a discrete version of this pdf, evaluated at xs.
     * @param {string|array|object} xs equally-spaced sequence of values
     * @returns new pmf
     */

  }, {
    key: "makePmf",
    value: function makePmf(xs, name) {
      var pmf = new _Pmf.default(null, name);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = xs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var x = _step.value;
          pmf.set(x, this.density(x));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      pmf.normalize();
      return pmf;
    }
  }]);

  return Pdf;
}();

exports.default = Pdf;
//# sourceMappingURL=index.js.map