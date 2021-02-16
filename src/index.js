// import path from 'path';
// import fs from 'fs';
import uniq from 'lodash/fp/uniq.js';

const genDiff = (filepath1, filepath2) => {
  // const fullFilepath1 = path.resolve(process.cwd(filepath1), '__fixtures__', filepath1);
  // const fullFilepath2 = path.resolve(process.cwd(filepath2), '__fixtures__', filepath2);

  // const contentFilepath1 = fs.readFileSync(fullFilepath1);
  // const contentFilepath2 = fs.readFileSync(fullFilepath2);

  // const parsedJson1 = JSON.parse(contentFilepath1);
  // const parsedJson2 = JSON.parse(contentFilepath2);

  const sortedKeys1 = Object.keys(filepath1).sort(); // parsedJson1
  const sortedKeys2 = Object.keys(filepath2).sort(); // parsedJson2
  const allKeys = sortedKeys1.concat(sortedKeys2).sort();
  const uniqKeys = uniq(allKeys);

  const compareContents = (acc, key) => {
    const obj1HasKey = sortedKeys1.includes(key);
    const obj2HasKey = sortedKeys2.includes(key);
    const bothObjHaveKey = sortedKeys1.includes(key) && sortedKeys2.includes(key);
    const equalKeys = filepath1[key] === filepath2[key]; // parsedJson1[key] === parsedJson2[key]

    if (!obj2HasKey) {
      acc.push(`- ${key}: ${filepath1[key]}`); // parsedJson1
    }
    if (!obj1HasKey) {
      acc.push(`+ ${key}: ${filepath2[key]}`); // parsedJson2
    }
    if (bothObjHaveKey && equalKeys) {
      acc.push(`  ${key}: ${filepath1[key]}`); // parsedJson!
    }
    if (bothObjHaveKey && !equalKeys) {
      acc.push(`- ${key}: ${filepath1[key]}`); // parsedJson1
      acc.push(`+ ${key}: ${filepath2[key]}`); // parsedJson2
    }
    return acc;
  };

  const difference = uniqKeys.reduce(compareContents, []).join('\n  ');
  const differencePrint = `{\n  ${difference}\n}`;

  return differencePrint;
};
export default genDiff;
