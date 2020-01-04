import math from '../math';

/**
 * Normal distribution Pdf
 */
export const normalPdf = (x, mu, sigma) => {
  const factor = 1 / (sigma * Math.sqrt(2 * Math.PI));
  return factor * Math.exp(math.div(-1 * math.sub(x, mu) ** 2, 2 * sigma ** 2));
};
