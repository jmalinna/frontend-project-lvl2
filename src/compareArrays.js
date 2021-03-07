const compareArrays = (obj1, obj2) => {
  // const comparedValues = obj1.reduce((acc, value) => {
  //   if (!obj2.includes(value)) {
  //     acc[0] = false;
  //     return acc;
  //   }
  //   acc[0] = true;
  //   return acc;
  // }, []);
  const comparedValues = obj1.filter((value) => {
    if (!obj2.includes(value)) {
      return false;
    }
    return true;
  });
  return comparedValues.includes(false) ? 'not equal' : 'equal';
};
export default compareArrays;
