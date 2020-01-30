"use strict";

require("core-js/modules/es.string.sub");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bisect2 = require("../algorithm/bisect");

var _math = _interopRequireDefault(require("../math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Represents a mapping between sorted sequences; performs linear interp.
 * @param {array} xs sorted list
 * @param {array} ys sorted list
 */
var Interpolater =
/*#__PURE__*/
function () {
  function Interpolater(_ref) {
    var _ref$xs = _ref.xs,
        xs = _ref$xs === void 0 ? [] : _ref$xs,
        _ref$ys = _ref.ys,
        ys = _ref$ys === void 0 ? [] : _ref$ys;

    _classCallCheck(this, Interpolater);

    this.xs = xs;
    this.ys = ys;
  }
  /**
   * Looks up x and returns the corresponding value of y.
   */


  _createClass(Interpolater, [{
    key: "lookup",
    value: function lookup(x) {
      return this._bisect(x, this.xs, this.ys);
    }
    /**
     * Looks up y and returns the corresponding value of x.
     */

  }, {
    key: "reverse",
    value: function reverse(x) {
      return this._bisect(x, this.ys, this.xs);
    }
    /**
     * Helper function.
     */

  }, {
    key: "_bisect",
    value: function _bisect(x, xs, ys) {
      if (x <= xs[0]) return ys[0];
      if (x >= xs[_math.default.sub(xs.length, 1)]) return ys[_math.default.sub(ys.length, 1)];
      var i = (0, _bisect2.bisect)(xs, x); // frac = (1.0 * (x - xs[i - 1])) / (xs[i] - xs[i - 1])

      var frac = _math.default.div(1.0 * _math.default.sub(x, xs[_math.default.sub(i, 1)]), _math.default.sub(xs[i], xs[_math.default.sub(i, 1)])); // y = ys[i - 1] + frac * 1.0 * (ys[i] - ys[i - 1])


      var y = _math.default.add(ys[_math.default.sub(i, 1)], _math.default.mult(_math.default.mult(frac, 1.0), _math.default.sub(ys[i], ys[_math.default.sub(i, 1)])));

      return y;
    }
  }]);

  return Interpolater;
}();

exports.default = Interpolater;
//# sourceMappingURL=index.js.map