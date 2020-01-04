import math from '../math';

/**
 * Poisson distribution Pmf
 */
export const poissonPmf = (k, lam) =>
  (lam ** k * Math.exp(-lam)) / math.factorial(k);
