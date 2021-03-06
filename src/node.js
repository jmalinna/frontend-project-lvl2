/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
const makeNode = (status = null, key = null, valueBefore = null, valueAfter = null, nodes = []) => {
  return {
    status, key, valueBefore, valueAfter, nodes,
  };
};

const addNode = (tree, status, key, valueBefore, valueAfter, nodes) => {
  if (tree.nodes.length > 0) {
    tree.nodes = [...tree.nodes, makeNode(status, key, valueBefore, valueAfter, nodes)];
  } else {
    tree.nodes = [makeNode(status, key, valueBefore, valueAfter, nodes)];
  }
  return tree;
};
export { makeNode, addNode };
