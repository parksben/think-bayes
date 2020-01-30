import Pmf from '../Pmf';
import math from '../math';

/**
 * Represents a joint distribution.
 * The values are sequences (usually tuples)
 * @param {string|array|object} values sequence of values
 * @param {string} name sequence of values
 */
export default class Joint extends Pmf {
  /**
   * Gets the marginal distribution of the indicated variable.
   * @param {number} i index of the variable we want
   * @returns Pmf
   */
  marginal(i, name) {
    const pmf = new Pmf(null, name);
    for (let [vs, prob] of this.items()) {
      pmf.incr(vs[i], prob);
    }
    return pmf;
  }

  /**
   * Gets the conditional distribution of the indicated variable.
   * Distribution of vs[i], conditioned on vs[j] = val.
   * @param {number} i index of the variable we want
   * @param {number} j which variable is conditioned on
   * @param {*} val the value the jth variable has to have
   * @returns Pmf
   */
  conditional(i, j, val, name) {
    const pmf = new Pmf(null, name);
    for (let [vs, prob] of this.items()) {
      if (vs[j] !== val) continue;
      pmf.incr(vs[i], prob);
    }
    pmf.normalize();
    return pmf;
  }

  /**
   * Returns the maximum-likelihood credible interval.
   * If percentage=90, computes a 90% CI containing the values
   * with the highest likelihoods.
   * @param {number} percentage float between 0 and 100
   * @returns list of values from the suite
   */
  maxLikeInterval(percentage = 90) {
    const interval = [];
    let total = 0;
    const t = this.items()
      .map(([x, p]) => [p, x])
      .sort(([a], [b]) => math.compare(b, a));

    for (let [prob, val] of t) {
      interval.push(val);
      total = math.add(total, prob);
      if (total >= math.div(percentage, 100)) break;
    }

    return interval;
  }
}
