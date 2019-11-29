const { DateTime } = require("luxon");

module.exports = function plainDate(value) {
  return DateTime.fromJSDate(value, { zone: "Europe/Paris" })
    .setLocale("fr")
    .toLocaleString(DateTime.DATE_FULL);
};
