const { Suite } = require('../../cjs');

const mix94 = {
  brown: 30,
  yellow: 20,
  red: 20,
  green: 10,
  orange: 10,
  tan: 10,
};
const mix96 = {
  blue: 24,
  green: 20,
  orange: 16,
  yellow: 14,
  red: 13,
  brown: 13,
};

class M_and_M extends Suite {
  hypotheses = {
    A: {
      bag1: mix94,
      bag2: mix96,
    },
    B: {
      bag1: mix96,
      bag2: mix94,
    },
  };

  likelihood(data, hypo) {
    const [bag, color] = data;
    const mix = this.hypotheses[hypo][bag];
    const like = mix[color];
    return like;
  }
}

const suite = new M_and_M('AB');
suite.update(['bag1', 'yellow']);
suite.update(['bag2', 'green']);
suite.print();
