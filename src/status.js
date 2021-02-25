const showStatus = (status) => {
  switch (status) {
    case 'unchanged key':
      return ' ';
    case 'unchanged':
      return ' ';
    case 'added':
      return '+';
    case 'deleted':
      return '-';
    default:
      console.log(`Unknown status "${status}"`);
  }
  return `Unknown status "${status}"`;
};
export default showStatus;
