"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.probability2 = exports.probability = exports.odds = void 0;

var _utils = require("../utils");

var _math = _interopRequireDefault(require("../math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Computes odds for a given probability.
 * Example: p=0.75 means 75 for and 25 against, or 3:1 odds in favor.
 * Note: when p=1, the formula for odds divides by zero, which is
 * normally undefined.  But I think it is reasonable to define Odds(1)
 * to be infinity, so that's what this function does.
 * @param {number} p float 0~1
 * @returns float odds
 */
var odds = function odds(p) {
  if (!p || p < 0 || p > 1) throw (0, _utils.newArgsError)('Value of the probability must be a number greater than 0 and less than 1.');
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
  if (!o || o < 0) throw (0, _utils.newArgsError)('Value of the odds must be a positive number.');
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
  if (!yes || yes < 0 || !no || no < 0) throw (0, _utils.newArgsError)('Value of the odds must be a positive number.');
  return _math.default.div(yes, _math.default.add(yes, no));
};

exports.probability2 = probability2;