/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
const isBoolean = (value) => {
  switch (value) {
    case true:
      return true;
    case typeof value === 'number':
      return value;
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
  const nodes = tree.nodes ? tree.nodes : tree;

  const makeFlat = (prop) => {
    const valueIsObj = typeof prop.valueBefore === 'object';
    const valueIsNull = prop.valueBefore === null;

    if (prop.status === 'deleted') {
      return `Property '${key}${prop.key}' was removed`;
    }

    if (prop.status === 'unchanged key' && prop.nodes) {
      return makePlain(prop, `${key}${prop.key}.`);
    }

    if (prop.status === 'changed' && key) {
      const value1 = isComplexValue(prop.valueBefore);
      const value2 = isComplexValue(prop.valueAfter);
      return `Property '${key}${prop.key}' was updated. From ${isStr(value1)} to ${isStr(value2)}`;
    }

    if (prop.status === 'added' && !valueIsNull && valueIsObj) {
      return `Property '${key}${prop.key}' was added with value: [complex value]`;
    }
    if (prop.status === 'added' && (valueIsNull || !valueIsObj)) {
      return `Property '${key}${prop.key}' was added with value: ${isBoolean(prop.valueBefore)}`;
    }
    return null;
  };

  const editedOutput = nodes.map((prop) => makeFlat(prop));
  const filteredElements = editedOutput.filter((element) => element !== null);
  return filteredElements.join('\n');
};
export default makePlain;
