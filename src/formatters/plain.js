import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return value === '' ? "''" : `'${value}'`;
  }
  return value;
};

const innerMakePlain = (tree, key = '') => {
  const makeFlat = (prop) => {
    if (prop.status === 'deleted') {
      return `Property '${key}${prop.key}' was removed`;
    }

    if (prop.status === 'unchanged key' && prop.nodes) {
      return innerMakePlain(prop.nodes, `${key}${prop.key}.`);
    }

    if (prop.status === 'changed') {
      return `Property '${key}${prop.key}' was updated. From ${stringify(prop.valueBefore)} to ${stringify(prop.valueAfter)}`;
    }

    if (prop.status === 'added') {
      return `Property '${key}${prop.key}' was added with value: ${stringify(prop.valueBefore)}`;
    }

    return null;
  };

  const editedOutput = tree.map((prop) => makeFlat(prop));
  const filteredElements = editedOutput.filter((element) => element !== null);
  return filteredElements.join('\n');
};
const makePlain = (tree) => innerMakePlain(tree);
export default makePlain;
