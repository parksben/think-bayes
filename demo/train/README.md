# The locomotive problem

> 火车头问题

<https://www.oreilly.com/library/view/think-bayes/13333JSONBOOK/a0000001292.html>

## Solution 1

The prior probability is based on a uniform distribution.

**Run Solution**

```bash
yarn run-demo ./demo/train/solution1.js # OR npm run run-demo ./demo/train/solution1.js
```

**Output**

| Value | Prob                   |
| ----- | ---------------------- |
| 1     | 0                      |
| ...   | ...                    |
| 59    | 0                      |
| 60    | 0.005905417875729854   |
| 61    | 0.005808607746619528   |
| 62    | 0.005714920524899858   |
| ...   | ...                    |
| 998   | 0.00035503514282945005 |
| 999   | 0.0003546797522960873  |
| 1000  | 0.0003543250725437912  |

MEAN: 333

CI: [69, 869]

## Solution 2

The prior probability is based on a power-rate distribution.

**Run Solution**

```bash
yarn run-demo ./demo/train/solution2.js # OR npm run run-demo ./demo/train/solution2.js
```

**Output**

| Value | Prob                  |
| ----- | --------------------- |
| 1     | 0                     |
| ...   | ...                   |
| 59    | 0                     |
| 60    | 0.017573278852195794  |
| 61    | 0.017001828505214964  |
| 62    | 0.016457805376666204  |
| ...   | ...                   |
| 998   | 0.0000635176202785379 |
| 999   | 0.0000633905215204242 |
| 1000  | 0.0000632638038679049 |

MEAN: 179

CI: [62, 559]
