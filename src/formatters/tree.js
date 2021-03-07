import _ from 'lodash';
import compareArrays from '../compareArrays.js';

const createTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const sortedKeys1 = _.sortBy(keys1);
  const sortedKeys2 = _.sortBy(keys2);
  const allKeys = _.union(sortedKeys1, sortedKeys2);
  const sortedAllKeys = _.sortBy(allKeys);

  const compareContents = (key) => {
    const obj1HasKey = sortedKeys1.includes(key);
    const obj2HasKey = sortedKeys2.includes(key);
    const equalKeys = sortedKeys1.includes(key) && sortedKeys2.includes(key);
    const equalValues = obj1[key] === obj2[key];
    const valuesAreArrays = Array.isArray(obj1[key]) && Array.isArray(obj2[key]);

    if (!obj2HasKey) {
      return { key, status: 'deleted', valueBefore: obj1[key] };
    }
    if (!obj1HasKey) {
      return { key, status: 'added', valueBefore: obj2[key] };
    }
    if (equalKeys && equalValues) {
      return { key, status: 'unchanged', valueBefore: obj1[key] };
    }
    if (equalKeys && valuesAreArrays) {
      const comparedValues = compareArrays(obj1[key], obj2[key]);
      if (comparedValues === 'equal') {
        return { key, status: 'unchanged', valueBefore: obj1[key] };
      }
      return {
        key, status: 'changed', valueBefore: obj1[key], valueAfter: obj2[key],
      };
    }
    if (equalKeys && !equalValues && !valuesAreArrays) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        return { key, status: 'unchanged key', nodes: createTree(obj1[key], obj2[key]) };
      }
    }

    return {
      key, status: 'changed', valueBefore: obj1[key], valueAfter: obj2[key],
    };
  };

  const difference = sortedAllKeys.map((key) => compareContents(key));
  return difference;
};
export default createTree;
