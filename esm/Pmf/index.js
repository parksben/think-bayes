/**
 * Represents a probability mass function.
 * Values can be any hashable type; probabilities are floating-point.
 * Pmfs are not necessarily normalized.
 */

import DictWrapper from '../DictWrapper';
import { ValueError } from '../utils';
import { makeCdfFromPmf } from '../convertors';
import math from '../math';

export default class Pmf extends DictWrapper {
  /**
   * Gets the probability associated with the value x.
   * @param {any} x number value
   * @param {number} probDefault value to return if the key is not there
   */
  prob(x, probDefault = 0) {
    return this.d.get(x) || probDefault;
  }

  /**
   * Gets probabilities for a sequence of values.
   */
  probs(xs) {
    return xs.map(x => this.prob(x));
  }

  /**
   * Makes a cdf.
   */
  makeCdf(name) {
    return makeCdfFromPmf(this, name);
  }

  probGreater(x) {
    const t = [...this.d]
      .filter(([val, prob]) => val > x)
      .map(([val, prob]) => prob);
    return t.reduce((prev, curr) => math.add(prev, curr));
  }

  probLess(x) {
    const t = [...this.d]
      .filter(([val, prob]) => val < x)
      .map(([val, prob]) => prob);
    return t.reduce((prev, curr) => math.add(prev, curr));
  }

  /**
   * Normalizes this PMF so the sum of all probs is fraction.
   * @param {number} fraction what the total should be after normalization
   * @returns the total probability before normalizing
   */
  normalize(fraction = 1.0) {
    if (this.logFlag) throw new ValueError('pmf is under a log transform');

    const total = this.total();
    if (total === 0.0)
      throw new ValueError('Normalize: total probability is zero.');

    for (let [x, p] of this.d.entries()) {
      this.d.set(x, math.div(math.mult(p, fraction), total));
    }

    return total;
  }

  /**
   * Chooses a random element from this PMF.
   * @returns float value from the Pmf
   */
  random() {
    if (this.d.size === 0) throw new ValueError('pmf contains no values.');

    const target = Math.random();
    let total = 0;
    for (let [x, p] of this.d.entries()) {
      total = math.add(total, p);
      if (total >= target) return x;
    }

    throw new RangeError(
      `Value not found, no one value in this pmf matches the random target '${target}'`
    );
  }

  /**
   * Computes the mean of a PMF.
   * @returns float mean
   */
  mean() {
    let mu = 0;
    for (let [x, p] of this.d.entries()) {
      mu = math.add(mu, math.mult(p, x));
    }
    return mu;
  }

  /**
   * Computes the variance of a PMF.
   * @param {number} mu the point around which the variance is computed; if omitted, computes the mean
   * @returns float variance
   */
  var(miu) {
    const mu = miu || this.mean();
    let variance = 0;
    for (let [x, p] of this.d.entries()) {
      // variance += p * (x - mu) ** 2
      variance = math.add(variance, math.mult(p, math.sub(x, mu) ** 2));
    }
    return variance;
  }

  /**
   * Returns the value with the highest probability.
   * @returns float probability
   */
  maximumLikelihood() {
    const maxProb = Math.max(...this.d.values());
    const [val] = [...this.d].find(([x, p]) => p === maxProb);
    return val;
  }

  /**
   * Computes the central credible interval.
   * If percentage=90, computes the 90% CI.
   * @param {number} percentage float between 0 and 100
   * @returns sequence of two floats, low and high
   */
  credibleInterval(percentage = 90) {
    const cdf = this.makeCdf();
    return cdf.credibleInterval(percentage);
  }

  /**
   * Computes the Pmf of the sum of values drawn from self and other.
   * @param {number or pmf} other another pmf or a number
   * @returns new pmf
   */
  add(other) {
    try {
      return this.addPmf(other);
    } catch (e) {
      return this.addConstant(other);
    }
  }

  /**
   * Computes the Pmf of the sum of values drawn from self and other.
   * @param {pmf} other another pmf
   * @returns new Pmf
   */
  addPmf(other) {
    const pmf = new Pmf();
    for (let [v1, p1] of this.items()) {
      for (let [v2, p2] of other.items()) {
        pmf.incr(math.add(v1, v2), math.mult(p1, p2));
      }
    }
    return pmf;
  }

  /**
   * Computes the Pmf of the sum a constant and  values from self.
   * @param {number} other a number
   * @returns new Pmf
   */
  addConstant(other) {
    const pmf = new Pmf();
    for (let [v, p] of this.items()) {
      pmf.set(math.add(v, other), p);
    }
    return pmf;
  }

  /**
   * Computes the Pmf of the diff of values drawn from self and other.
   * @param {pmf} other another Pmf
   * @returns new Pmf
   */
  sub(other) {
    const pmf = new Pmf();
    for (let [v1, p1] of this.items()) {
      for (let [v2, p2] of other.items()) {
        pmf.incr(math.sub(v1, v2), math.mult(p1, p2));
      }
    }
    return pmf;
  }

  /**
   * Computes the CDF of the maximum of k selections from this dist.
   * @param {number} k int
   * @returns new Cdf
   */
  max(k) {
    const cdf = this.makeCdf();
    cdf.ps = cdf.ps.map(c => c ** k);
    return cdf;
  }
}
