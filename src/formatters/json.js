const innerJson = (tree) => {
  const nodes = tree.nodes ? tree.nodes : tree;
  const makeFlat = (prop) => {
    switch (prop.status) {
      case 'unchanged key':
        return { key: prop.key, state: 'updated', value: innerJson(prop) };
      case 'changed':
        return {
          key: prop.key, state: 'updated', valueBefore: prop.valueBefore, valueAfter: prop.valueAfter,
        };
      case 'deleted':
        return { key: prop.key, state: prop.status, value: prop.valueBefore };
      case 'added':
        return { key: prop.key, state: prop.status, value: prop.valueBefore };
      default:
        return null;
    }
  };
  const json = nodes.map((prop) => makeFlat(prop));
  const filteredJson = json.filter((element) => element !== null);
  return filteredJson;
};
const makeJson = (tree) => {
  const result = innerJson(tree);
  return JSON.stringify(result);
};
export default makeJson;
