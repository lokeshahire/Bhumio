export const sort = (data, columnIndex) => {
  return [...data].sort((a, b) => {
    const valueA = a[columnIndex];
    const valueB = b[columnIndex];
    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  });
};
