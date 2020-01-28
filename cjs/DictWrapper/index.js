"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.function.name");

require("core-js/modules/es.map");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.sub");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _math = _interopRequireDefault(require("../math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DictWrapper =
/*#__PURE__*/
function () {
  function DictWrapper(values, name) {
    _classCallCheck(this, DictWrapper);

    this.name = name;
    this.d = new Map(); // flag whether the distribution is under a log transform

    this.logFlag = false;
    if (!values) return;
    var initMethods = [this.initPmf.bind(this), this.initSequence.bind(this), this.initMapping.bind(this), this.initFailure.bind(this)];

    for (var _i = 0, _initMethods = initMethods; _i < _initMethods.length; _i++) {
      var method = _initMethods[_i];

      try {
        method(values);
        break;
      } catch (e) {
        continue;
      }
    }

    if (this.d.size > 0) {
      this.normalize();
    }
  }
  /**
   * Initializes with a sequence of equally-likely values.
   * @param {array} values sequence of values
   */


  _createClass(DictWrapper, [{
    key: "initSequence",
    value: function initSequence(values) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;
          this.set(value, 1);
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
    }
    /**
     * Initializes with a map from value to probability.
     * @param {map} values map from value to probability
     */

  }, {
    key: "initMapping",
    value: function initMapping(values) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = values.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              value = _step2$value[0],
              prob = _step2$value[1];

          this.set(value, prob);
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
    }
    /**
     * Initializes with a Pmf.
     * @param {pmf} values Pmf object
     */

  }, {
    key: "initPmf",
    value: function initPmf(values) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = values.items()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              value = _step3$value[0],
              prob = _step3$value[1];

          this.set(value, prob);
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
    }
    /**
     * Throw an error.
     */

  }, {
    key: "initFailure",
    value: function initFailure(values) {
      throw new _utils.ValueError('None of the initialization methods worked.');
    }
  }, {
    key: "values",

    /**
     * Gets an unsorted sequence of values.
     * Note: One source of confusion is that the keys of this
     * dictionary are the values of the Hist/Pmf, and the
     * values of the dictionary are frequencies/probabilities.
     */
    value: function values() {
      return _toConsumableArray(this.d.keys());
    }
    /**
     * Gets an unsorted sequence of (value, freq/prob) pairs.
     */

  }, {
    key: "items",
    value: function items() {
      return _toConsumableArray(this.d);
    }
  }, {
    key: "has",
    value: function has(value) {
      return this.d.has(value);
    }
  }, {
    key: "get",
    value: function get(value) {
      return this.d.get(value);
    }
    /**
     * Sets the freq/prob associated with the value x.
     * @param {any} value number value or case name
     * @param {number} prob number freq or prob
     */

  }, {
    key: "set",
    value: function set(value, prob) {
      return this.d.set(value, prob);
    }
    /**
     * Increments the freq/prob associated with the value x.
     * @param {any} x number value or case name
     * @param {number} term how much to increment by
     */

  }, {
    key: "incr",
    value: function incr(x) {
      var term = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var itemProb = this.d.get(x) || 0;
      this.d.set(x, _math.default.add(itemProb, term));
    }
    /**
     * Scales the freq/prob associated with the value x.
     * @param {any} x number value or case name
     * @param {number} factor how much to multiply by
     */

  }, {
    key: "mult",
    value: function mult(x) {
      var factor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var itemProb = this.d.get(x) || 0;
      this.d.set(x, _math.default.mult(itemProb, factor));
    }
    /**
     * Removes a value.
     * Throws an exception if the value is not there.
     * @param {any} value value to remove
     */

  }, {
    key: "remove",
    value: function remove(value) {
      var result = this.d.delete(value);

      if (!result) {
        throw new ReferenceError("Data deletion failed, because there is no item-key named '".concat(value, "' in the dataset."));
      }

      return result;
    }
    /**
     * Returns the total of the frequencies/probabilities in the map.
     */

  }, {
    key: "total",
    value: function total() {
      return _toConsumableArray(this.d).reduce(function (prev, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            x = _ref2[0],
            p = _ref2[1];

        return _math.default.add(prev, p);
      }, 0);
    }
    /**
     * Returns the largest frequency/probability in the map.
     */

  }, {
    key: "maxLike",
    value: function maxLike() {
      return Math.max.apply(Math, _toConsumableArray(this.d.values()));
    }
    /**
     * Returns a copy.
     * Make a shallow copy of d. If you want a deep copy of d,
     * use one method to deep clone the whole object.
     * @param {string} name string name for the new Hist
     * @returns new object
     */

  }, {
    key: "copy",
    value: function copy(name) {
      var newObj = (0, _utils.shallowClone)(this);
      newObj.d = (0, _utils.shallowClone)(this.d);
      newObj.name = name || this.name;
      return newObj;
    }
    /**
     * Multiplies the values by a factor.
     * @param {number} factor what to multiply by
     * @returns new object
     */

  }, {
    key: "scale",
    value: function scale(factor) {
      var another = this.copy();
      another.d.clear();
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.d.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _step4$value = _slicedToArray(_step4.value, 2),
              val = _step4$value[0],
              prob = _step4$value[1];

          another.set(_math.default.mult(val, factor), prob);
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

      return another;
    }
    /**
     * Log transforms the probabilities.
     * Removes values with probability 0.
     * Normalizes so that the largest logprob is 0.
     * @param {number} m how much to shift the ps before exponentiating
     */

  }, {
    key: "log",
    value: function log(m) {
      if (this.logFlag) throw new _utils.ValueError('Pmf/Hist already under a log transform');
      this.logFlag = true;
      if (!m) m = this.maxLike();
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.d.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _step5$value = _slicedToArray(_step5.value, 2),
              x = _step5$value[0],
              p = _step5$value[1];

          if (p) {
            this.set(x, Math.log(_math.default.div(p, m)));
          } else {
            this.remove(x);
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
    }
    /**
     * Exponentiates the probabilities.
     * If m is un-exist, normalizes so that the largest prob is 1.
     * @param {number} m how much to shift the ps before exponentiating
     */

  }, {
    key: "exp",
    value: function exp(m) {
      if (!this.logFlag) throw new _utils.ValueError('Pmf/Hist not under a log transform');
      if (!m) m = this.maxLike();
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.d.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _step6$value = _slicedToArray(_step6.value, 2),
              x = _step6$value[0],
              p = _step6$value[1];

          this.set(x, Math.exp(_math.default.sub(p, m)));
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
    /**
     * Gets the dictionary.
     */

  }, {
    key: "getDict",
    value: function getDict() {
      return this.d;
    }
    /**
     * Sets the dictionary.
     * @param {map/object} d
     */

  }, {
    key: "setDict",
    value: function setDict(d) {
      var isObject = function isObject(o) {
        return _typeof(o) === 'object';
      };

      var isMap = function isMap(o) {
        return o instanceof Map;
      };

      if (!isObject(d)) throw new TypeError('Value of the data set should be one map or object.');
      this.d = isObject(d) && !isMap(d) ? new Map(Object.entries(d)) : d;
    }
    /**
     * Generates a sequence of points suitable for plotting.
     * @returns array of [sorted value sequence, freq/prob sequence]
     */

  }, {
    key: "render",
    value: function render() {
      return _toConsumableArray(this.d).sort(function (_ref3, _ref4) {
        var _ref5 = _slicedToArray(_ref3, 1),
            a = _ref5[0];

        var _ref6 = _slicedToArray(_ref4, 1),
            b = _ref6[0];

        return _math.default.sub(a, b);
      });
    }
    /**
     * Prints the values and freqs/probs in ascending order.
     * @param indent
     */

  }, {
    key: "print",
    value: function print() {
      (0, _utils.printTable)({
        rows: this.render()
      });
    }
  }, {
    key: "size",
    get: function get() {
      return this.d.size;
    }
  }]);

  return DictWrapper;
}();

exports.default = DictWrapper;
//# sourceMappingURL=index.js.map