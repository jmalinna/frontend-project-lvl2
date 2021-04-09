import _ from 'lodash';

const createTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(allKeys);

  const compareContents = (key) => {
    if (!keys2.includes(key)) {
      return { key, status: 'deleted', valueBefore: obj1[key] };
    }
    if (!keys1.includes(key)) {
      return { key, status: 'added', valueBefore: obj2[key] };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { key, status: 'unchanged', valueBefore: obj1[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, status: 'nested', children: createTree(obj1[key], obj2[key]) };
    }

    return {
      key, status: 'changed', valueBefore: obj1[key], valueAfter: obj2[key],
    };
  };

  const difference = sortedKeys.map((key) => compareContents(key));
  return difference;
};
export default createTree;
