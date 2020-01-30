import { bisect } from '../algorithm/bisect';
import math from '../math';

/**
 * Represents a mapping between sorted sequences; performs linear interp.
 * @param {array} xs sorted list
 * @param {array} ys sorted list
 */
export default class Interpolater {
  constructor({ xs = [], ys = [] }) {
    this.xs = xs;
    this.ys = ys;
  }

  /**
   * Looks up x and returns the corresponding value of y.
   */
  lookup(x) {
    return this._bisect(x, this.xs, this.ys);
  }

  /**
   * Looks up y and returns the corresponding value of x.
   */
  reverse(x) {
    return this._bisect(x, this.ys, this.xs);
  }

  /**
   * Helper function.
   */
  _bisect(x, xs, ys) {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[math.sub(xs.length, 1)]) return ys[math.sub(ys.length, 1)];

    const i = bisect(xs, x);

    // frac = (1.0 * (x - xs[i - 1])) / (xs[i] - xs[i - 1])
    const frac = math.div(
      1.0 * math.sub(x, xs[math.sub(i, 1)]),
      math.sub(xs[i], xs[math.sub(i, 1)])
    );

    // y = ys[i - 1] + frac * 1.0 * (ys[i] - ys[i - 1])
    const y = math.add(
      ys[math.sub(i, 1)],
      math.mult(math.mult(frac, 1.0), math.sub(ys[i], ys[math.sub(i, 1)]))
    );

    return y;
  }
}
