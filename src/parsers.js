import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const buildPathAndParse = (filepath) => {
  const fullFilepath = path.resolve(process.cwd(filepath), '__fixtures__', filepath);
  console.log('fullFilepath = ', fullFilepath);
  const contentFilepath = fs.readFileSync(fullFilepath);

  const format = path.extname(filepath);
  console.log('format = ', format);

  if (format === '.json') {
    return JSON.parse(contentFilepath);
  }
  if (format === '.yaml') {
    try {
      return yaml.load(contentFilepath);
    } catch (e) {
      console.log(e);
    }
  }
  return 'Unappropriate file format. Format must be .json or .yaml';
};
export default buildPathAndParse;
