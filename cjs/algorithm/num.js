"use strict";

require("core-js/modules/es.string.sub");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linspace = void 0;

var _math = _interopRequireDefault(require("../math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//# sourceMappingURL=num.js.map