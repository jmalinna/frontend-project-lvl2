import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJson from './json.js';

const selectFormatter = (tree, formatName) => {
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
export default selectFormatter;
