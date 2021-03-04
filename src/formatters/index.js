import createTree from './tree.js';
import makePlain from './plain.js';
import makeStylish from './stylish.js';
import buildPathAndParse from '../parsers.js';
import makeJson from './json.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const parsedPath1 = buildPathAndParse(filepath1);
  const parsedPath2 = buildPathAndParse(filepath2);
  const tree = createTree(parsedPath1, parsedPath2);
  switch (formatName) {
    case 'stylish':
      return makeStylish(tree);
    case 'plain':
      return makePlain(tree);
    case 'json':
      return makeJson(tree);
    default:
      return `Unknown formatter ${formatName}. Formatter must be stylish, plain or json`;
  }
};
export default genDiff;
