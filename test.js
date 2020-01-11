const { Pmf } = require('./lib');

const pmf = new Pmf();

pmf.set('Bow1', 0.5);
pmf.set('Bow2', 0.5);
pmf.mult('Bow1', 0.75);
pmf.mult('Bow2', 0.5);
pmf.normalize();

pmf.print();
