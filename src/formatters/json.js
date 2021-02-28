import checkType from '../typeCheckerJson.js';

const getValue = (value) => {
  const keys = Object.keys(value);
  const innerValue = keys.map((key) => `"${key}":${checkType(value[key], getValue)}`);
  return innerValue;
};

const makeJson = (tree) => {
  const nodes = tree.nodes.length > 0 ? tree.nodes : tree;
  const makeFlat = (acc, prop) => {
    switch (prop.status) {
      case 'unchanged key':
        acc.push(`{"state":"updated","${prop.key}":${makeJson(prop)}}`);
        break;
      case 'changed':
        acc.push(`{"state":"updated","${prop.key}":{"valueBefore":${checkType(prop.valueBefore, getValue)},"valueAfter":${checkType(prop.valueAfter, getValue)}}}`);
        break;
      case 'deleted':
        acc.push(`{"state":"deleted","${prop.key}":${checkType(prop.valueBefore, getValue)}}`);
        break;
      case 'added':
        acc.push(`{"state":"added","${prop.key}":${checkType(prop.valueBefore, getValue)}}`);
        break;
      default:
        return acc;
    }
    return acc;
  };
  const json = nodes.reduce(makeFlat, []).join(',');
  return json;
};
export default makeJson;
