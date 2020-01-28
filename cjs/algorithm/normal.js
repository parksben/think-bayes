"use strict";

require("core-js/modules/es.string.sub");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalPdf = void 0;

var _math = _interopRequireDefault(require("../math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Normal distribution Pdf
 */
var normalPdf = function normalPdf(x, mu, sigma) {
  var factor = 1 / (sigma * Math.sqrt(2 * Math.PI));
  return factor * Math.exp(_math.default.div(-1 * Math.pow(_math.default.sub(x, mu), 2), 2 * Math.pow(sigma, 2)));
};

exports.normalPdf = normalPdf;
//# sourceMappingURL=normal.js.map