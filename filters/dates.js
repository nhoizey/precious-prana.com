/*
A date formatter filter for Nunjucks
*/
module.exports = function(date, part) {
  var d = new Date(date);
  if(part == 'year') {
    return d.getUTCFullYear();
  }
  var month = [
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
  return d.getDate() + " " + month[d.getMonth()] + " " + sd.getUTCFullYear();
}
