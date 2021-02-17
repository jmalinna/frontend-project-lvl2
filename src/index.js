import uniq from 'lodash/fp/uniq.js';

const genDiff = (obj1, obj2) => {
  const sortedKeys1 = Object.keys(obj1).sort();
  const sortedKeys2 = Object.keys(obj2).sort();
  const allKeys = sortedKeys1.concat(sortedKeys2).sort();
  const uniqKeys = uniq(allKeys);

  const compareContents = (acc, key) => {
    const obj1HasKey = sortedKeys1.includes(key);
    const obj2HasKey = sortedKeys2.includes(key);
    const equalKeys = sortedKeys1.includes(key) && sortedKeys2.includes(key);
    const equalValues = obj1[key] === obj2[key];

    if (!obj2HasKey) {
      acc.push(`- ${key}: ${obj1[key]}`);
    }
    if (!obj1HasKey) {
      acc.push(`+ ${key}: ${obj2[key]}`);
    }
    if (typeof (uniqKeys[key]) === 'object') {
      acc.push(genDiff(sortedKeys1[key], sortedKeys2[key]));
    }
    if (equalKeys && equalValues) {
      acc.push(`  ${key}: ${obj1[key]}`);
    }
    if (equalKeys && !equalValues) {
      acc.push(`- ${key}: ${obj1[key]}`);
      acc.push(`+ ${key}: ${obj2[key]}`);
    }
    return acc;
  };

  const difference = uniqKeys.reduce(compareContents, []);
  // const differencePrint = `{\n  ${difference}\n}`; join('\n  ')

  return difference;
};
export default genDiff;
