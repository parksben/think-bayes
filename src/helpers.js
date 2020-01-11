import { ValueError } from './utils';
import math from './math';
import { makePmfFromList } from './convertors';
import Pmf from './Pmf';
import { linspace } from './algorithm/num';
import { normalPdf } from './algorithm/normal';
import { binomialPmf } from './algorithm/binomial';
import { poissonPmf } from './algorithm/poisson';

/**
 * Computes odds for a given probability.
 * Example: p=0.75 means 75 for and 25 against, or 3:1 odds in favor.
 * Note: when p=1, the formula for odds divides by zero, which is
 * normally undefined.  But I think it is reasonable to define Odds(1)
 * to be infinity, so that's what this function does.
 * @param {number} p float 0~1
 * @returns float odds
 */
export const odds = p => {
  if (!p || p < 0 || p > 1)
    throw new RangeError(
      'Value of the probability must be a number greater than 0 and less than 1.'
    );
  return p === 1 ? Infinity : math.div(p, math.sub(1, p));
};

/**
 * Computes the probability corresponding to given odds.
 * Example: o=2 means 2:1 odds in favor, or 2/3 probability
 * @param {number} o float odds, strictly positive
 * @returns float probability
 */
export const probability = o => {
  if (!o || o < 0)
    throw new RangeError('Value of the odds must be a positive number.');
  return math.div(o, math.add(o, 1));
};

/**
 * Computes the probability corresponding to given odds.
 * Example: yes=2, no=1 means 2:1 odds in favor, or 2/3 probability.
 * @param {number} yes int or float odds in favor
 * @param {number} no int or float odds in favor
 */
export const probability2 = (yes, no) => {
  if (!yes || yes < 0 || !no || no < 0)
    throw new RangeError('Value of the odds must be a positive number.');
  return math.div(yes, math.add(yes, no));
};

/**
 * Computes a percentile of a given Pmf.
 * @param {pmf} pmf
 * @param {number} percentage float 0-100
 */
export const percentile = (pmf, percentage) => {
  if (p < 0 || p > 100)
    throw new RangeError(
      'Value of the probability must be a number greater than 0 and less than 1.'
    );

  const p = percentage / 100;
  let total = 0;
  for (let [val, prob] of pmf.items()) {
    total = math.add(total, prob);
    if (total > p) return val;
  }

  throw new ValueError(
    `Value not found in pmf for percentage: \`${percentage}\`, which means the total probability of pmf is less than ${percentage /
      100}.`
  );
};

/**
 * Computes a credible interval for a given distribution.
 * If percentage=90, computes the 90% CI.
 * @param {pmf} pmf Pmf object representing a posterior distribution
 * @param {number} percentage float between 0 and 100
 * @returns sequence of two floats, low and high
 */
export const credibleInterval = (pmf, percentage = 90) => {
  const cdf = pmf.makeCdf();
  // prob = (1 - percentage / 100.0) / 2
  const prob = math.div(math.sub(1, math.div(percentage, 100)), 2);
  const interval = [cdf.value(prob), cdf.value(math.sub(1, prob))];
  return interval;
};

/**
 * Probability that a value from pmf1 is less than a value from pmf2.
 * @param {pmf} pmf1 Pmf object
 * @param {pmf} pmf2 Pmf object
 * @returns float probability
 */
export const pmfProbLess = (pmf1, pmf2) => {
  let total = 0;
  for (let [v1, p1] of pmf1.items()) {
    for (let [v2, p2] of pmf2.items()) {
      if (v1 < v2) total = math.add(total, math.mult(p1, p2));
    }
  }
  return total;
};

/**
 * Probability that a value from pmf1 is greater than a value from pmf2.
 * @param {pmf} pmf1 Pmf object
 * @param {pmf} pmf2 Pmf object
 * @returns float probability
 */
export const pmfProbGreater = (pmf1, pmf2) => {
  let total = 0;
  for (let [v1, p1] of pmf1.items()) {
    for (let [v2, p2] of pmf2.items()) {
      if (v1 > v2) total = math.add(total, math.mult(p1, p2));
    }
  }
  return total;
};

/**
 * Probability that a value from pmf1 equals a value from pmf2.
 * @param {pmf} pmf1 Pmf object
 * @param {pmf} pmf2 Pmf object
 * @returns float probability
 */
export const pmfProbEqual = (pmf1, pmf2) => {
  let total = 0;
  for (let [v1, p1] of pmf1.items()) {
    for (let [v2, p2] of pmf2.items()) {
      if (v1 === v2) total = math.add(total, math.mult(p1, p2));
    }
  }
  return total;
};

/**
 * Chooses a random value from each dist and returns the sum.
 * @param {array} dists sequence of Pmf or Cdf objects
 * @returns numerical sum
 */
export const randomSum = dists => {
  const total = dists.reduce((prev, curr) => math.add(prev, curr.random()), 0);
  return total;
};

/**
 * Draws a sample of sums from a list of distributions.
 * @param {array} dists sequence of Pmf or Cdf objects
 * @param {number} n sample size
 * @returns new Pmf of sums
 */
export const sampleSum = (dists, n) => {
  const list = new Array(n).fill(0).map(() => randomSum(dists));
  const pmf = makePmfFromList(list);
  return pmf;
};

/**
 * Computes the unnormalized PDF of the normal distribution.
 * @param {number} x value
 * @param {number} mu mean
 * @param {number} sigma standard deviation
 * @returns float probability density
 */
export const evalGaussianPdf = (x, mu, sigma) => normalPdf(x, mu, sigma);

/**
 * Makes a PMF discrete approx to a Gaussian distribution.
 * @param {number} mu float mean
 * @param {number} sigma float standard deviation
 * @param {number} numSigmas how many sigmas to extend in each direction
 * @param {number} n number of values in the Pmf
 * @returns normalized Pmf
 */
export const makeGaussianPdf = (mu, sigma, numSigmas, n = 201) => {
  const pmf = new Pmf();

  // low = mu - numSigmas * sigma;
  const low = math.sub(mu, math.mult(numSigmas, sigma));
  // high = mu + numSigmas * sigma;
  const high = math.add(mu, math.mult(numSigmas, sigma));

  for (let x of linspace(low, high, n)) {
    const p = evalGaussianPdf(x, mu, sigma);
    pmf.set(x, p);
  }
  pmf.normalize();

  return pmf;
};

/**
 * Evaluates the binomial pmf.
 * @returns the probabily of k successes in n trials with probability p.
 */
export const evalBinomialPmf = (k, n, p) => binomialPmf(k, n, p);

/**
 * Computes the Poisson PMF.
 * @param {number} k number of events
 * @param {number} lam parameter lambda in events per unit time
 * @returns float probability
 */
export const evalPoissonPmf = (k, lam) => poissonPmf(k, lam);
