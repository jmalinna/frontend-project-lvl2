const gap = ' ';

const showValues = (value, depthLevel) => {
  const keys = Object.keys(value);
  const innerValue = keys.map((key) => {
    const spaces = depthLevel * 4;
    if (typeof (value[key]) === 'object' && value[key] !== 'null') {
      return `\n${gap.repeat(spaces)}${key}: {${showValues(value[key], depthLevel + 1)}\n${gap.repeat(spaces)}}`;
    }
    return `\n${gap.repeat(spaces)}${key}: ${value[key]}`;
  });
  return innerValue;
};

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
      console.log(`Unknown status "${status}"`);
  }
  return `Unknown status "${status}"`;
};

const formatData = (tree, depthLevel = 1) => {
  const nodes = tree.nodes ? tree.nodes : tree;

  const makeFlat = (acc, prop) => {
    const valueBeforeIsObj = typeof prop.valueBefore === 'object';
    const valueAfterIsObj = typeof prop.valueAfter === 'object';
    const notNull1 = prop.valueBefore !== null;
    const notNull2 = prop.valueAfter !== null;
    const spaces = depthLevel * 4 - 2;
    if (prop.nodes.length > 0) {
      const deep = formatData(prop.nodes, depthLevel + 1);
      acc.push(`${gap.repeat(spaces)}${showStatus(prop.status)} ${prop.key}: ${deep}`);
      return acc;
    }

    if (prop.nodes.length < 1 && notNull1 && valueBeforeIsObj) {
      const value = showValues(prop.valueBefore, depthLevel + 1).join('');
      if (prop.status === 'changed') {
        acc.push(`${gap.repeat(spaces)}- ${prop.key}: {${value}\n${gap.repeat(spaces + 2)}}`);
        acc.push(`${gap.repeat(spaces)}+ ${prop.key}: ${prop.valueAfter}`);
      } else {
        acc.push(`${gap.repeat(spaces)}${showStatus(prop.status)} ${prop.key}: {${value}\n${gap.repeat(spaces + 2)}}`);
      }
      return acc;
    }
    if (prop.nodes.length < 1 && notNull2 && valueAfterIsObj) {
      const value = showValues(prop.valueAfter, depthLevel + 1).join('');
      if (prop.status === 'changed') {
        acc.push(`${gap.repeat(spaces)}- ${prop.key}: ${prop.valueBefore}`);
        acc.push(`${gap.repeat(spaces)}+ ${prop.key}: {${value}\n${gap.repeat(spaces + 2)}}`);
      } else {
        acc.push(`${gap.repeat(spaces)}${showStatus(prop.status)} ${prop.key}: {${value}\n${gap.repeat(spaces + 2)}}`);
      }
      return acc;
    }

    if (prop.status === 'changed') {
      acc.push(`${gap.repeat(spaces)}- ${prop.key}: ${prop.valueBefore}`);
      acc.push(`${gap.repeat(spaces)}+ ${prop.key}: ${prop.valueAfter}`);
    } else {
      acc.push(`${gap.repeat(spaces)}${showStatus(prop.status)} ${prop.key}: ${prop.valueBefore}`);
    }
    return acc;
  };

  const makeString = nodes.reduce(makeFlat, []).join('\n');
  const print = `{\n${makeString}\n${gap.repeat((depthLevel - 1) * 4)}}`;
  return print;
};

export default formatData;
