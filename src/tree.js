import _ from 'lodash';

const createTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(allKeys);

  const compareContents = (key) => {
    const obj1HasKey = keys1.includes(key);
    const obj2HasKey = keys2.includes(key);
    const equalValues = obj1[key] === obj2[key];
    const valuesAreObjects = typeof obj1[key] === 'object' && typeof obj2[key] === 'object';
    const valuesNotNull = obj1[key] !== null && obj2[key] !== null;
    const valuesAreArrays = Array.isArray(obj1[key]) && Array.isArray(obj2[key]);

    if (!obj2HasKey) {
      return { key, status: 'deleted', valueBefore: obj1[key] };
    }
    if (!obj1HasKey) {
      return { key, status: 'added', valueBefore: obj2[key] };
    }
    if (equalValues) {
      return { key, status: 'unchanged', valueBefore: obj1[key] };
    }
    if (valuesAreArrays) {
      const sameValues = obj1[key].filter((value) => obj2[key].includes(value));
      if (sameValues.length === obj1[key].length) {
        return { key, status: 'unchanged', valueBefore: obj1[key] };
      }
      return {
        key, status: 'changed', valueBefore: obj1[key], valueAfter: obj2[key],
      };
    }

    if (valuesAreObjects && valuesNotNull) {
      return { key, status: 'unchanged key', nodes: createTree(obj1[key], obj2[key]) };
    }

    return {
      key, status: 'changed', valueBefore: obj1[key], valueAfter: obj2[key],
    };
  };

  const difference = sortedKeys.map((key) => compareContents(key));
  return difference;
};
export default createTree;
