const { Suite } = require('../../cjs');
const { range } = require('../../cjs/algorithm/num');

class Train extends Suite {
  likelihood(data, hypo) {
    if (hypo < data) {
      return 0;
    }
    return Demical.div(1, hypo).toNumber();
  }
}

const hypos = range(1, 1001);
const suite = new Train(hypos);
suite.update(60);
suite.print();
console.log(`MEAN: ${Math.round(suite.mean())}\n`);
