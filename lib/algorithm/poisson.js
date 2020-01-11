"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.poissonPmf = void 0;

var _math = _interopRequireDefault(require("../math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Poisson distribution Pmf
 */
var poissonPmf = function poissonPmf(k, lam) {
  return Math.pow(lam, k) * Math.exp(-lam) / _math.default.factorial(k);
};

exports.poissonPmf = poissonPmf;
//# sourceMappingURL=poisson.js.map