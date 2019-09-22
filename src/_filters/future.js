const { DateTime } = require("luxon");

module.exports = function future(value) {
  return (
    DateTime.fromJSDate(value, {
      zone: "Europe/Paris"
    })
      .diffNow("hours")
      .toObject().hours >= -24
  );
};
