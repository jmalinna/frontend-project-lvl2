import yaml from 'js-yaml';

const parse = (format, fileContent) => {
  switch (format) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yaml':
    case '.yml':
      return yaml.load(fileContent);
    default:
      return 'Unappropriate file format. Format must be .json, .yaml or .yml';
  }
};
export default parse;
