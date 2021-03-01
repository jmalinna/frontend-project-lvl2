const compareArrays = (obj1, obj2) => {
  const comparedValues = obj1.reduce((acc, value) => {
    if (!obj2.includes(value)) {
      acc[0] = false;
      return acc;
    }
    acc[0] = true;
    return acc;
  }, []);

  return comparedValues.join('') === 'true' ? 'equal' : 'not equal';
};
export default compareArrays;
