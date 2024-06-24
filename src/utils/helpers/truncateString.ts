export const truncateString = (str, length) => {
  if (str.length <= length) {
    return str;
  }

  const truncatedLength = length - 3;
  return str.substring(0, truncatedLength) + "...";
};
