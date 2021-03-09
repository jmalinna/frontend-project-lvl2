import yaml from 'js-yaml';
import path from 'path';

const parse = (filepath, fileContent) => {
  const format = path.extname(filepath);

  if (format === '.json') {
    return JSON.parse(fileContent);
  }
  if (format === '.yaml' || format === '.yml') {
    try {
      return yaml.load(fileContent);
    } catch (e) {
      console.log(e);
    }
  }
  return 'Unappropriate file format. Format must be .json or .yaml / .yml';
};
export default parse;
