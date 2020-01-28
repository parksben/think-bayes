const { Suite } = require('../../cjs');

class Cookie extends Suite {
  mixes = {
    Bowl1: {
      vanilla: 0.75,
      chocolate: 0.25,
    },
    Bowl2: {
      vanilla: 0.5,
      chocolate: 0.5,
    },
  };

  likelihood(data, hypo) {
    const mix = this.mixes[hypo];
    const like = mix[data];
    return like;
  }
}

const hypos = ['Bowl1', 'Bowl2'];
const pmf = new Cookie(hypos);
pmf.update('vanilla');
pmf.print();
