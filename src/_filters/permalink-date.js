module.exports = function permalinkDate(value) {
  const dateObject = new Date(value);

  // yyyy/mm/dd
  return dateObject
    .toISOString()
    .replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}).*$/, "$1/$2/$3");
};
