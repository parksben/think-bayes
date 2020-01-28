/**
 * Represents a probability density function (PDF).
 */

import { UnimplementedMethodException } from '../utils';
import Pmf from '../Pmf';

export default class Pdf {
  /**
   * Evaluates this Pdf at x.
   * @returns float probability density
   */
  density(x) {
    throw new UnimplementedMethodException();
  }

  /**
   * Makes a discrete version of this Pdf, evaluated at xs.
   * @param {*} xs equally-spaced sequence of values
   * @returns new Pmf
   */
  makePmf(xs, name) {
    const pmf = new Pmf(null, name);
    for (let x of xs) {
      pmf.set(x, this.density(x));
    }
    pmf.normalize();
    return pmf;
  }
}
