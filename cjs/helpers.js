"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.fill");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.sub");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evalPoissonPmf = exports.evalBinomialPmf = exports.makeGaussianPdf = exports.evalGaussianPdf = exports.sampleSum = exports.randomSum = exports.pmfProbEqual = exports.pmfProbGreater = exports.pmfProbLess = exports.credibleInterval = exports.percentile = exports.probability2 = exports.probability = exports.odds = void 0;

var _utils = require("./utils");

var _math = _interopRequireDefault(require("./math"));

var _convertors = require("./convertors");

var _Pmf = _interopRequireDefault(require("./Pmf"));

var _num = require("./algorithm/num");

var _normal = require("./algorithm/normal");

var _binomial = require("./algorithm/binomial");

var _poisson = require("./algorithm/poisson");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Computes odds for a given probability.
 * **Example:** p=0.75 means 75 for and 25 against, or 3:1 odds in favor.
 * **Note:** when p=1, the formula for odds divides by zero, which is
 * normally undefined.  But I think it is reasonable to define Odds(1)
 * to be infinity, so that's what this function does.
 * @param {number} p float 0~1
 * @returns float odds
 */
var odds = function odds(p) {
  if (!p || p < 0 || p > 1) throw new RangeError('Value of the probability must be a number greater than 0 and less than 1.');
  return p === 1 ? Infinity : _math.default.div(p, _math.default.sub(1, p));
};
/**
 * Computes the probability corresponding to given odds.
 * **Example:** o=2 means 2:1 odds in favor, or 2/3 probability
 * @param {number} o float odds, strictly positive
 * @returns float probability
 */


exports.odds = odds;

var probability = function probability(o) {
  if (!o || o < 0) throw new RangeError('Value of the odds must be a positive number.');
  return _math.default.div(o, _math.default.add(o, 1));
};
/**
 * Computes the probability corresponding to given odds.
 * **Example:** yes=2, no=1 means 2:1 odds in favor, or 2/3 probability.
 * @param {number} yes int or float odds in favor
 * @param {number} no int or float odds in favor
 */


exports.probability = probability;

var probability2 = function probability2(yes, no) {
  if (!yes || yes < 0 || !no || no < 0) throw new RangeError('Value of the odds must be a positive number.');
  return _math.default.div(yes, _math.default.add(yes, no));
};
/**
 * Computes a percentile of a given Pmf.
 * @param {pmf} pmf
 * @param {number} percentage float 0-100
 */


exports.probability2 = probability2;

var percentile = function percentile(pmf, percentage) {
  if (p < 0 || p > 100) throw new RangeError('Value of the probability must be a number greater than 0 and less than 1.');
  var p = percentage / 100;
  var total = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = pmf.items()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          val = _step$value[0],
          prob = _step$value[1];

      total = _math.default.add(total, prob);
      if (total > p) return val;
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

  throw new _utils.ValueError("Value not found in pmf for percentage: `".concat(percentage, "`, which means the total probability of pmf is less than ").concat(percentage / 100, "."));
};
/**
 * Computes a credible interval for a given distribution.
 * If percentage=90, computes the 90% CI.
 * @param {pmf} pmf Pmf object representing a posterior distribution
 * @param {number} percentage float between 0 and 100
 * @returns sequence of two floats, low and high
 */


exports.percentile = percentile;

var credibleInterval = function credibleInterval(pmf) {
  var percentage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 90;
  var cdf = pmf.makeCdf(); // prob = (1 - percentage / 100.0) / 2

  var prob = _math.default.div(_math.default.sub(1, _math.default.div(percentage, 100)), 2);

  var interval = [cdf.value(prob), cdf.value(_math.default.sub(1, prob))];
  return interval;
};
/**
 * Probability that a value from pmf1 is less than a value from pmf2.
 * @param {pmf} pmf1 Pmf object
 * @param {pmf} pmf2 Pmf object
 * @returns float probability
 */


exports.credibleInterval = credibleInterval;

var pmfProbLess = function pmfProbLess(pmf1, pmf2) {
  var total = 0;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = pmf1.items()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _slicedToArray(_step2.value, 2),
          v1 = _step2$value[0],
          p1 = _step2$value[1];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = pmf2.items()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              v2 = _step3$value[0],
              p2 = _step3$value[1];

          if (v1 < v2) total = _math.default.add(total, _math.default.mult(p1, p2));
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

  return total;
};
/**
 * Probability that a value from pmf1 is greater than a value from pmf2.
 * @param {pmf} pmf1 Pmf object
 * @param {pmf} pmf2 Pmf object
 * @returns float probability
 */


exports.pmfProbLess = pmfProbLess;

var pmfProbGreater = function pmfProbGreater(pmf1, pmf2) {
  var total = 0;
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = pmf1.items()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _step4$value = _slicedToArray(_step4.value, 2),
          v1 = _step4$value[0],
          p1 = _step4$value[1];

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = pmf2.items()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _step5$value = _slicedToArray(_step5.value, 2),
              v2 = _step5$value[0],
              p2 = _step5$value[1];

          if (v1 > v2) total = _math.default.add(total, _math.default.mult(p1, p2));
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

  return total;
};
/**
 * Probability that a value from pmf1 equals a value from pmf2.
 * @param {pmf} pmf1 Pmf object
 * @param {pmf} pmf2 Pmf object
 * @returns float probability
 */


exports.pmfProbGreater = pmfProbGreater;

var pmfProbEqual = function pmfProbEqual(pmf1, pmf2) {
  var total = 0;
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = pmf1.items()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var _step6$value = _slicedToArray(_step6.value, 2),
          v1 = _step6$value[0],
          p1 = _step6$value[1];

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = pmf2.items()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _step7$value = _slicedToArray(_step7.value, 2),
              v2 = _step7$value[0],
              p2 = _step7$value[1];

          if (v1 === v2) total = _math.default.add(total, _math.default.mult(p1, p2));
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

  return total;
};
/**
 * Chooses a random value from each dist and returns the sum.
 * @param {array} dists sequence of Pmf or Cdf objects
 * @returns numerical sum
 */


exports.pmfProbEqual = pmfProbEqual;

var randomSum = function randomSum(dists) {
  var total = dists.reduce(function (prev, curr) {
    return _math.default.add(prev, curr.random());
  }, 0);
  return total;
};
/**
 * Draws a sample of sums from a list of distributions.
 * @param {array} dists sequence of Pmf or Cdf objects
 * @param {number} n sample size
 * @returns new Pmf of sums
 */


exports.randomSum = randomSum;

var sampleSum = function sampleSum(dists, n) {
  var list = new Array(n).fill(0).map(function () {
    return randomSum(dists);
  });
  var pmf = (0, _convertors.makePmfFromList)(list);
  return pmf;
};
/**
 * Computes the unnormalized PDF of the normal distribution.
 * @param {number} x value
 * @param {number} mu mean
 * @param {number} sigma standard deviation
 * @returns float probability density
 */


exports.sampleSum = sampleSum;

var evalGaussianPdf = function evalGaussianPdf(x, mu, sigma) {
  return (0, _normal.normalPdf)(x, mu, sigma);
};
/**
 * Makes a PMF discrete approx to a Gaussian distribution.
 * @param {number} mu float mean
 * @param {number} sigma float standard deviation
 * @param {number} numSigmas how many sigmas to extend in each direction
 * @param {number} n number of values in the Pmf
 * @returns normalized Pmf
 */


exports.evalGaussianPdf = evalGaussianPdf;

var makeGaussianPdf = function makeGaussianPdf(mu, sigma, numSigmas) {
  var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 201;
  var pmf = new _Pmf.default(); // low = mu - numSigmas * sigma;

  var low = _math.default.sub(mu, _math.default.mult(numSigmas, sigma)); // high = mu + numSigmas * sigma;


  var high = _math.default.add(mu, _math.default.mult(numSigmas, sigma));

  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = (0, _num.linspace)(low, high, n)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var x = _step8.value;
      var p = evalGaussianPdf(x, mu, sigma);
      pmf.set(x, p);
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

  pmf.normalize();
  return pmf;
};
/**
 * Evaluates the binomial pmf.
 * @returns the probabily of k successes in n trials with probability p.
 */


exports.makeGaussianPdf = makeGaussianPdf;

var evalBinomialPmf = function evalBinomialPmf(k, n, p) {
  return (0, _binomial.binomialPmf)(k, n, p);
};
/**
 * Computes the Poisson PMF.
 * @param {number} k number of events
 * @param {number} lam parameter lambda in events per unit time
 * @returns float probability
 */


exports.evalBinomialPmf = evalBinomialPmf;

var evalPoissonPmf = function evalPoissonPmf(k, lam) {
  return (0, _poisson.poissonPmf)(k, lam);
};

exports.evalPoissonPmf = evalPoissonPmf;
//# sourceMappingURL=helpers.js.map