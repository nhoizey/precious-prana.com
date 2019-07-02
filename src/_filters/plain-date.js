const appendSuffix = n => {
  return n + (n === 1 ? "er" : "");
};

module.exports = function plainDate(value) {
  const dateObject = new Date(value);

  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre"
  ];
  const dayWithSuffix = appendSuffix(dateObject.getDate());

  return `${dayWithSuffix} ${
    months[dateObject.getMonth()]
  } ${dateObject.getFullYear()}`;
};
