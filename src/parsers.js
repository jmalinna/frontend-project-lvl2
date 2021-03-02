import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const buildPathAndParse = (filepath) => {
  const fullFilepath = path.resolve(process.cwd(filepath), '__fixtures__', filepath);
  const contentFilepath = fs.readFileSync(fullFilepath);

  const format = path.extname(filepath);

  if (format === '.json') {
    return JSON.parse(contentFilepath);
  }
  if (format === '.yaml' || format === '.yml') {
    try {
      return yaml.load(contentFilepath);
    } catch (e) {
      console.log(e);
    }
  }
  return 'Unappropriate file format. Format must be .json or .yaml / .yml';
};
export default buildPathAndParse;
