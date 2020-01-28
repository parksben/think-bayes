"use strict";

require("core-js/modules/es.parse-int");

require("core-js/modules/es.string.sub");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bisect = void 0;

var _math = _interopRequireDefault(require("../math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calculate the position where a new element should be
 * inserted in an ordered sequence by using the bisection method.
 * @param {array} xs Given ordered sequence
 * @param {number} x Number to be inserted
 */
var bisect = function bisect(xs, x, s, e) {
  if (!xs || !Array.isArray(xs)) throw new TypeError('Value of the first argument must be a sorted array of numbers.');
  if (!x) throw new TypeError('Value of the second argument must be a number.');
  var start = s || 0;

  var end = e || _math.default.sub(xs.length, 1); // (-Infinity, start] or [end, Infinity)


  if (x < xs[start]) return start;
  if (x === xs[start]) return _math.default.add(start, 1);
  if (x >= xs[end]) return _math.default.add(end, 1); // (start, end)
  // mid = parseInt(start + (end - start) / 2, 10)

  var mid = parseInt(_math.default.add(start, _math.default.div(_math.default.sub(end, start), 2)), 10);
  if (x === xs[mid]) return _math.default.add(mid, 1);
  return x > xs[mid] ? bisect(xs, x, _math.default.add(mid, 1), end) : bisect(xs, x, start, _math.default.sub(mid, 1));
};

exports.bisect = bisect;
//# sourceMappingURL=bisect.js.map