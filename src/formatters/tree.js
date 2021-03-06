import uniq from 'lodash/fp/uniq.js';
import { makeNode, addNode } from '../node.js';
import compareArrays from '../compareArrays.js';

const createTree = (obj1, obj2, node = makeNode()) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const sortedCopyKeys1 = [...keys1].sort();
  const sortedCopyKeys2 = [...keys2].sort();
  const allKeys = sortedCopyKeys1.concat(sortedCopyKeys2).sort();
  const uniqKeys = uniq(allKeys);

  const compareContents = (tree, key) => {
    const obj1HasKey = sortedCopyKeys1.includes(key);
    const obj2HasKey = sortedCopyKeys2.includes(key);
    const equalKeys = sortedCopyKeys1.includes(key) && sortedCopyKeys2.includes(key);
    const equalValues = obj1[key] === obj2[key];
    const valuesAreArrays = Array.isArray(obj1[key]) && Array.isArray(obj2[key]);

    if (!obj2HasKey) {
      addNode(tree, 'deleted', key, obj1[key]);
    }
    if (!obj1HasKey) {
      addNode(tree, 'added', key, obj2[key]);
    }
    if (equalKeys && equalValues) {
      addNode(tree, 'unchanged', key, obj1[key]);
    }
    if (equalKeys && valuesAreArrays) {
      const comparedValues = compareArrays(obj1[key], obj2[key]);
      if (comparedValues === 'equal') {
        addNode(tree, 'unchanged', key, obj1[key]);
      } else {
        addNode(tree, 'changed', key, obj1[key], obj2[key]);
      }
    }
    if (equalKeys && !equalValues && !valuesAreArrays) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        addNode(tree, 'unchanged key', key);
        createTree(obj1[key], obj2[key], tree.nodes[tree.nodes.length - 1]);
        return tree;
      }

      addNode(tree, 'changed', key, obj1[key], obj2[key]);
    }
    return tree;
  };

  const difference = uniqKeys.reduce(compareContents, node);
  return difference;
};
export default createTree;
