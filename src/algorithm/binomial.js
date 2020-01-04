import math from '../math';

/**
 * Pick out k items from n items, k<=n
 * @returns Combination number
 */
export const choose = (n, k) => {
  if (k < 0 || k > n) return 0;
  if (k > n - k) k = n - k;
  let res = 1;
  for (var i = 0; i < k; i++) {
    res *= (n - k + i + 1) / (i + 1);
  }
  return Math.round(res);
};

/**
 * Binomial distribution Pmf
 */
export const binomialPmf = (k, n, p) =>
  math.mult(choose(n, k) * p ** k, math.sub(1, p) ** (n - k));
