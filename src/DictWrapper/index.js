/**
 * An object that contains a dictionary.
 */

import { ValueError, shallowClone, printTable } from '../utils';
import math from '../math';

export default class DictWrapper {
  constructor(values, name) {
    this.name = name;
    this.d = new Map();

    // flag whether the distribution is under a log transform
    this.logFlag = false;

    if (!values) return;

    const initMethods = [
      this.initPmf,
      this.initMapping,
      this.initSequence,
      this.initFailure,
    ];

    for (let method of initMethods) {
      try {
        method(values);
        break;
      } catch (e) {
        continue;
      }
    }

    if (this.d.size > 0) {
      this.normalize();
    }
  }

  /**
   * Initializes with a sequence of equally-likely values.
   * @param {array} values sequence of values
   */
  initSequence(values) {
    for (let value of values) {
      this.set(value, 1);
    }
  }

  /**
   * Initializes with a map from value to probability.
   * @param {map} values map from value to probability
   */
  initMapping(values) {
    for (let [value, prob] of values.entries()) {
      this.set(value, prob);
    }
  }

  /**
   * Initializes with a Pmf.
   * @param {pmf} values Pmf object
   */
  initPmf(values) {
    for (let [value, prob] of values.items()) {
      this.set(value, prob);
    }
  }

  /**
   * Throw an error.
   */
  initFailure(values) {
    throw new ValueError('None of the initialization methods worked.');
  }

  get size() {
    return this.d.size;
  }

  /**
   * Gets an unsorted sequence of values.
   * Note: One source of confusion is that the keys of this
   * dictionary are the values of the Hist/Pmf, and the
   * values of the dictionary are frequencies/probabilities.
   */
  values() {
    return [...this.d.keys()];
  }

  /**
   * Gets an unsorted sequence of (value, freq/prob) pairs.
   */
  items() {
    return [...this.d];
  }

  has(value) {
    return this.d.has(value);
  }

  get(value) {
    return this.d.get(value);
  }

  /**
   * Sets the freq/prob associated with the value x.
   * @param {any} value number value or case name
   * @param {number} prob number freq or prob
   */
  set(value, prob) {
    return this.d.set(value, prob);
  }

  /**
   * Increments the freq/prob associated with the value x.
   * @param {any} x number value or case name
   * @param {number} term how much to increment by
   */
  incr(x, term = 1) {
    const itemProb = this.d.get(x) || 0;
    this.d.set(x, math.add(itemProb, term));
  }

  /**
   * Scales the freq/prob associated with the value x.
   * @param {any} x number value or case name
   * @param {number} factor how much to multiply by
   */
  mult(x, factor = 1) {
    const itemProb = this.d.get(x) || 0;
    this.d.set(x, math.mult(itemProb, factor));
  }

  /**
   * Removes a value.
   * Throws an exception if the value is not there.
   * @param {any} value value to remove
   */
  remove(value) {
    const result = this.d.delete(value);
    if (!result) {
      throw new ReferenceError(
        `Data deletion failed, because there is no item-key named '${value}' in the dataset.`
      );
    }
    return result;
  }

  /**
   * Returns the total of the frequencies/probabilities in the map.
   */
  total() {
    return [...this.d].reduce((prev, [x, p]) => math.add(prev, p), 0);
  }

  /**
   * Returns the largest frequency/probability in the map.
   */
  maxLike() {
    return Math.max(...this.d.values());
  }

  /**
   * Returns a copy.
   * Make a shallow copy of d. If you want a deep copy of d,
   * use one method to deep clone the whole object.
   * @param {string} name string name for the new Hist
   * @returns new object
   */
  copy(name) {
    const newObj = shallowClone(this);
    newObj.d = shallowClone(this.d);
    newObj.name = name || this.name;
    return newObj;
  }

  /**
   * Multiplies the values by a factor.
   * @param {number} factor what to multiply by
   * @returns new object
   */
  scale(factor) {
    const another = this.copy();
    another.d.clear();
    for (let [val, prob] of this.d.entries()) {
      another.set(math.mult(val, factor), prob);
    }
    return another;
  }

  /**
   * Log transforms the probabilities.
   * Removes values with probability 0.
   * Normalizes so that the largest logprob is 0.
   * @param {number} m how much to shift the ps before exponentiating
   */
  log(m) {
    if (this.logFlag)
      throw new ValueError('Pmf/Hist already under a log transform');

    this.logFlag = true;
    if (!m) m = this.maxLike();

    for (let [x, p] of this.d.entries()) {
      if (p) {
        this.set(x, Math.log(math.div(p, m)));
      } else {
        this.remove(x);
      }
    }
  }

  /**
   * Exponentiates the probabilities.
   * If m is un-exist, normalizes so that the largest prob is 1.
   * @param {number} m how much to shift the ps before exponentiating
   */
  exp(m) {
    if (!this.logFlag)
      throw new ValueError('Pmf/Hist not under a log transform');

    if (!m) m = this.maxLike();

    for (let [x, p] of this.d.entries()) {
      this.set(x, Math.exp(math.sub(p, m)));
    }
  }

  /**
   * Gets the dictionary.
   */
  getDict() {
    return this.d;
  }

  /**
   * Sets the dictionary.
   * @param {map/object} d
   */
  setDict(d) {
    const isObject = o => typeof o === 'object';
    const isMap = o => o instanceof Map;

    if (!isObject(d))
      throw new ValueError(
        'Value of the data set should be one map or object.'
      );

    this.d = isObject(d) && !isMap(d) ? new Map(Object.entries(d)) : d;
  }

  /**
   * Generates a sequence of points suitable for plotting.
   * @returns array of [sorted value sequence, freq/prob sequence]
   */
  render() {
    return [...this.d].sort(([a], [b]) => math.sub(a, b));
  }

  /**
   * Prints the values and freqs/probs in ascending order.
   * @param indent
   */
  print(header = ['Value', 'Probability']) {
    printTable({ rows: this.render(), header });
  }
}
