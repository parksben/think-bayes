"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DictWrapper2 = _interopRequireDefault(require("../DictWrapper"));

var _utils = require("../utils");

var _convertors = require("../convertors");

var _math = _interopRequireDefault(require("../math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pmf =
/*#__PURE__*/
function (_DictWrapper) {
  _inherits(Pmf, _DictWrapper);

  function Pmf() {
    _classCallCheck(this, Pmf);

    return _possibleConstructorReturn(this, _getPrototypeOf(Pmf).apply(this, arguments));
  }

  _createClass(Pmf, [{
    key: "prob",

    /**
     * Gets the probability associated with the value x.
     * @param {any} x number value
     * @param {number} probDefault value to return if the key is not there
     */
    value: function prob(x) {
      var probDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this.d.get(x) || probDefault;
    }
    /**
     * Gets probabilities for a sequence of values.
     */

  }, {
    key: "probs",
    value: function probs(xs) {
      var _this = this;

      return xs.map(function (x) {
        return _this.prob(x);
      });
    }
    /**
     * Makes a cdf.
     */

  }, {
    key: "makeCdf",
    value: function makeCdf(name) {
      return (0, _convertors.makeCdfFromPmf)(this, name);
    }
  }, {
    key: "probGreater",
    value: function probGreater(x) {
      var t = _toConsumableArray(this.d).filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            val = _ref2[0],
            prob = _ref2[1];

        return val > x;
      }).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            val = _ref4[0],
            prob = _ref4[1];

        return prob;
      });

      return t.reduce(function (prev, curr) {
        return _math.default.add(prev, curr);
      });
    }
  }, {
    key: "probLess",
    value: function probLess(x) {
      var t = _toConsumableArray(this.d).filter(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            val = _ref6[0],
            prob = _ref6[1];

        return val < x;
      }).map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            val = _ref8[0],
            prob = _ref8[1];

        return prob;
      });

      return t.reduce(function (prev, curr) {
        return _math.default.add(prev, curr);
      });
    }
    /**
     * Normalizes this PMF so the sum of all probs is fraction.
     * @param {number} fraction what the total should be after normalization
     * @returns the total probability before normalizing
     */

  }, {
    key: "normalize",
    value: function normalize() {
      var fraction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;
      if (this.logFlag) throw new _utils.ValueError('pmf is under a log transform');
      var total = this.total();
      if (total === 0.0) throw new _utils.ValueError('Normalize: total probability is zero.');

      var factor = _math.default.div(fraction, total);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.d.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              x = _step$value[0],
              p = _step$value[1];

          this.d.set(x, _math.default.mult(p, factor));
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
     * Chooses a random element from this PMF.
     * @returns float value from the Pmf
     */

  }, {
    key: "random",
    value: function random() {
      if (this.d.size === 0) throw new _utils.ValueError('pmf contains no values.');
      var target = Math.random();
      var total = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.d.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              x = _step2$value[0],
              p = _step2$value[1];

          total = _math.default.add(total, p);
          if (total >= target) return x;
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

      throw new RangeError("Value not found, no one value in this pmf matches the random target '".concat(target, "'"));
    }
    /**
     * Computes the mean of a PMF.
     * @returns float mean
     */

  }, {
    key: "mean",
    value: function mean() {
      var mu = 0;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.d.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              x = _step3$value[0],
              p = _step3$value[1];

          mu = _math.default.add(mu, _math.default.mult(p, x));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return mu;
    }
    /**
     * Computes the variance of a PMF.
     * @param {number} mu the point around which the variance is computed; if omitted, computes the mean
     * @returns float variance
     */

  }, {
    key: "var",
    value: function _var(miu) {
      var mu = miu || this.mean();
      var variance = 0;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.d.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _step4$value = _slicedToArray(_step4.value, 2),
              x = _step4$value[0],
              p = _step4$value[1];

          // variance += p * (x - mu) ** 2
          variance = _math.default.add(variance, _math.default.mult(p, Math.pow(_math.default.sub(x, mu), 2)));
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return variance;
    }
    /**
     * Returns the value with the highest probability.
     * @returns float probability
     */

  }, {
    key: "maximumLikelihood",
    value: function maximumLikelihood() {
      var maxProb = Math.max.apply(Math, _toConsumableArray(this.d.values()));

      var _find = _toConsumableArray(this.d).find(function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 2),
            x = _ref10[0],
            p = _ref10[1];

        return p === maxProb;
      }),
          _find2 = _slicedToArray(_find, 1),
          val = _find2[0];

      return val;
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
      var cdf = this.makeCdf();
      return cdf.credibleInterval(percentage);
    }
    /**
     * Computes the Pmf of the sum of values drawn from self and other.
     * @param {number or pmf} other another pmf or a number
     * @returns new pmf
     */

  }, {
    key: "add",
    value: function add(other) {
      try {
        return this.addPmf(other);
      } catch (e) {
        return this.addConstant(other);
      }
    }
    /**
     * Computes the Pmf of the sum of values drawn from self and other.
     * @param {pmf} other another pmf
     * @returns new Pmf
     */

  }, {
    key: "addPmf",
    value: function addPmf(other) {
      var pmf = new Pmf();
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.items()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _step5$value = _slicedToArray(_step5.value, 2),
              v1 = _step5$value[0],
              p1 = _step5$value[1];

          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = other.items()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var _step6$value = _slicedToArray(_step6.value, 2),
                  v2 = _step6$value[0],
                  p2 = _step6$value[1];

              pmf.incr(_math.default.add(v1, v2), _math.default.mult(p1, p2));
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
                _iterator6.return();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return pmf;
    }
    /**
     * Computes the Pmf of the sum a constant and  values from self.
     * @param {number} other a number
     * @returns new Pmf
     */

  }, {
    key: "addConstant",
    value: function addConstant(other) {
      var pmf = new Pmf();
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.items()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _step7$value = _slicedToArray(_step7.value, 2),
              v = _step7$value[0],
              p = _step7$value[1];

          pmf.set(_math.default.add(v, other), p);
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return pmf;
    }
    /**
     * Computes the Pmf of the diff of values drawn from self and other.
     * @param {pmf} other another Pmf
     * @returns new Pmf
     */

  }, {
    key: "sub",
    value: function sub(other) {
      var pmf = new Pmf();
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.items()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _step8$value = _slicedToArray(_step8.value, 2),
              v1 = _step8$value[0],
              p1 = _step8$value[1];

          var _iteratorNormalCompletion9 = true;
          var _didIteratorError9 = false;
          var _iteratorError9 = undefined;

          try {
            for (var _iterator9 = other.items()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
              var _step9$value = _slicedToArray(_step9.value, 2),
                  v2 = _step9$value[0],
                  p2 = _step9$value[1];

              pmf.incr(_math.default.sub(v1, v2), _math.default.mult(p1, p2));
            }
          } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
                _iterator9.return();
              }
            } finally {
              if (_didIteratorError9) {
                throw _iteratorError9;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return pmf;
    }
    /**
     * Computes the CDF of the maximum of k selections from this dist.
     * @param {number} k int
     * @returns new Cdf
     */

  }, {
    key: "max",
    value: function max(k) {
      var cdf = this.makeCdf();
      cdf.ps = cdf.ps.map(function (c) {
        return Math.pow(c, k);
      });
      return cdf;
    }
  }]);

  return Pmf;
}(_DictWrapper2.default);

exports.default = Pmf;