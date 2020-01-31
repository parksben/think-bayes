const { Suite, Decimal, Util } = require('../../cjs');
const { range } = require('../../cjs/algorithm/num');

class Train extends Suite {
  likelihood(data, hypo) {
    if (hypo < data) {
      return 0;
    }
    return Decimal.div(1, hypo).toNumber();
  }
}

const hypos = range(1, 1001);
const suite = new Train(hypos);
suite.update(60);
suite.print();

// Mean
console.log(`MEAN: ${Math.round(suite.mean())}\n`);

// Confidence interval for percentage interval is [5, 95]
const { percentile } = Util;
const confidenceInterval = [5, 95].map(x => percentile(suite, x));
console.log(`CI: [${confidenceInterval.join(', ')}]\n`);

// Tips: You can also use the method `suite.makeCdf()` to calculate the CI, like this:
// const cdf = suite.makeCdf();
// const confidenceInterval = [5, 95].map(x => cdf.percentile(x));
// console.log(`CI: [${confidenceInterval.join(', ')}]\n`);
