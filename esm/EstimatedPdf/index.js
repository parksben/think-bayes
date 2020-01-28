/**
 * Represents a PDF estimated by KDE.
 */

import Pdf from '../Pdf';
import { makePmfFromItems } from '../convertors';
import GaussianKde from '../GaussianKde';

export default class EstimatedPdf extends Pdf {
  /**
   * Estimates the density function based on a sample.
   * @param {array} sample sequence of data
   */
  constructor(sample) {
    this.kde = new GaussianKde(sample);
  }

  /**
   * Evaluates this Pdf at x.
   * @returns float probability density
   */
  density(x) {
    return this.kde.evaluate(x);
  }

  makePmf(xs, name) {
    const ps = this.kde.evaluate(xs);
    const pmf = makePmfFromItems(xs.map((x, i) => [x, ps[i]]), name);
    return pmf;
  }
}
