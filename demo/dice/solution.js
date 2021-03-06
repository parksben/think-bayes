const { Suite, Decimal } = require('../../cjs');

class Dice extends Suite {
  likelihood(data, hypo) {
    if (hypo < data) {
      return 0;
    }
    return Decimal.div(1, hypo).toNumber();
  }
}

const suite = new Dice([4, 6, 8, 12, 20]);
suite.update(6);
suite.print();
