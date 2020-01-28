const { Pmf } = require('../../cjs');

module.exports = class Cookie extends Pmf {
  constructor(hypos) {
    super();
    for (let hypo of hypos) {
      this.set(hypo, 1);
    }
    this.normalize();
  }

  update(data) {
    for (let hypo of this.d.keys()) {
      const like = this.likelihood(data, hypo);
      this.mult(hypo, like);
    }
    this.normalize();
  }

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
};
