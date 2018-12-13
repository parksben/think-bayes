/**
 * Represents a cumulative distribution function.
 * @param {array} xs sequence of values
 * @param {array} ps sequence of probabilities
 * @param {string} name string used as a graph label
 */

import DictWrapper from '../DictWrapper';
import { makePmfFromCdf } from '../convertors';
import math from '../math';
import { bisect, ValueError, UnimplementedMethodException } from '../utils';

export class Cdf extends DictWrapper {
  constructor(xs, ps, name) {
    super(null, name);
    this.xs = xs || [];
    this.ps = ps || [];
  }

  /**
   * Represents a cumulative distribution function.
   * @param {string} name string name for the new Cdf
   */
  copy(name) {
    return new Cdf(this.xs, this.ps, name || this.name);
  }

  /**
   * Makes a Pmf.
   */
  makePmf(name) {
    return makePmfFromCdf(this, name);
  }

  /**
   * Returns a sorted list of values.
   */
  values() {
    return this.xs;
  }

  /**
   * Returns a sorted sequence of (value, probability) pairs.
   */
  items() {
    return this.xs.map((x, i) => [x, this.ps[i]]);
  }

  /**
   * Add an (x, p) pair to the end of this CDF.
   * Note: this us normally used to build a CDF from scratch, not
   * to modify existing CDFs.  It is up to the caller to make sure
   * that the result is a legal CDF.
   */
  append(x, p) {
    this.xs.push(x);
    this.ps.push(p);
  }

  /**
   * Adds a term to the xs.
   * @param {number} term how much to add
   */
  shift(term) {
    const another = this.copy();
    another.xs = this.xs.map(x => math.add(x, term || 0));
    return another;
  }

  /**
   * Multiplies the xs by a factor.
   * @param {*} factor what to multiply by
   */
  scale(factor) {
    const another = this.copy();
    another.xs = this.xs.map(x => math.mult(x, factor || 1));
    return another;
  }

  /**
   * Returns CDF(x), the probability that corresponds to value x.
   * @param {number} x number
   * @returns float probability
   */
  prob(x) {
    if (!x || x < this.xs[0]) return 0.0;
    const index = bisect(this.xs, x);
    const p = this.ps[math.sub(index, 1)];
    return p;
  }

  /**
   * Returns InverseCDF(p), the value that corresponds to probability p.
   * @param {number} p number in the range [0, 1]
   * @returns number value
   */
  value(p) {
    if (!p || p < 0 || p > 1)
      throw new ValueError('Probability p must be in range [0, 1]');
    if (p === 0) return this.xs[0];
    if (p === 1) return this.xs[math.sub(this.xs.length, 1)];

    const index = bisect(this.ps, p);
    if (p === this.ps[math.sub(index, 1)]) {
      return this.xs[math.sub(index, 1)];
    }
    return this.xs[index];
  }

  /**
   * Returns the value that corresponds to percentile p.
   * @param {number} p number in the range [0, 100]
   * @returns number value
   */
  percentile(p) {
    return this.value(math.div(p / 100));
  }

  /**
   * Chooses a random value from this distribution.
   */
  random() {
    return this.value(Math.random());
  }

  /**
   * Generates a random sample from this distribution.
   * @param {number} n int length of the sample
   */
  sample(n) {
    return new Array(n).fill(0).map(() => this.random());
  }

  /**
   * Computes the mean of a CDF.
   * @returns float mean
   */
  mean() {
    let oldProb = 0;
    let total = 0;

    const items = this.xs.map((x, i) => [x, this.ps[i]]);
    for (let [x, p] of items) {
      // total += (p - oldProb) * x
      total = math.add(total, math.mult(math.sub(p, oldProb), x));
      oldProb = p;
    }
    return total;
  }

  /**
   * Computes the central credible interval.
   * If percentage=90, computes the 90% CI.
   * @param {number} percentage float between 0 and 100
   * @returns sequence of two floats, low and high
   */
  credibleInterval(percentage = 90) {
    // prob = (1 - percentage / 100.0) / 2
    const prob = math.div(math.sub(1, math.div(percentage, 100)), 2);
    const interval = [this.value(prob), this.value(math.sub(1, prob))];
    return interval;
  }

  /**
   * An entry is added to the cdf only if the percentile differs
   * from the previous value in a significant digit, where the number
   * of significant digits is determined by multiplier.
   * The default is 1000, which keeps log10(1000) = 3 significant digits.
   * @param {number} multiplier
   */
  _round(multiplier = 1000) {
    // TODO: write this method
    throw new UnimplementedMethodException(
      'This method has not been implemented by the author for the time being. Please pay attention to the changelog of this project.'
    );
  }

  /**
   * Generates a sequence of points suitable for plotting.
   * An empirical CDF is a step function; linear interpolation can be misleading.
   */
  render() {
    const xs = [this.xs[0]];
    const ps = [0];
    for (let [i, p] of this.ps) {
      xs.push(this.xs[i]);
      ps.push(p);
      if (this.xs[math.add(i, 1)]) {
        xs.push(this.xs[math.add(i, 1)]);
        ps.push(p);
      }
    }
    return xs.map((x, i) => [x, ps[i]]);
  }

  /**
   * Computes the CDF of the maximum of k selections from this dist.
   * @param {number} k int
   * @returns new Cdf
   */
  max(k) {
    const cdf = this.copy();
    cdf.ps = cdf.ps.map(p => p ** k);
    return cdf;
  }
}
