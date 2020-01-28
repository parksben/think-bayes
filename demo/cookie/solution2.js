const Cookie = require('./Cookie');

const hypos = ['Bowl1', 'Bowl2'];

const pmf = new Cookie(hypos);
pmf.update('vanilla');

pmf.print();
