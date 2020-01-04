"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binomialPmf = exports.choose = void 0;

var _math = _interopRequireDefault(require("../math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Pick out k items from n items, k<=n
 * @returns Combination number
 */
var choose = function choose(n, k) {
  if (k < 0 || k > n) return 0;
  if (k > n - k) k = n - k;
  var res = 1;

  for (var i = 0; i < k; i++) {
    res *= (n - k + i + 1) / (i + 1);
  }

  return Math.round(res);
};
/**
 * Binomial distribution Pmf
 */


exports.choose = choose;

var binomialPmf = function binomialPmf(k, n, p) {
  return _math.default.mult(choose(n, k) * Math.pow(p, k), Math.pow(_math.default.sub(1, p), n - k));
};

exports.binomialPmf = binomialPmf;