// ErrorType: ValueError
export class ValueError extends Error {}

/**
 * ErrorType: UnimplementedMethodException
 * Exception if someone calls a method that should be overridden.
 */
export class UnimplementedMethodException extends Error {}

// Create a new object by shallow copying another.
export const shallowClone = source => {
  if (!source || typeof source !== 'object')
    throw new TypeError('Invalid arguments value or type.');

  const targetObj = source.constructor === Array ? [] : {};
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      targetObj[key] = source[key];
    }
  }
  return targetObj;
};

// Detect if current environment is node.js
export const isNode = new Function(
  `try {
    return this === global;
  } catch (e) {
    return false;
  }`
);

// logging utils
export const logging = (lib => {
  const tool = shallowClone(lib);
  return Object.defineProperties(tool, {
    // print method likes `print` in python
    print: {
      value: tool.log,
      writable: false,
      configurable: false,
    },
    // warning method for different environment (node.js & browsers)
    warning: {
      value: text =>
        isNode() ? process.emitWarning(text) : tool.warn(`warning: ${text}`),
      writable: false,
      configurable: false,
    },
  });
})(console);

// Print data set as a table
export const printTable = ({
  rows = [['-', '-']],
  header = ['Value', 'Prob'],
  minColWidth = 5,
  frameH = '-',
  frameV = '|',
}) => {
  const colWidth = {};
  const calColumnWidth = cn => {
    if (!colWidth[cn]) {
      colWidth[cn] = Math.max(
        ...[header, ...rows].map(row => String(row[cn]).length + 2),
        minColWidth
      );
    }
    return colWidth[cn];
  };

  const borderRow = new Array(header.length).fill('borderX');
  const data = frameH ? [header, borderRow, ...rows] : [header, ...rows];

  const lines = data.map(r => {
    const line = r
      .map((c, n) => {
        const td =
          c === 'borderX'
            ? `${frameV}${new Array(calColumnWidth(n)).fill(frameH).join('')}`
            : `${frameV} ${c}${new Array(
                calColumnWidth(n) - String(c).length - 1
              )
                .fill(' ')
                .join('')}`;
        return td;
      })
      .join('');
    return `${line}${frameV}\n`;
  });

  const printStr = `\n${lines.join('')}\n`;
  logging.print(printStr);
};
