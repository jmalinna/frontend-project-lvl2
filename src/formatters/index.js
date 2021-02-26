import uniq from 'lodash/fp/uniq.js';
import Node from '../node.js';

const genDiff = (obj1, obj2, node = new Node()) => {
  const sortedKeys1 = Object.keys(obj1).sort();
  const sortedKeys2 = Object.keys(obj2).sort();
  const allKeys = sortedKeys1.concat(sortedKeys2).sort();
  const uniqKeys = uniq(allKeys);

  const compareContents = (tree, key) => {
    const obj1HasKey = sortedKeys1.includes(key);
    const obj2HasKey = sortedKeys2.includes(key);
    const equalKeys = sortedKeys1.includes(key) && sortedKeys2.includes(key);
    const equalValues = obj1[key] === obj2[key];

    if (!obj2HasKey) {
      tree.addNode('deleted', key, obj1[key]);
    }
    if (!obj1HasKey) {
      tree.addNode('added', key, obj2[key]);
    }
    if (equalKeys && equalValues) {
      tree.addNode('unchanged', key, obj1[key]);
    }

    if (equalKeys && !equalValues) {
      if (typeof (obj1[key]) === 'object' && typeof (obj2[key]) === 'object') {
        genDiff(obj1[key], obj2[key], tree.addNode('unchanged key', key));
        return tree;
      }

      tree.addNode('changed', key, obj1[key], obj2[key]);
    }
    return tree;
  };

  const difference = uniqKeys.reduce(compareContents, node);
  return difference;
};
export default genDiff;
