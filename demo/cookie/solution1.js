const { Pmf } = require('../../cjs');

const pmf = new Pmf();

pmf.set('Bowl1', 0.5);
pmf.set('Bowl2', 0.5);
pmf.mult('Bowl1', 0.75);
pmf.mult('Bowl2', 0.5);
pmf.normalize();

pmf.print();
