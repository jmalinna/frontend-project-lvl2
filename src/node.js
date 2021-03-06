/* eslint-disable arrow-body-style */
const makeNode = (status = null, key = null, valueBefore = null, valueAfter = null, nodes = []) => {
  return {
    status, key, valueBefore, valueAfter, nodes,
  };
};

const addNode = (tree, status, key, valueBefore, valueAfter, nodes) => {
  tree.nodes.push(makeNode(status, key, valueBefore, valueAfter, nodes));
  return tree;
};
export { makeNode, addNode };
