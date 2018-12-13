"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linspace = exports.printTable = exports.bisect = exports.probability2 = exports.probability = exports.odds = exports.newArgsError = exports.logging = exports.isNode = exports.shallowClone = exports.UnimplementedMethodException = exports.ValueError = void 0;

var _math = _interopRequireDefault(require("./math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// ErrorType: ValueError
var ValueError =
/*#__PURE__*/
function (_Error) {
  _inherits(ValueError, _Error);

  function ValueError() {
    _classCallCheck(this, ValueError);

    return _possibleConstructorReturn(this, _getPrototypeOf(ValueError).apply(this, arguments));
  }

  return ValueError;
}(_wrapNativeSuper(Error));
/**
 * ErrorType: UnimplementedMethodException
 * Exception if someone calls a method that should be overridden.
 */


exports.ValueError = ValueError;

var UnimplementedMethodException =
/*#__PURE__*/
function (_Error2) {
  _inherits(UnimplementedMethodException, _Error2);

  function UnimplementedMethodException() {
    _classCallCheck(this, UnimplementedMethodException);

    return _possibleConstructorReturn(this, _getPrototypeOf(UnimplementedMethodException).apply(this, arguments));
  }

  return UnimplementedMethodException;
}(_wrapNativeSuper(Error)); // Create a new object by shallow copying another.


exports.UnimplementedMethodException = UnimplementedMethodException;

var shallowClone = function shallowClone(source) {
  if (!source || _typeof(source) !== 'object') throw new ValueError('Invalid arguments value or type.');
  var targetObj = source.constructor === Array ? [] : {};

  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      targetObj[key] = source[key];
    }
  }

  return targetObj;
}; // Detect if current environment is node.js


exports.shallowClone = shallowClone;
var isNode = new Function("try {\n    return this === global;\n  } catch (e) {\n    return false;\n  }"); // logging utils

exports.isNode = isNode;

var logging = function (lib) {
  var tool = shallowClone(lib);
  return Object.defineProperties(tool, {
    // print method likes `print` in python
    print: {
      value: tool.log,
      writable: false,
      configurable: false
    },
    // warning method for different environment (node.js & browsers)
    warning: {
      value: function value(text) {
        return isNode() ? process.emitWarning(text) : tool.warn("warning: ".concat(text));
      },
      writable: false,
      configurable: false
    }
  });
}(console); // Create an instance of ValueError due to invalid arguments.


exports.logging = logging;

var newArgsError = function newArgsError(desc) {
  return new ValueError("Invalid arguments value or type. ".concat(desc || ''));
};
/**
 * Computes odds for a given probability.
 * Example: p=0.75 means 75 for and 25 against, or 3:1 odds in favor.
 * Note: when p=1, the formula for odds divides by zero, which is
 * normally undefined.  But I think it is reasonable to define Odds(1)
 * to be infinity, so that's what this function does.
 * @param {number} p float 0~1
 * @returns float odds
 */


exports.newArgsError = newArgsError;

var odds = function odds(p) {
  if (!p || p < 0 || p > 1) throw newArgsError('Value of the probability must be a number greater than 0 and less than 1.');
  return p === 1 ? Infinity : _math.default.div(p, _math.default.sub(1, p));
};
/**
 * Computes the probability corresponding to given odds.
 * Example: o=2 means 2:1 odds in favor, or 2/3 probability
 * @param {number} o float odds, strictly positive
 * @returns float probability
 */


exports.odds = odds;

var probability = function probability(o) {
  if (!o || o < 0) throw newArgsError('Value of the odds must be a positive number.');
  return _math.default.div(o, _math.default.add(o, 1));
};
/**
 * Computes the probability corresponding to given odds.
 * Example: yes=2, no=1 means 2:1 odds in favor, or 2/3 probability.
 * @param {number} yes int or float odds in favor
 * @param {number} no int or float odds in favor
 */


exports.probability = probability;

var probability2 = function probability2(yes, no) {
  if (!yes || yes < 0 || !no || no < 0) throw newArgsError('Value of the odds must be a positive number.');
  return _math.default.div(yes, _math.default.add(yes, no));
};
/**
 * Calculate the position where a new element should be
 * inserted in an ordered sequence by using the bisection method.
 * @param {array} xs Given ordered sequence
 * @param {number} x Number to be inserted
 */


exports.probability2 = probability2;

var bisect = function bisect(xs, x, s, e) {
  if (!xs || !Array.isArray(xs)) throw newArgsError('Value of the first argument must be a sorted array of numbers.');
  if (!x) throw newArgsError('Value of the second argument must be a number.');
  var start = s || 0;

  var end = e || _math.default.sub(xs.length, 1); // (-Infinity, start] or [end, Infinity)


  if (x < xs[start]) return start;
  if (x === xs[start]) return _math.default.add(start, 1);
  if (x >= xs[end]) return _math.default.add(end, 1); // (start, end)
  // mid = parseInt(start + (end - start) / 2, 10)

  var mid = parseInt(_math.default.add(start, _math.default.div(_math.default.sub(end, start), 2)), 10);
  if (x === xs[mid]) return _math.default.add(mid, 1);
  return x > xs[mid] ? bisect(xs, x, _math.default.add(mid, 1), end) : bisect(xs, x, start, _math.default.sub(mid, 1));
}; // Print data set as a table


exports.bisect = bisect;

var printTable = function printTable(_ref) {
  var _ref$rows = _ref.rows,
      rows = _ref$rows === void 0 ? [['-', '-']] : _ref$rows,
      _ref$header = _ref.header,
      header = _ref$header === void 0 ? ['Value', 'Prob'] : _ref$header,
      _ref$minColWidth = _ref.minColWidth,
      minColWidth = _ref$minColWidth === void 0 ? 5 : _ref$minColWidth,
      _ref$frameH = _ref.frameH,
      frameH = _ref$frameH === void 0 ? '-' : _ref$frameH,
      _ref$frameV = _ref.frameV,
      frameV = _ref$frameV === void 0 ? '|' : _ref$frameV;
  var colWidth = {};

  var calColumnWidth = function calColumnWidth(cn) {
    if (!colWidth[cn]) {
      colWidth[cn] = Math.max.apply(Math, _toConsumableArray([header].concat(_toConsumableArray(rows)).map(function (row) {
        return String(row[cn]).length + 2;
      })).concat([minColWidth]));
    }

    return colWidth[cn];
  };

  var borderRow = new Array(header.length).fill('borderX');
  var data = frameH ? [header, borderRow].concat(_toConsumableArray(rows)) : [header].concat(_toConsumableArray(rows));
  var lines = data.map(function (r) {
    var line = r.map(function (c, n) {
      var td = c === 'borderX' ? "".concat(frameV).concat(new Array(calColumnWidth(n)).fill(frameH).join('')) : "".concat(frameV, " ").concat(c).concat(new Array(calColumnWidth(n) - String(c).length - 1).fill(' ').join(''));
      return td;
    }).join('');
    return "".concat(line).concat(frameV, "\n");
  });
  var printStr = "\n".concat(lines.join(''), "\n");
  logging.print(printStr);
};
/**
 * Return evenly spaced numbers over a specified interval.
 * Returns num evenly spaced samples, calculated over the interval [start, stop].
 * The endpoint of the interval can optionally be excluded.
 * @param {number} start The starting value of the sequence.
 * @param {number} stop The end value of the sequence.
 * @param {number} num Number of samples to generate.
 * @param {boolean} endPoint If true, stop is the last sample. Otherwise, it is not included.
 * @param {boolean} retStep If true, return [samples, step], where step is the spacing between samples.
 */


exports.printTable = printTable;

var linspace = function linspace(start, stop) {
  var num = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var endPoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var retStep = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // step = (stop - start) / (endPoint ? num - 1 : num)
  var step = _math.default.div(_math.default.sub(stop, start), endPoint ? _math.default.sub(num, 1) : num);

  var arr = [];

  for (var i = start; i <= stop && arr.length < num; i = _math.default.add(i, step)) {
    arr.push(i);
  }

  return retStep ? [arr, step] : arr;
};

exports.linspace = linspace;