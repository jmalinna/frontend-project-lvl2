import showStatus from '../status.js';
import isObject from '../typeCheckerStylish.js';

const gapDifference = 4;
const makeGap = (num, gap = ' ') => gap.repeat(num);

const showValues = (value, depthLevel) => {
  const gaps = depthLevel * gapDifference;
  const keys = Object.keys(value);
  const innerValue = keys.map((key) => {
    if (typeof value[key] === 'object' && value[key]) {
      return `\n${makeGap(gaps)}${key}: {${showValues(value[key], depthLevel + 1)}\n${makeGap(gaps)}}`;
    }
    return `\n${makeGap(gaps)}${key}: ${value[key]}`;
  });
  return innerValue;
};

const makeStylish = (tree, depthLevel = 1) => {
  const nodes = tree.nodes ? tree.nodes : tree;
  const gapAndSign = 2;
  const gaps = depthLevel * gapDifference - gapAndSign;

  const makeFlat = (prop) => {
    const valueBeforeIsObj = typeof prop.valueBefore === 'object';
    const valueIsObject = prop.valueBefore && valueBeforeIsObj ? prop.valueBefore : prop.valueAfter;

    if (prop.nodes) {
      const nestedValue = makeStylish(prop.nodes, depthLevel + 1);
      return `${makeGap(gaps)}${showStatus(prop.status)} ${prop.key}: ${nestedValue}`;
    }
    if (!prop.nodes && valueIsObject) {
      if (prop.status === 'changed') {
        return `${makeGap(gaps)}- ${prop.key}: ${isObject(prop.valueBefore, gaps, depthLevel + 1, showValues)}\n${makeGap(gaps)}+ ${prop.key}: ${isObject(prop.valueAfter, gaps, depthLevel + 1, showValues)}`;
      }
      return `${makeGap(gaps)}${showStatus(prop.status)} ${prop.key}: ${isObject(valueIsObject, gaps, depthLevel + 1, showValues)}`;
    }

    if (prop.status === 'changed') {
      return `${makeGap(gaps)}- ${prop.key}: ${prop.valueBefore}\n${makeGap(gaps)}+ ${prop.key}: ${prop.valueAfter}`;
    }
    return `${makeGap(gaps)}${showStatus(prop.status)} ${prop.key}: ${prop.valueBefore}`;
  };

  const makeString = nodes.map((prop) => makeFlat(prop)).join('\n');
  const print = `{\n${makeString}\n${makeGap((depthLevel - 1) * gapDifference)}}`;
  return print;
};
export default makeStylish;
