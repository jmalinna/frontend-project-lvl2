const isObject = (value, gaps, depthLevel, func) => {
  const signAndGap = 2;
  const gap = ' ';

  if (Array.isArray(value)) {
    return `[${value.join(', ')}]`;
  }
  if (!value || typeof value !== 'object') {
    return value;
  }

  const innerValue = func(value, depthLevel).join('');
  return `{${innerValue}\n${gap.repeat(gaps + signAndGap)}}`;
};
export default isObject;
