import _ from 'lodash';

const setStatus = (status) => {
  switch (status) {
    case 'unchanged key':
    case 'unchanged':
      return ' ';
    case 'added':
      return '+';
    case 'deleted':
      return '-';
    default:
      return `Unknown status: ${status}`;
  }
};

const gapDifference = 4;
const setGaps = (num, gap = ' ') => gap.repeat(num);

const showValues = (value, depthLevel) => {
  const gaps = depthLevel * gapDifference;
  const keys = Object.keys(value);
  const innerValue = keys.map((key) => {
    if (_.isObject(value[key])) {
      return `\n${setGaps(gaps)}${key}: {${showValues(value[key], depthLevel + 1)}\n${setGaps(gaps)}}`;
    }
    return `\n${setGaps(gaps)}${key}: ${value[key]}`;
  });
  return innerValue.join('');
};

const makeStylish = (tree, depthLevel = 1) => {
  const gapAndSign = 2;
  const gaps = depthLevel * gapDifference - gapAndSign;
  const isObj = (value) => {
    if (Array.isArray(value)) {
      return `[${value.join(', ')}]`;
    }
    return _.isObject(value) ? `{${showValues(value, depthLevel + 1)}\n${setGaps(gaps + gapAndSign)}}` : value;
  };

  const makeFlat = (prop) => {
    if (prop.nodes) {
      const nestedValue = makeStylish(prop.nodes, depthLevel + 1);
      return `${setGaps(gaps)}${setStatus(prop.status)} ${prop.key}: ${nestedValue}`;
    }

    if (prop.status === 'changed') {
      return `${setGaps(gaps)}- ${prop.key}: ${isObj(prop.valueBefore)}\n${setGaps(gaps)}+ ${prop.key}: ${isObj(prop.valueAfter)}`;
    }

    return `${setGaps(gaps)}${setStatus(prop.status)} ${prop.key}: ${isObj(prop.valueBefore)}`;
  };

  const makeString = tree.map((prop) => makeFlat(prop)).join('\n');
  const print = `{\n${makeString}\n${setGaps((depthLevel - 1) * gapDifference)}}`;
  return print;
};
export default makeStylish;
