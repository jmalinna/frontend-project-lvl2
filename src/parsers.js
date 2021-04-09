import yaml from 'js-yaml';

const parse = (format, data) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file format: '${format}'!`);
  }
};
export default parse;
