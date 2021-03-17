const stringify = (value) => {
  const innerValue = typeof value === 'object' && value !== null ? '[complex value]' : value;

  if (innerValue === '[complex value]') {
    return innerValue;
  }

  switch (value) {
    case true:
      return true;
    case typeof value === 'number':
      return value;
    case '[complex value]':
      return '[complex value]';
    case '':
      return "''";
    default:
      return !value ? value : `'${value}'`;
  }
};

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
      const valueBefore = stringify(prop.valueBefore);
      const valueAfter = stringify(prop.valueAfter);
      return `Property '${key}${prop.key}' was updated. From ${valueBefore} to ${valueAfter}`;
    }

    if (prop.status === 'added' && !valueIsNull && valueIsObj) {
      return `Property '${key}${prop.key}' was added with value: [complex value]`;
    }

    if (prop.status === 'added' && (valueIsNull || !valueIsObj)) {
      return `Property '${key}${prop.key}' was added with value: ${stringify(prop.valueBefore)}`;
    }
    return null;
  };

  const editedOutput = nodes.map((prop) => makeFlat(prop));
  const filteredElements = editedOutput.filter((element) => element !== null);
  return filteredElements.join('\n');
};
export default makePlain;
