import Cdf from './Cdf';
import Pmf from './Pmf';
import Joint from './Joint';
import Hist from './Hist';
import Suite from './Suite';
import { linspace } from './algorithm/num';
import math from './math';

/**
 * Joint distribution of values from pmf1 and pmf2.
 * @param {pmf} pmf1 Pmf object
 * @param {pmf} pmf2 Pmf object
 * @returns Joint pmf of value pairs
 */
export const makeJoint = (pmf1, pmf2) => {
  const joint = new Joint();
  for (let [v1, p1] of pmf1.items()) {
    for (let [v2, p2] of pmf2.items()) {
      joint.set([v1, v2], p1 * p2);
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
export const makeHistFromList = (t, name) => {
  const hist = new Hist(null, name);
  for (let x of t) {
    hist.incr(x);
  }
  return hist;
};

/**
 * Makes a histogram from a map from values to frequencies.
 * @param {object|map} d dictionary that maps values to frequencies
 * @param {string} name string name for this histogram
 * @returns Hist object
 */
export const makeHistFromDict = (d, name) => {
  return new Hist(d, name);
};

/**
 * Makes a PMF from an unsorted sequence of values.
 * @param {array} t sequence of numbers
 * @param {string} name string name for this PMF
 * @returns Pmf object
 */
export const makePmfFromList = (t, name) => {
  const hist = makeHistFromList(t);
  const d = hist.getDict();
  const pmf = new Pmf(d, name);
  pmf.normalize();
  return pmf;
};

/**
 * Makes a PMF from a map from values to probabilities.
 * @param {object|map} d dictionary that maps values to probabilities
 * @param {string} name string name for this PMF
 * * @returns Pmf object
 */
export const makePmfFromDict = (d, name) => {
  const pmf = new Pmf(d, name);
  pmf.normalize();
  return pmf;
};

/**
 * Makes a PMF from a sequence of value-probability pairs
 * @param {array} t sequence of value-probability pairs
 * @param {string} name string name for this PMF
 * * @returns Pmf object
 */
export const makePmfFromItems = (t, name) => {
  const pmf = new Pmf(new Map(t), name);
  pmf.normalize();
  return pmf;
};

/**
 * Makes a normalized PMF from a Hist object.
 * @param {hist} hist Hist object
 * @param {string} name string name
 * @returns Pmf object
 */
export const makePmfFromHist = (hist, name) => {
  // make a copy of the dictionary
  const d = new Map(hist.getDict());
  const pmf = Pmf(d, name || hist.name);
  pmf.normalize();
  return pmf;
};

/**
 * Makes a normalized Pmf from a Cdf object.
 * @param {cdf} cdf Cdf object
 * @param {string} name string name for the new Pmf
 * @returns Pmf object
 */
export const makePmfFromCdf = (cdf, name) => {
  const pmf = new Pmf(null, name || cdf.name);
  let prev = 0;
  for (let [val, prob] of cdf.items()) {
    pmf.incr(val, math.sub(prob, prev));
    prev = prob;
  }
  return pmf;
};

/**
 * Make a mixture distribution.
 * @param {pmf} metapmf Pmf that maps from Pmfs to probs.
 * @param {string} name string name for the new Pmf
 * @returns Pmf object
 */
export const makeMixture = (metapmf, name = 'mix') => {
  const mix = new Pmf(null, name);
  for (let [pmf, p1] of metapmf.items()) {
    for (let [x, p2] of pmf.items()) {
      mix.incr(x, p1 * p2);
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
export const makeUniformPmf = (low, high, n) => {
  const pmf = new Pmf();
  for (let x of linspace(low, high, n)) {
    pmf.set(x, 1);
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
export const makeCdfFromItems = (items, name = '') => {
  let runSum = 0;
  const xs = [];
  const cs = [];
  const sortedItems = items.sort(([a], [b]) => math.compare(a, b));

  for (let [val, count] of sortedItems) {
    runSum = math.add(runSum, count);
    xs.push(value);
    cs.push(runSum);
  }

  const ps = cs.map(c => c / runSum);
  const cdf = new Cdf(xs, ps, name);

  return cdf;
};

/**
 * Makes a CDF from a dictionary that maps values to frequencies.
 * @param {object|map} d dictionary that maps values to frequencies.
 * @param {string} name string name for the data.
 * @returns Cdf object
 */
export const makeCdfFromDict = (d, name) => makeCdfFromItems(d.items(), name);

/**
 * Makes a CDF from a Hist object.
 * @param {hist} hist Hist object
 * @param {string} name string name for the data.
 * @returns Cdf object
 */
export const makeCdfFromHist = (hist, name) =>
  makeCdfFromItems(hist.items(), name);

/**
 * Creates a CDF from an unsorted sequence.
 * @param {array} seq unsorted sequence of sortable values
 * @param {string} name string name for the cdf
 * @returns Cdf object
 */
export const makeCdfFromList = (seq, name) => {
  const hist = makeHistFromList(seq);
  return makeCdfFromHist(hist, name);
};

/**
 * Makes a CDF from a Pmf object.
 * @param {pmf} pmf Pmf object
 * @param {string} name string name for the data.
 * @returns Cdf object
 */
export const makeCdfFromPmf = (pmf, name) =>
  makeCdfFromItems(pmf.items(), name || pmf.name);

/**
 * Makes a suite from a map from values to probabilities.
 * @param {object|map} d dictionary that maps values to probabilities
 * @param {string} name string name for this suite
 * @returns Suite object
 */
export const makeSuiteFromDict = (d, name) => {
  const suite = new Suite(null, name);
  suite.setDict(d);
  suite.normalize();
  return suite;
};

/**
 * Makes a suite from an unsorted sequence of values.
 * @param {array} t sequence of numbers
 * @param {string} name string name for this suite
 */
export const makeSuiteFromList = (t, name) => {
  const hist = makeHistFromList(t);
  const d = hist.getDict();
  return makeSuiteFromDict(d, name);
};

/**
 * Makes a normalized suite from a Hist object.
 * @param {hist} hist Hist object
 * @param {string} name string name
 */
export const makeSuiteFromHist = (hist, name) => {
  const d = new Map(hist.getDict());
  return makeSuiteFromDict(d, name || hist.name);
};

/**
 * Makes a normalized Suite from a Cdf object.
 * @param {cdf} cdf Cdf object
 * @param {string} name string name for the new Suite
 * @returns Suite object
 */
export const makeSuiteFromCdf = (cdf, name) => {
  const suite = new Suite(null, name || cdf.name);

  let prev = 0;
  for (let [val, prob] of cdf.items()) {
    suite.incr(val, math.sub(prob, prev));
    prev = prob;
  }

  return suite;
};

export default {
  makeJoint,
  makeHistFromList,
  makeHistFromDict,
  makePmfFromList,
  makePmfFromDict,
  makePmfFromItems,
  makePmfFromHist,
  makePmfFromCdf,
  makeMixture,
  makeUniformPmf,
  makeCdfFromItems,
  makeCdfFromDict,
  makeCdfFromHist,
  makeCdfFromList,
  makeCdfFromPmf,
  makeSuiteFromDict,
  makeSuiteFromList,
  makeSuiteFromHist,
  makeSuiteFromCdf,
};
