/**
 * Represents a suite of hypotheses and their probabilities.
 */

import Pmf from '../Pmf';
import { UnimplementedMethodException, odds, probability } from '../utils';

export default class Suite extends Pmf {
  /**
   * Updates each hypothesis based on the data.
   * @param {any} data any representation of the data
   * @returns the normalizing constant
   */
  update(data) {
    for (let hypo of this.values()) {
      const like = this.likelihood(data, hypo);
      this.mult(hypo, like);
    }
    return this.normalize();
  }

  /**
   * Updates a suite of hypotheses based on new data.
   * Modifies the suite directly; if you want to keep the original, make a copy.
   * Note: unlike Update, LogUpdate does not normalize.
   * @param {any} any representation of the data
   */
  logUpdate(data) {
    for (let hypo of this.values()) {
      const like = this.logLikelihood(data, hypo);
      this.incr(hypo, like);
    }
  }

  /**
   * Updates each hypothesis based on the dataset.
   * This is more efficient than calling Update repeatedly because
   * it waits until the end to Normalize.
   * Modifies the suite directly; if you want to keep the original, make a copy.
   * @param {array/set} dataset a sequence of data
   * @returns the normalizing constant
   */
  updateSet(dataset) {
    for (let data of [...dataset]) {
      for (let hypo of this.values()) {
        const like = this.likelihood(data, hypo);
        this.mult(hypo, like);
      }
    }
    return this.normalize();
  }

  /**
   * Updates each hypothesis based on the dataset.
   * Modifies the suite directly; if you want to keep the original, make a copy.
   * @param {array/set} dataset a sequence of data
   */
  logUpdateSet(dataset) {
    for (let data of dataset) {
      this.logUpdate(data);
    }
  }

  /**
   * Computes the likelihood of the data under the hypothesis.
   * @param {any} data some representation of the data
   * @param {any} hypo some representation of the hypothesis
   */
  likelihood(data, hypo) {
    throw new UnimplementedMethodException();
  }

  /**
   * Computes the log likelihood of the data under the hypothesis.
   * @param {any} data some representation of the data
   * @param {any} hypo some representation of the hypothesis
   */
  logLikelihood(data, hypo) {
    throw new UnimplementedMethodException();
  }

  /**
   * Transforms from probabilities to odds.
   * Values with prob=0 are removed.
   */
  makeOdds() {
    for (let [hypo, prob] of this.items()) {
      if (prob) {
        this.set(hypo, odds(prob));
      } else {
        this.remove(hypo);
      }
    }
  }

  /**
   * Transforms from odds to probabilities.
   */
  makeProbs() {
    for (let [hypo, odds] of this.items()) {
      this.set(hypo, probability(odds));
    }
  }
}
