const fs = require('fs');
const path = require('path');
const dox = require('dox');
const { printTable } = require('../cjs/utils');

const sourceMapping = [
  {
    title: 'Algorithm classes',
    markup: 'CLASS_CONTENTS',
    files: [
      { title: 'DictWrapper', source: 'esm/DictWrapper/index.js' },
      { title: 'Pmf', source: 'esm/Pmf/index.js' },
      { title: 'Cdf', source: 'esm/Cdf/index.js' },
      { title: 'Pdf', source: 'esm/Pdf/index.js' },
      { title: 'Suite', source: 'esm/Suite/index.js' },
      { title: 'Hist', source: 'esm/Hist/index.js' },
      { title: 'Interpolater', source: 'esm/Interpolater/index.js' },
      { title: 'Joint', source: 'esm/Joint/index.js' },
      { title: 'GaussianPdf', source: 'esm/GaussianPdf/index.js' },
      { title: 'GaussianKde', source: 'esm/GaussianKde/index.js' },
      { title: 'EstimatedPdf', source: 'esm/EstimatedPdf/index.js' },
    ],
  },
  {
    title: 'Helpers',
    markup: 'HELPER_CONTENTS',
    files: [{ source: 'esm/helpers.js' }],
  },
];

const astList = [];
const fileQueue = sourceMapping.reduce(
  (pre, cur) => pre.concat(cur.files.map(x => ({ ...x, markup: cur.markup }))),
  []
);

while (fileQueue.length > 0) {
  const { title, markup, source } = fileQueue.shift();
  const codes = fs.readFileSync(path.resolve(__dirname, '../', source), 'utf8');
  const ast = dox.parseComments(codes);
  astList.push({ title, markup, source, ast });
}

const markdown = {
  CLASS_CONTENTS: '',
  HELPER_CONTENTS: '',
};

// generate docs of classes
const classDocSrc = astList.filter(x => x.markup === 'CLASS_CONTENTS');
classDocSrc.forEach(({ title, ast }) => {
  const classParams = ast[0].tags.filter(x => x.type === 'param');
  let itemDoc = `### ${title}(${classParams.map(x => x.name).join(', ')})\n\n`;

  itemDoc +=
    ast[0].description.full
      .replace(/<\/?p>/g, '')
      .replace(/\n?<br\s?\/?>\n?/g, '\n\n') + '\n\n';

  if (classParams.length > 0) {
    const paramsTable = printTable({
      header: ['param', 'type', 'description'],
      rows: classParams.map(({ name, types, description: note }) => [
        name,
        types.join(' | '),
        note.replace(/<\/?p>/g, ''),
      ]),
      mode: 'function',
    });
    itemDoc += `**@Params:**\n${paramsTable}\n`;
  }

  if (ast.slice(1).length > 0) {
    itemDoc += '**@Methods:**\n\n';
  }

  if (ast[0].code.includes('extends')) {
    const parentClass = ast[0].code.match(/extends\s(.*?)\s/)[1];
    itemDoc += `**Important:** This class inherits from **${parentClass}**, so you can use all methods of the parent class.\n\n`;
  }

  ast.slice(1).forEach(({ tags, code, description }) => {
    const method = code.match(/^[^(]+\([^)]*?\)/)[0];

    if (!/^_/.test(method)) {
      itemDoc += `<details>\n  <summary><b>.${method}</b></summary>\n\n`;
      itemDoc +=
        description.full
          .replace(/<\/?p>/g, '')
          .replace(/\n?<br\s?\/?>\n?/g, '\n\n') + '\n\n';

      const params = tags.filter(x => x.type === 'param');
      if (params.length > 0) {
        const paramsTable = printTable({
          header: ['param', 'type', 'description'],
          rows: params.map(({ name, types, description: note }) => [
            name,
            types.join(' | '),
            note.replace(/<\/?p>/g, ''),
          ]),
          mode: 'function',
        });
        itemDoc += `**@Params:**\n${paramsTable}\n`;
      }

      const returns = tags.find(x => x.type === 'returns');
      if (returns) {
        itemDoc += `**@Returns:** ${returns.string}\n\n`;
      }

      itemDoc += '</details>\n\n';
    }
  });

  markdown.CLASS_CONTENTS += itemDoc;
});

// generate docs of helpers
const helperDocSrc = astList.filter(x => x.markup === 'HELPER_CONTENTS');
helperDocSrc.forEach(({ title, ast }) => {
  let itemDoc = '';
  ast.forEach(({ tags, code, description }) => {
    const method = code
      .match(/^export\sconst\s([^=]+\s\=\s.+\s)\=>\s/)[1]
      .replace(/\s\=\s\(?([^)]+)\)?\s/, '($1)');

    if (!/^_/.test(method)) {
      itemDoc += `<details>\n  <summary><b>${method}</b></summary>\n\n`;
      itemDoc +=
        description.full
          .replace(/<\/?p>/g, '')
          .replace(/\n?<br\s?\/?>\n?/g, '\n\n') + '\n\n';

      const params = tags.filter(x => x.type === 'param');
      if (params.length > 0) {
        const paramsTable = printTable({
          header: ['param', 'type', 'description'],
          rows: params.map(({ name, types, description: note }) => [
            name,
            types.join(' | '),
            note.replace(/<\/?p>/g, ''),
          ]),
          mode: 'function',
        });
        itemDoc += `**@Params:**\n${paramsTable}\n`;
      }

      const returns = tags.find(x => x.type === 'returns');
      if (returns) {
        itemDoc += `**@Returns:** ${returns.string}\n\n`;
      }

      itemDoc += '</details>\n\n';
    }
  });

  markdown.HELPER_CONTENTS += itemDoc;
});

// merge markdown contents to template
let templateDoc = fs.readFileSync(
  path.resolve(__dirname, 'template.md'),
  'utf8'
);
sourceMapping.forEach(({ markup }) => {
  templateDoc = templateDoc.replace(`{{${markup}}}`, markdown[markup]);
});

fs.writeFileSync(path.resolve(__dirname, '../README.md'), templateDoc, 'utf8');
