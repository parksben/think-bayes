# think-bayes

An algorithm collection of probability and statistics for **browser** and **Node.js** environment.

In progress...

> 适用于 **浏览器** 和 **Node.js** 环境的概率统计算法集（非正式版本，功能亟待完善，努力 coding 中...）

## Install

```bash
yarn add think-bayes # OR npm i --save think-bayes
```

## Quickstart

Let us resolve [the cookie problem](https://www.oreilly.com/library/view/think-bayes/13333JSONBOOK/a0000000336.html) by using the class `Suite`:

```js
const { Suite } = require('think-bayes');

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

const result = pmf.render();
console.log(result); // [ [ 'Bowl1', 0.6 ], [ 'Bowl2', 0.4 ] ]

// You can also print the result as a table
pmf.print();
// | Value | Prob |
// |-------|------|
// | Bowl1 | 0.6  |
// | Bowl2 | 0.4  |
```

## Algorithm Classes

This library provides some **ES Classes** following for calculations related to probability and statistics.

These classes can be imported by the same way following:

```js
import { Pmf, Cdf, Pdf, Suite } from 'think-bayes';
```

{{CLASS_CONTENTS}}

## Utility Functions

This library provides some **Utility Functions** following for calculations related to probability and statistics.

These functions can be imported by the same way following:

```js
import { odds, probability, percentile } from 'think-bayes/helpers';
```

{{HELPER_CONTENTS}}
