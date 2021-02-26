import showStatus from '../status.js';
import makeGap from '../gap.js';

const showValues = (value, depthLevel) => {
  const keys = Object.keys(value);
  const innerValue = keys.map((key) => {
    const gaps = depthLevel * 4;
    if (typeof (value[key]) === 'object' && value[key] !== 'null') {
      return `\n${makeGap(gaps)}${key}: {${showValues(value[key], depthLevel + 1)}\n${makeGap(gaps)}}`;
    }
    return `\n${makeGap(gaps)}${key}: ${value[key]}`;
  });
  return innerValue;
};

const formatData = (tree, depthLevel = 1) => {
  const nodes = tree.nodes ? tree.nodes : tree;

  const makeFlat = (acc, prop) => {
    const valueBeforeIsObj = typeof prop.valueBefore === 'object';
    const valueAfterIsObj = typeof prop.valueAfter === 'object';
    const notNull1 = prop.valueBefore !== null;
    const notNull2 = prop.valueAfter !== null;
    const gaps = depthLevel * 4 - 2;

    if (prop.nodes.length > 0) {
      const deep = formatData(prop.nodes, depthLevel + 1);
      acc.push(`${makeGap(gaps)}${showStatus(prop.status)} ${prop.key}: ${deep}`);
      return acc;
    }

    if (prop.nodes.length < 1 && notNull1 && valueBeforeIsObj) {
      const value = showValues(prop.valueBefore, depthLevel + 1).join('');
      if (prop.status === 'changed') {
        acc.push(`${makeGap(gaps)}- ${prop.key}: {${value}\n${makeGap(gaps + 2)}}`);
        acc.push(`${makeGap(gaps)}+ ${prop.key}: ${prop.valueAfter}`);
      } else {
        acc.push(`${makeGap(gaps)}${showStatus(prop.status)} ${prop.key}: {${value}\n${makeGap(gaps + 2)}}`);
      }
      return acc;
    }
    if (prop.nodes.length < 1 && notNull2 && valueAfterIsObj) {
      const value = showValues(prop.valueAfter, depthLevel + 1).join('');
      if (prop.status === 'changed') {
        acc.push(`${makeGap(gaps)}- ${prop.key}: ${prop.valueBefore}`);
        acc.push(`${makeGap(gaps)}+ ${prop.key}: {${value}\n${makeGap(gaps + 2)}}`);
      } else {
        acc.push(`${makeGap(gaps)}${showStatus(prop.status)} ${prop.key}: {${value}\n${makeGap(gaps + 2)}}`);
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
  const print = `{\n${makeString}\n${makeGap((depthLevel - 1) * 4)}}`;
  return print;
};
export default formatData;
