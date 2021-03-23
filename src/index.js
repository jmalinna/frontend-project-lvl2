import fs from 'fs';
import path from 'path';
import formatData from './formatters/index.js';
import createTree from './tree.js';
import parse from './parsers.js';

const getFullFilepath = (filepath) => path.resolve(process.cwd(filepath), filepath);
const readFile = (fullFilepath) => fs.readFileSync(fullFilepath);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fullFilepath1 = getFullFilepath(filepath1);
  const fullFilepath2 = getFullFilepath(filepath2);
  const file1Content = readFile(fullFilepath1);
  const file2Content = readFile(fullFilepath2);

  const file1Format = path.extname(filepath1);
  const file2Format = path.extname(filepath2);

  const file1Data = parse(file1Format, file1Content);
  const file2Data = parse(file2Format, file2Content);
  const tree = createTree(file1Data, file2Data);
  const formattedData = formatData(tree, formatName);
  return formattedData;
};
export default genDiff;
