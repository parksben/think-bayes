# think-bayes

An algorithm framework of probability and statistics for **ES6+** and **CommonJS** environment.

In progress...

> 用于 **ES6+** 和 **CommonJS** 环境的概率统计算法框架（未完成，努力 coding 中...）

## Algorithm classes

This library provides some **classes** following for calculations related to probability and statistics.

> 本框架提供以下 **类（class）** 用于概率统计相关的计算

These classes can be imported by the same way following:

> 引入这些类的方式如下：

```js
import { Pmf, Cdf, Pdf, Suite } from 'think-bayes';
```

### Pmf

Represents a probability mass function.

> 概率质量函数

### Cdf

Represents a cumulative distribution function.

> 累积分布函数

### Pdf

Represents a probability density function (PDF).

> 概率密度函数

### Suite

Represents a suite of hypotheses and their probabilities.

> 一组（互斥、完备的）假设及其概率

### Hist

Represents a histogram, which is a map from values to frequencies.

> 直方图，即一组值与其频率的映射

### Interpolater

Represents a mapping between sorted sequences which performs linear interp.

> （两个）有序分布间的映射，用于线性插值

### Joint

Represents a joint distribution.

> 联合分布

### GaussianPdf

Represents the PDF of a Gaussian distribution.

> 高斯分布的 概率密度函数（PDF）

### GaussianKde (unimplemented)

Represents Gaussian kernel density estimates.

> 高斯核密度估计（待实现）

### EstimatedPdf

Represents a PDF estimated by KDE.

> 由 内核密度估计（KDE）估算 概率密度函数（PDF）

## Helpers

This library provides some **functions** following for calculations related to probability and statistics.

> 本框架提供以下 **工具函数** 用于概率统计相关的计算

These functions can be imported by the same way following:

> 引入这些方法的方式如下：

```js
import { odds, probability, percentile } from 'think-bayes/helpers';
```
