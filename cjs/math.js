"use strict";

require("core-js/modules/es.string.sub");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.factorial = exports.compare = exports.div = exports.mult = exports.sub = exports.add = void 0;

var _decimal = require("decimal.js");

// Add: a + b
var add = function add(a, b) {
  return _decimal.Decimal.add(a, b).toNumber();
}; // Subtract: a - b


exports.add = add;

var sub = function sub(a, b) {
  return _decimal.Decimal.sub(a, b).toNumber();
}; // Multiply: a * b


exports.sub = sub;

var mult = function mult(a, b) {
  return _decimal.Decimal.mul(a, b).toNumber();
}; // Divide: a / b


exports.mult = mult;

var div = function div(a, b) {
  return _decimal.Decimal.div(a, b).toNumber();
}; // Compare function


exports.div = div;

var compare = function compare(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return sub(a, b);
  }

  return a - b;
}; // Factorial: n!


exports.compare = compare;

var factorial = function factorial(n) {
  var res = 1;

  for (var i = 0; i < n; i++) {
    res *= i + 1;
  }

  return res;
};

exports.factorial = factorial;
var _default = {
  add: add,
  sub: sub,
  mult: mult,
  div: div,
  compare: compare,
  factorial: factorial
};
exports.default = _default;
//# sourceMappingURL=math.js.map