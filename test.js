// import { Pmf } from './src';
const { Pmf } = require('./dist');

const pmf = new Pmf();

pmf.set('Bow1', 0.5);
pmf.set('Bow2', 0.5);
pmf.mult('Bow1', 0.75);
pmf.mult('Bow2', 0.5);
pmf.normalize();

pmf.print();
