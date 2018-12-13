"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCdfFromPmf = exports.makeCdfFromList = exports.makeCdfFromHist = exports.makeCdfFromDict = exports.makeCdfFromItems = exports.makeUniformPmf = exports.makeMixture = exports.makePmfFromCdf = exports.makePmfFromHist = exports.makePmfFromItems = exports.makePmfFromDict = exports.makePmfFromList = exports.makeHistFromDict = exports.makeHistFromList = exports.makeJoint = void 0;

var _Cdf = _interopRequireDefault(require("./Cdf"));

var _Joint = _interopRequireDefault(require("./Joint"));

var _Hist = _interopRequireDefault(require("./Hist"));

var _Pmf = _interopRequireDefault(require("./Pmf"));

var _utils = require("./utils");

var _math = _interopRequireDefault(require("./math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Joint distribution of values from pmf1 and pmf2.
 * @param {pmf} pmf1 Pmf object
 * @param {pmf} pmf2 Pmf object
 * @returns Joint pmf of value pairs
 */
var makeJoint = function makeJoint(pmf1, pmf2) {
  var joint = new _Joint.default();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = pmf1.items()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          v1 = _step$value[0],
          p1 = _step$value[1];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = pmf2.items()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              v2 = _step2$value[0],
              p2 = _step2$value[1];

          joint.set([v1, v2], p1 * p2);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return joint;
};
/**
 * Makes a histogram from an unsorted sequence of values.
 * @param {array} t sequence of numbers
 * @param {string} name string name for this histogram
 * @returns Hist object
 */


exports.makeJoint = makeJoint;

var makeHistFromList = function makeHistFromList(t, name) {
  var hist = new _Hist.default(null, name);
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = t[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var x = _step3.value;
      hist.incr(x);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return hist;
};
/**
 * Makes a histogram from a map from values to frequencies.
 * @param {object/map} d dictionary that maps values to frequencies
 * @param {string} name string name for this histogram
 * @returns Hist object
 */


exports.makeHistFromList = makeHistFromList;

var makeHistFromDict = function makeHistFromDict(d, name) {
  return new _Hist.default(d, name);
};
/**
 * Makes a PMF from an unsorted sequence of values.
 * @param {array} t sequence of numbers
 * @param {string} name string name for this PMF
 * @returns Pmf object
 */


exports.makeHistFromDict = makeHistFromDict;

var makePmfFromList = function makePmfFromList(t, name) {
  var hist = makeHistFromList(t);
  var d = hist.getDict();
  var pmf = new _Pmf.default(d, name);
  pmf.normalize();
  return pmf;
};
/**
 * Makes a PMF from a map from values to probabilities.
 * @param {object/map} d dictionary that maps values to probabilities
 * @param {string} name string name for this PMF
 * * @returns Pmf object
 */


exports.makePmfFromList = makePmfFromList;

var makePmfFromDict = function makePmfFromDict(d, name) {
  var pmf = new _Pmf.default(d, name);
  pmf.normalize();
  return pmf;
};
/**
 * Makes a PMF from a sequence of value-probability pairs
 * @param {array} t sequence of value-probability pairs
 * @param {string} name string name for this PMF
 * * @returns Pmf object
 */


exports.makePmfFromDict = makePmfFromDict;

var makePmfFromItems = function makePmfFromItems(t, name) {
  var pmf = new _Pmf.default(new Map(t), name);
  pmf.normalize();
  return pmf;
};
/**
 * Makes a normalized PMF from a Hist object.
 * @param {hist} hist Hist object
 * @param {string} name string name
 * @returns Pmf object
 */


exports.makePmfFromItems = makePmfFromItems;

var makePmfFromHist = function makePmfFromHist(hist, name) {
  // make a copy of the dictionary
  var d = new Map(hist.getDict());
  var pmf = (0, _Pmf.default)(d, name || hist.name);
  pmf.normalize();
  return pmf;
};
/**
 * Makes a normalized Pmf from a Cdf object.
 * @param {cdf} cdf Cdf object
 * @param {string} name string name for the new Pmf
 * @returns Pmf object
 */


exports.makePmfFromHist = makePmfFromHist;

var makePmfFromCdf = function makePmfFromCdf(cdf, name) {
  var pmf = new _Pmf.default(null, name || cdf.name);
  var prev = 0;
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = cdf.items()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _step4$value = _slicedToArray(_step4.value, 2),
          val = _step4$value[0],
          prob = _step4$value[1];

      pmf.incr(val, _math.default.sub(prob, prev));
      prev = prob;
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return pmf;
};
/**
 * Make a mixture distribution.
 * @param {pmf} metapmf Pmf that maps from Pmfs to probs.
 * @param {string} name string name for the new Pmf
 * @returns Pmf object
 */


exports.makePmfFromCdf = makePmfFromCdf;

var makeMixture = function makeMixture(metapmf) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'mix';
  var mix = new _Pmf.default(null, name);
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = metapmf.items()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var _step5$value = _slicedToArray(_step5.value, 2),
          pmf = _step5$value[0],
          p1 = _step5$value[1];

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = pmf.items()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _step6$value = _slicedToArray(_step6.value, 2),
              x = _step6$value[0],
              p2 = _step6$value[1];

          mix.incr(x, p1 * p2);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return mix;
};
/**
 * Make a uniform Pmf.
 * @param {number} low lowest value (inclusive)
 * @param {number} high highest value (inclusize)
 * @param {number} n number of values
 */


exports.makeMixture = makeMixture;

var makeUniformPmf = function makeUniformPmf(low, high, n) {
  var pmf = new _Pmf.default();
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = (0, _utils.linspace)(low, high, n)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var x = _step7.value;
      pmf.set(x, 1);
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  pmf.normalize();
  return pmf;
};
/**
 * Makes a cdf from an unsorted sequence of (value, frequency) pairs.
 * @param {array} items unsorted sequence of (value, frequency) pairs
 * @param {string} name string name for this CDF
 * @returns cdf: list of (value, fraction) pairs
 */


exports.makeUniformPmf = makeUniformPmf;

var makeCdfFromItems = function makeCdfFromItems(items) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var runSum = 0;
  var xs = [];
  var cs = [];
  var sortedItems = items.sort(function (_ref, _ref2) {
    var _ref3 = _slicedToArray(_ref, 1),
        a = _ref3[0];

    var _ref4 = _slicedToArray(_ref2, 1),
        b = _ref4[0];

    return _math.default.sub(a, b);
  });
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = sortedItems[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var _step8$value = _slicedToArray(_step8.value, 2),
          val = _step8$value[0],
          count = _step8$value[1];

      runSum = _math.default.add(runSum, count);
      xs.push(value);
      cs.push(runSum);
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
        _iterator8.return();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  var ps = cs.map(function (c) {
    return c / runSum;
  });
  var cdf = new _Cdf.default(xs, ps, name);
  return cdf;
};
/**
 * Makes a CDF from a dictionary that maps values to frequencies.
 * @param {object/mapt} d dictionary that maps values to frequencies.
 * @param {string} name string name for the data.
 * @returns Cdf object
 */


exports.makeCdfFromItems = makeCdfFromItems;

var makeCdfFromDict = function makeCdfFromDict(d, name) {
  return makeCdfFromItems(d.items(), name);
};
/**
 * Makes a CDF from a Hist object.
 * @param {hist} hist Hist object
 * @param {string} name string name for the data.
 * @returns Cdf object
 */


exports.makeCdfFromDict = makeCdfFromDict;

var makeCdfFromHist = function makeCdfFromHist(hist, name) {
  return makeCdfFromItems(hist.items(), name);
};
/**
 * Creates a CDF from an unsorted sequence.
 * @param {array} seq unsorted sequence of sortable values
 * @param {string} name string name for the cdf
 * @returns Cdf object
 */


exports.makeCdfFromHist = makeCdfFromHist;

var makeCdfFromList = function makeCdfFromList(seq, name) {
  var hist = makeHistFromList(seq);
  return makeCdfFromHist(hist, name);
};
/**
 * Makes a CDF from a Pmf object.
 * @param {pmf} pmf Pmf object
 * @param {string} name string name for the data.
 * @returns Cdf object
 */


exports.makeCdfFromList = makeCdfFromList;

var makeCdfFromPmf = function makeCdfFromPmf(pmf, name) {
  return makeCdfFromItems(pmf.items(), name || pmf.name);
};

exports.makeCdfFromPmf = makeCdfFromPmf;