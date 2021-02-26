/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
const isBoolean = (value) => {
  switch (value) {
    case true:
      return true;
    case '[complex value]':
      return '[complex value]';
    case '':
      return `\''`;
    default:
      return !value ? value : `'${value}'`;
  }
};
const isComplexValue = (value) => (typeof value === 'object' && value !== null ? '[complex value]' : value);
const isStr = (value) => isBoolean(value);

const makePlain = (tree, key = '') => {
  const nodes = tree.nodes.length > 0 ? tree.nodes : tree;

  const makeFlat = (acc, prop) => {
    const valueIsObj = typeof prop.valueBefore === 'object';
    const valueIsNull = prop.valueBefore === null;

    if (prop.status === 'deleted') {
      acc.push(`Property '${key}${prop.key}' was removed`);
    }

    if (prop.status === 'unchanged key' && prop.nodes.length > 0) {
      acc.push(makePlain(prop, `${key}${prop.key}.`));
    }

    if (prop.status === 'changed' && key) {
      const value1 = isComplexValue(prop.valueBefore);
      const value2 = isComplexValue(prop.valueAfter);
      acc.push(`Property '${key}${prop.key}' was updated. From ${isStr(value1)} to ${isStr(value2)}`);
    }

    if (prop.status === 'added' && !valueIsNull && valueIsObj) {
      acc.push(`Property '${key}${prop.key}' was added with value: [complex value]`);
    } else if (prop.status === 'added' && (valueIsNull || !valueIsObj)) {
      acc.push(`Property '${key}${prop.key}' was added with value: ${isBoolean(prop.valueBefore)}`);
    }

    return acc;
  };

  const makeString = nodes.reduce(makeFlat, []).join('\n');
  return makeString;
};
export default makePlain;
