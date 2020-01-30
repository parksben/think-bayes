"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.fill");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.sub");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DictWrapper2 = _interopRequireDefault(require("../DictWrapper"));

var _convertors = require("../convertors");

var _math = _interopRequireDefault(require("../math"));

var _utils = require("../utils");

var _bisect = require("../algorithm/bisect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Represents a cumulative distribution function.
 * @param {array} xs sequence of values
 * @param {array} ps sequence of probabilities
 * @param {string} name string used as a graph label
 */
var Cdf =
/*#__PURE__*/
function (_DictWrapper) {
  _inherits(Cdf, _DictWrapper);

  function Cdf(xs, ps, name) {
    var _this;

    _classCallCheck(this, Cdf);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cdf).call(this, null, name));
    _this.xs = xs || [];
    _this.ps = ps || [];
    return _this;
  }
  /**
   * Represents a cumulative distribution function.
   * @param {string} name string name for the new cdf
   * @returns new cdf
   */


  _createClass(Cdf, [{
    key: "copy",
    value: function copy(name) {
      return new Cdf(this.xs, this.ps, name || this.name);
    }
    /**
     * Makes a Pmf.
     * @param {string} name string name for the new pmf
     * @returns new pmf
     */

  }, {
    key: "makePmf",
    value: function makePmf(name) {
      return (0, _convertors.makePmfFromCdf)(this, name);
    }
    /**
     * Returns a sorted list of values.
     * @returns array of values
     */

  }, {
    key: "values",
    value: function values() {
      return this.xs;
    }
    /**
     * Returns a sorted sequence of [value, probability] pairs.
     * @returns array of [value, probability] pairs
     */

  }, {
    key: "items",
    value: function items() {
      var _this2 = this;

      return this.xs.map(function (x, i) {
        return [x, _this2.ps[i]];
      });
    }
    /**
     * Add an (x, p) pair to the end of this CDF.
     * Note: this us normally used to build a CDF from scratch, not
     * to modify existing CDFs.  It is up to the caller to make sure
     * that the result is a legal CDF.
     * @param {any} x number value or case name
     * @param {number} p number freq or prob
     */

  }, {
    key: "append",
    value: function append(x, p) {
      this.xs.push(x);
      this.ps.push(p);
    }
    /**
     * Adds a term to the xs.
     * @param {number} term how much to add
     * @returns another cdf
     */

  }, {
    key: "shift",
    value: function shift(term) {
      var another = this.copy();
      another.xs = this.xs.map(function (x) {
        return _math.default.add(x, term || 0);
      });
      return another;
    }
    /**
     * Multiplies the xs by a factor.
     * @param {*} factor what to multiply by
     * @returns another cdf
     */

  }, {
    key: "scale",
    value: function scale(factor) {
      var another = this.copy();
      another.xs = this.xs.map(function (x) {
        return _math.default.mult(x, factor || 1);
      });
      return another;
    }
    /**
     * Returns CDF(x), the probability that corresponds to value x.
     * @param {number} x number
     * @returns float probability
     */

  }, {
    key: "prob",
    value: function prob(x) {
      if (!x || x < this.xs[0]) return 0.0;
      var index = (0, _bisect.bisect)(this.xs, x);

      var p = this.ps[_math.default.sub(index, 1)];

      return p;
    }
    /**
     * Returns InverseCDF(p), the value that corresponds to probability p.
     * @param {number} p number in the range [0, 1]
     * @returns number value
     */

  }, {
    key: "value",
    value: function value(p) {
      if (!p || p < 0 || p > 1) throw new RangeError('Probability p must be in range [0, 1]');
      if (p === 0) return this.xs[0];
      if (p === 1) return this.xs[_math.default.sub(this.xs.length, 1)];
      var index = (0, _bisect.bisect)(this.ps, p);

      if (p === this.ps[_math.default.sub(index, 1)]) {
        return this.xs[_math.default.sub(index, 1)];
      }

      return this.xs[index];
    }
    /**
     * Returns the value that corresponds to percentile p.
     * @param {number} p number in the range [0, 100]
     * @returns number value
     */

  }, {
    key: "percentile",
    value: function percentile(p) {
      return this.value(_math.default.div(p / 100));
    }
    /**
     * Chooses a random value from this distribution.
     * @returns number value
     */

  }, {
    key: "random",
    value: function random() {
      return this.value(Math.random());
    }
    /**
     * Generates a random sample from this distribution.
     * @param {number} n int length of the sample
     * @returns array of random values
     */

  }, {
    key: "sample",
    value: function sample(n) {
      var _this3 = this;

      return new Array(n).fill(0).map(function () {
        return _this3.random();
      });
    }
    /**
     * Computes the mean of a CDF.
     * @returns float mean
     */

  }, {
    key: "mean",
    value: function mean() {
      var _this4 = this;

      var oldProb = 0;
      var total = 0;
      var items = this.xs.map(function (x, i) {
        return [x, _this4.ps[i]];
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              x = _step$value[0],
              p = _step$value[1];

          // total += (p - oldProb) * x
          total = _math.default.add(total, _math.default.mult(_math.default.sub(p, oldProb), x));
          oldProb = p;
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

      return total;
    }
    /**
     * Computes the central credible interval.
     * If percentage=90, computes the 90% CI.
     * @param {number} percentage float between 0 and 100
     * @returns sequence of two floats, low and high
     */

  }, {
    key: "credibleInterval",
    value: function credibleInterval() {
      var percentage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 90;

      // prob = (1 - percentage / 100.0) / 2
      var prob = _math.default.div(_math.default.sub(1, _math.default.div(percentage, 100)), 2);

      var interval = [this.value(prob), this.value(_math.default.sub(1, prob))];
      return interval;
    }
    /**
     * An entry is added to the cdf only if the percentile differs
     * from the previous value in a significant digit, where the number
     * of significant digits is determined by multiplier.
     * The default is 1000, which keeps log10(1000) = 3 significant digits.
     * @param {number} multiplier
     */

  }, {
    key: "_round",
    value: function _round() {
      var multiplier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      // TODO: write this method
      throw new _utils.UnimplementedMethodException('This method has not been implemented by the author for the time being. Please pay attention to the changelog of this project.');
    }
    /**
     * Generates a sequence of points suitable for plotting.
     * An empirical CDF is a step function; linear interpolation can be misleading.
     * @returns array of points
     */

  }, {
    key: "render",
    value: function render() {
      var xs = [this.xs[0]];
      var ps = [0];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.ps[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              i = _step2$value[0],
              p = _step2$value[1];

          xs.push(this.xs[i]);
          ps.push(p);

          if (this.xs[_math.default.add(i, 1)]) {
            xs.push(this.xs[_math.default.add(i, 1)]);
            ps.push(p);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return xs.map(function (x, i) {
        return [x, ps[i]];
      });
    }
    /**
     * Computes the CDF of the maximum of k selections from this dist.
     * @param {number} k int
     * @returns new Cdf
     */

  }, {
    key: "max",
    value: function max(k) {
      var cdf = this.copy();
      cdf.ps = cdf.ps.map(function (p) {
        return Math.pow(p, k);
      });
      return cdf;
    }
  }]);

  return Cdf;
}(_DictWrapper2.default);

exports.default = Cdf;
//# sourceMappingURL=index.js.map