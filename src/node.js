class Node {
  constructor(status = null, key = null, valueBefore = null, valueAfter = null, nodes = []) {
    this.status = status;
    this.key = key;
    this.valueBefore = valueBefore;
    this.valueAfter = valueAfter;
    this.nodes = nodes;
  }

  addNode(status, key, valueBefore, valueAfter, nodes) {
    const node = new Node(
      status, key, valueBefore, valueAfter, nodes,
    );
    this.nodes.push(node);
    return node;
  }

  getChildren() {
    return this.nodes;
  }
}
export default Node;
