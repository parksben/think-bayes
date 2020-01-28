const { Suite } = require('../../cjs');

class Monty extends Suite {
  likelihood(data, hypo) {
    if (hypo === data) {
      return 0;
    }
    if (hypo === 'A') {
      return 0.5;
    }
    return 1;
  }
}

const suite = new Monty('ABC');
suite.update('B');
suite.print();
