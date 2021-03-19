import _ from 'lodash';

const showStatus = (status) => {
  switch (status) {
    case 'unchanged key':
      return ' ';
    case 'unchanged':
      return ' ';
    case 'added':
      return '+';
    case 'deleted':
      return '-';
    default:
      return `Unknown status "${status}"`;
  }
};

const gapDifference = 4;
const makeGap = (num, gap = ' ') => gap.repeat(num);

const showValues = (value, depthLevel) => {
  const gaps = depthLevel * gapDifference;
  if (Array.isArray(value)) {
    return `[${value.join(', ')}]`;
  }
  const keys = Object.keys(value);
  const innerValue = keys.map((key) => {
    if (_.isObject(value[key])) {
      return `\n${makeGap(gaps)}${key}: {${showValues(value[key], depthLevel + 1)}\n${makeGap(gaps)}}`;
    }
    return `\n${makeGap(gaps)}${key}: ${value[key]}`;
  });
  return innerValue.join('');
};

const makeStylish = (tree, depthLevel = 1) => {
  const gapAndSign = 2;
  const gaps = depthLevel * gapDifference - gapAndSign;
  const signAndGap = 2;

  const makeFlat = (prop) => {
    if (prop.nodes) {
      const nestedValue = makeStylish(prop.nodes, depthLevel + 1);
      return `${makeGap(gaps)}${showStatus(prop.status)} ${prop.key}: ${nestedValue}`;
    }

    if (prop.status === 'changed') {
      const isObj = (value) => {
        if (Array.isArray(value)) {
          return `${showValues(value, depthLevel + 1)}`;
        }
        return _.isObject(value) ? `{${showValues(value, depthLevel + 1)}\n${makeGap(gaps + signAndGap)}}` : value;
      };

      return `${makeGap(gaps)}- ${prop.key}: ${isObj(prop.valueBefore)}\n${makeGap(gaps)}+ ${prop.key}: ${isObj(prop.valueAfter)}`;
    }

    if (_.isObject(prop.valueBefore)) {
      return `${makeGap(gaps)}${showStatus(prop.status)} ${prop.key}: {${showValues(prop.valueBefore, depthLevel + 1)}\n${makeGap(gaps + signAndGap)}}`;
    }
    return `${makeGap(gaps)}${showStatus(prop.status)} ${prop.key}: ${prop.valueBefore}`;
  };

  const makeString = tree.map((prop) => makeFlat(prop)).join('\n');
  const print = `{\n${makeString}\n${makeGap((depthLevel - 1) * gapDifference)}}`;
  return print;
};
export default makeStylish;
