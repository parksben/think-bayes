/**
 * [Example] - The cookie problem
 * [Description] - https://www.oreilly.com/library/view/think-bayes/13333JSONBOOK/a0000000336.html
 */

const { Pmf } = require('../lib');

const pmf = new Pmf();

pmf.set('Bow1', 0.5);
pmf.set('Bow2', 0.5);
pmf.mult('Bow1', 0.75);
pmf.mult('Bow2', 0.5);
pmf.normalize();

pmf.print();
