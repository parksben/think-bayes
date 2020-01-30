import DictWrapper from '../DictWrapper';

/**
 * Represents a histogram, which is a map from values to frequencies.
 * Values can be any hashable type; frequencies are integer counters.
 * @param {string|array|object} values sequence of values
 * @param {string} name sequence of values
 */
export default class Hist extends DictWrapper {
  /**
   * Gets the frequency associated with the value x.
   * @param {any} x number value
   * @returns int frequency
   */
  freq(x) {
    return this.d.get(x) || 0;
  }

  /**
   * Gets frequencies for a sequence of values.
   */
  freqs(xs) {
    return xs.map(x => this.freq(x));
  }

  /**
   * Checks whether the values in this histogram are a subset of
   * the values in the given histogram.
   */
  isSubset(other) {
    for (let [val, freq] of this.items()) {
      if (freq > other.freq(val)) return false;
    }
    return true;
  }

  /**
   * Subtracts the values in the given histogram from this histogram.
   */
  subtract(other) {
    for (let [val, freq] of other.items()) {
      this.incr(val, freq);
    }
  }
}
