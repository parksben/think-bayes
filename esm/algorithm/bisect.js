import math from '../math';

/**
 * Calculate the position where a new element should be
 * inserted in an ordered sequence by using the bisection method.
 * @param {array} xs Given ordered sequence
 * @param {number} x Number to be inserted
 */
export const bisect = (xs, x, s, e) => {
  if (!xs || !Array.isArray(xs))
    throw new TypeError(
      'Value of the first argument must be a sorted array of numbers.'
    );
  if (!x) throw new TypeError('Value of the second argument must be a number.');

  const start = s || 0;
  const end = e || math.sub(xs.length, 1);

  // (-Infinity, start] or [end, Infinity)
  if (x < xs[start]) return start;
  if (x === xs[start]) return math.add(start, 1);
  if (x >= xs[end]) return math.add(end, 1);

  // (start, end)
  // mid = parseInt(start + (end - start) / 2, 10)
  const mid = parseInt(math.add(start, math.div(math.sub(end, start), 2)), 10);
  if (x === xs[mid]) return math.add(mid, 1);
  return x > xs[mid]
    ? bisect(xs, x, math.add(mid, 1), end)
    : bisect(xs, x, start, math.sub(mid, 1));
};
