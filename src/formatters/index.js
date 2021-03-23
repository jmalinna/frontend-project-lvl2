import makePlain from './plain.js';
import makeStylish from './stylish.js';

const formatData = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return makeStylish(tree);
    case 'plain':
      return makePlain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      return `Unknown formatter ${formatName}. Formatter must be stylish, plain or json`;
  }
};
export default formatData;
