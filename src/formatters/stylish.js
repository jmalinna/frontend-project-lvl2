import showStatus from '../status.js';
import makeGap from '../gap.js';
import isObject from '../typeCheckerStylish.js';

const gapDifference = 4;
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

  const makeFlat = (acc, prop) => {
    const valueBeforeIsObj = typeof prop.valueBefore === 'object';
    const valueIsObject = prop.valueBefore && valueBeforeIsObj ? prop.valueBefore : prop.valueAfter;

    if (prop.nodes.length > 0) {
      const nestedValue = makeStylish(prop.nodes, depthLevel + 1);
      acc.push(`${makeGap(gaps)}${showStatus(prop.status)} ${prop.key}: ${nestedValue}`);
      return acc;
    }
    if (prop.nodes.length < 1 && valueIsObject) {
      if (prop.status === 'changed') {
        acc.push(`${makeGap(gaps)}- ${prop.key}: ${isObject(prop.valueBefore, gaps, depthLevel + 1, showValues)}`);
        acc.push(`${makeGap(gaps)}+ ${prop.key}: ${isObject(prop.valueAfter, gaps, depthLevel + 1, showValues)}`);
      } else {
        acc.push(`${makeGap(gaps)}${showStatus(prop.status)} ${prop.key}: ${isObject(valueIsObject, gaps, depthLevel + 1, showValues)}`);
      }
      return acc;
    }

    if (prop.status === 'changed') {
      acc.push(`${makeGap(gaps)}- ${prop.key}: ${prop.valueBefore}`);
      acc.push(`${makeGap(gaps)}+ ${prop.key}: ${prop.valueAfter}`);
    } else {
      acc.push(`${makeGap(gaps)}${showStatus(prop.status)} ${prop.key}: ${prop.valueBefore}`);
    }
    return acc;
  };

  const makeString = nodes.reduce(makeFlat, []).join('\n');
  const print = `{\n${makeString}\n${makeGap((depthLevel - 1) * gapDifference)}}`;
  return print;
};
export default makeStylish;
