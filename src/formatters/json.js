const innerJson = (tree) => {
  const nodes = tree.nodes.length > 0 ? tree.nodes : tree;
  const makeFlat = (acc, prop) => {
    switch (prop.status) {
      case 'unchanged key':
        acc.push({ key: prop.key, state: 'updated', value: innerJson(prop) });
        break;
      case 'changed':
        acc.push({
          key: prop.key, state: 'updated', valueBefore: prop.valueBefore, valueAfter: prop.valueAfter,
        });
        break;
      case 'deleted':
        acc.push({ key: prop.key, state: prop.status, value: prop.valueBefore });
        break;
      case 'added':
        acc.push({ key: prop.key, state: prop.status, value: prop.valueBefore });
        break;
      default:
        return acc;
    }
    return acc;
  };
  const json = nodes.reduce(makeFlat, []);
  return json;
};
const makeJson = (tree) => {
  const result = innerJson(tree);
  return JSON.stringify(result);
};
export default makeJson;
