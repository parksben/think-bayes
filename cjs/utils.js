"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.fill");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.map");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printTable = exports.logging = exports.isNode = exports.shallowClone = exports.UnimplementedMethodException = exports.ValueError = void 0;

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
  if (!source || _typeof(source) !== 'object') throw new TypeError('Invalid arguments value or type.');
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
}(console); // Print data set as a table


exports.logging = logging;

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

exports.printTable = printTable;
//# sourceMappingURL=utils.js.map