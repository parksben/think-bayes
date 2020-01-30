/**
 * Represents a probability density function (PDF).
 */

import { UnimplementedMethodException } from '../utils';
import Pmf from '../Pmf';

export default class Pdf {
  /**
   * Evaluates this pdf at x.
   * This method needs implement by children class
   * if not there is an `UnimplementedMethodException` would be throw
   * @param {number} x number
   * @returns float probability density
   */
  density(x) {
    throw new UnimplementedMethodException();
  }

  /**
   * Makes a discrete version of this pdf, evaluated at xs.
   * @param {string|array|object} xs equally-spaced sequence of values
   * @returns new pmf
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
