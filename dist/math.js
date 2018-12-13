"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.div = exports.mult = exports.sub = exports.add = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Make a factor for float point numbers becoming to integer
var factor = function factor(l, r) {
  var tails = [l, r].map(function (x) {
    return (String(x).split('.')[1] || '').length;
  });
  return Math.pow(10, Math.max.apply(Math, _toConsumableArray(tails)));
}; // Make items for calculate


var items = function items(a, b) {
  var f = factor(a, b);

  var _map = [a, b].map(function (x) {
    return parseInt(x * f);
  }),
      _map2 = _slicedToArray(_map, 2),
      l = _map2[0],
      r = _map2[1];

  return {
    l: l,
    r: r,
    f: f
  };
}; // Add: a + b


var add = function add(a, b) {
  var _items = items(a, b),
      l = _items.l,
      r = _items.r,
      f = _items.f;

  return (l + r) / f;
}; // Subtract: a - b


exports.add = add;

var sub = function sub(a, b) {
  var _items2 = items(a, b),
      l = _items2.l,
      r = _items2.r,
      f = _items2.f;

  return (l - r) / f;
}; // Multiply: a * b


exports.sub = sub;

var mult = function mult(a, b) {
  var _items3 = items(a, b),
      l = _items3.l,
      r = _items3.r,
      f = _items3.f;

  return l * r / (f * f);
}; // Divide: a / b


exports.mult = mult;

var div = function div(a, b) {
  var _items4 = items(a, b),
      l = _items4.l,
      r = _items4.r;

  return l / r;
};

exports.div = div;
var _default = {
  add: add,
  sub: sub,
  mult: mult,
  div: div
};
exports.default = _default;