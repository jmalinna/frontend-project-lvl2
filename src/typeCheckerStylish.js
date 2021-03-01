import makeGap from './gap.js';

const isObject = (value, gaps, depthLevel, func) => {
  const signAndGap = 2;
  if (Array.isArray(value)) {
    return `[${value.join(', ')}]`;
  }
  if (!value || typeof value !== 'object') {
    return value;
  }
  const innerValue = func(value, depthLevel).join('');
  return `{${innerValue}\n${makeGap(gaps + signAndGap)}}`;
};
export default isObject;
