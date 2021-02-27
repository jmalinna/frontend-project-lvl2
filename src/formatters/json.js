/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
const getValue = (value) => {
  const keys = Object.keys(value);
  const innerValue = keys.map((key) => {
    if (value[key] !== null && typeof (value[key]) === 'object') {
      return `"${key}":${getValue(value[key])}`;
    }
    return `"${key}":${(value[key])}`;
  });
  return `{${innerValue}}`;
};

const isBoolean = (value) => {
  if (value === '') {
    return `\""`;
  }
  return !value || value === true || typeof value === 'number' ? value : `"${value}"`;
};
const isObject = (value) => (value !== null && typeof value === 'object' ? getValue(value) : value);
const checkType = (value) => isBoolean(isObject(value));

const innerJson = (tree) => {
  const nodes = tree.nodes.length > 0 ? tree.nodes : tree;
  const makeFlat = (acc, prop) => {
    switch (prop.status) {
      case 'unchanged key':
        acc.push(`{"state":"updated","${prop.key}":${innerJson(prop)}}`);
        break;
      case 'changed':
        acc.push(`{"state":"updated","${prop.key}":{"valueBefore":${checkType(prop.valueBefore)},"valueAfter":${checkType(prop.valueAfter)}}}`);
        break;
      case 'deleted':
        acc.push(`{"state":"deleted","${prop.key}":${checkType(prop.valueBefore)}}`);
        break;
      case 'added':
        acc.push(`{"state":"added","${prop.key}":${checkType(prop.valueBefore)}}`);
        break;
      default:
        return acc;
    }
    return acc;
  };
  const arr = nodes.reduce(makeFlat, []);
  return arr;
};

const makeJson = (tree) => innerJson(tree).join('');
export default makeJson;
