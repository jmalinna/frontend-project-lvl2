import yaml from 'js-yaml';

const parse = (format, data) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      return 'Unappropriate file format. Format must be .json, .yaml or .yml';
  }
};
export default parse;
