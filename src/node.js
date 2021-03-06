/* eslint-disable arrow-body-style */
const makeNode = (status = null, key = null, valueBefore = null, valueAfter = null, nodes = []) => {
  return {
    status, key, valueBefore, valueAfter, nodes,
  };
};

const addNode = (tree, status, key, valueBefore, valueAfter, nodes) => {
  const innerTree = tree;
  if (tree.nodes.length > 0) {
    innerTree.nodes = [...tree.nodes, makeNode(status, key, valueBefore, valueAfter, nodes)];
  } else {
    innerTree.nodes = [makeNode(status, key, valueBefore, valueAfter, nodes)];
  }
  return tree;
};
export { makeNode, addNode };
