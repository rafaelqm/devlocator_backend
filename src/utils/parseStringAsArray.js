module.exports = function parseStringAsArray(arrayAsString) {
  return arrayAsString.split(",").map(strSlice => strSlice.trim());
};
