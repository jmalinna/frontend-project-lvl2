import fs from 'fs';
import path from 'path';
import selectFormatter from './formatters/index.js';
import createTree from './formatters/tree.js';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const getFullFilepath = (filepath) => path.resolve(process.cwd(filepath), filepath);
  const readFile = (fullFilepath) => fs.readFileSync(fullFilepath);

  const fullFilepath1 = getFullFilepath(filepath1);
  const fullFilepath2 = getFullFilepath(filepath2);
  const file1Content = readFile(fullFilepath1);
  const file2Content = readFile(fullFilepath2);

  const parsedPath1 = parse(filepath1, file1Content);
  const parsedPath2 = parse(filepath2, file2Content);
  const tree = createTree(parsedPath1, parsedPath2);
  const formattedData = selectFormatter(tree, formatName);
  return formattedData;
};
export default genDiff;
