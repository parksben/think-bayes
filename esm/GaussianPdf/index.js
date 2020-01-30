import Pdf from '../Pdf';
// import EvalGaussianPdf from '../EvalGaussianPdf';

/**
 * Represents the PDF of a Gaussian distribution.
 */
export default class GaussianPdf extends Pdf {
  /**
   * Constructs a Gaussian Pdf with given mu and sigma.
   * @param {number} mu mean
   * @param {number} sigma standard deviation
   */
  constructor(mu, sigma) {
    super();
    this.mu = mu;
    this.sigma = sigma;
  }

  /**
   * Evaluates this Pdf at x.
   * @returns float probability density
   */
  density(x) {
    // return new EvalGaussianPdf(x, this.mu, this.sigma);
  }
}
