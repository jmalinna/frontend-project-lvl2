import _ from 'lodash';

const getStatus = (status) => {
  switch (status) {
    case 'nested':
    case 'unchanged':
      return ' ';
    case 'added':
      return '+';
    case 'deleted':
      return '-';
    default:
      throw new Error(`Unknown status: '${status}'!`);
  }
};

const gapDifference = 4;
const getGaps = (num) => ' '.repeat(num);

const showValues = (value, depthLevel) => {
  const gaps = depthLevel * gapDifference;
  const depth = 1;
  const keys = Object.keys(value);
  const innerValue = keys.map((key) => {
    if (_.isObject(value[key])) {
      return `\n${getGaps(gaps)}${key}: {${showValues(value[key], depthLevel + depth)}\n${getGaps(gaps)}}`;
    }
    return `\n${getGaps(gaps)}${key}: ${value[key]}`;
  });
  return innerValue.join('');
};

const innerMakeStylish = (tree, depthLevel = 1) => {
  const gapAndSign = 2;
  const depth = 1;
  const gaps = depthLevel * gapDifference - gapAndSign;
  const isObj = (value) => {
    if (Array.isArray(value)) {
      return `[${value.join(', ')}]`;
    }
    return _.isObject(value) ? `{${showValues(value, depthLevel + depth)}\n${getGaps(gaps + gapAndSign)}}` : value;
  };

  const makeFlat = (prop) => {
    if (prop.children) {
      const nestedValue = innerMakeStylish(prop.children, depthLevel + depth);
      return `${getGaps(gaps)}${getStatus(prop.status)} ${prop.key}: ${nestedValue}`;
    }

    if (prop.status === 'changed') {
      return `${getGaps(gaps)}- ${prop.key}: ${isObj(prop.valueBefore)}\n${getGaps(gaps)}+ ${prop.key}: ${isObj(prop.valueAfter)}`;
    }

    return `${getGaps(gaps)}${getStatus(prop.status)} ${prop.key}: ${isObj(prop.valueBefore)}`;
  };

  const makeString = tree.map((prop) => makeFlat(prop)).join('\n');
  const print = `{\n${makeString}\n${getGaps(gaps - gapAndSign)}}`;
  return print;
};
const makeStylish = (tree) => innerMakeStylish(tree);
export default makeStylish;
