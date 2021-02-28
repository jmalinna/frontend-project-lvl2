/* eslint-disable quotes */
/* eslint-disable no-useless-escape */

const isBoolean = (value) => {
  if (value === '') {
    return `\""`;
  }
  return !value || value === true || typeof value === 'number' ? value : `"${value}"`;
};

const isObject = (value, func) => (value && typeof value === 'object' ? func(value) : value);

const checkType = (value, func) => {
  const innerValue = isObject(value, func);
  return typeof innerValue === 'object' && innerValue ? `{${innerValue}}` : isBoolean(innerValue);
};
export default checkType;
