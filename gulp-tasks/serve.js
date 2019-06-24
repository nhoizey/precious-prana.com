var project = require("./_project.js");
var gulp = require("gulp");
var serve = require("gulp-serve");

/*
 local webserver for development
*/
gulp.task(
  "serve",
  serve({
    root: [project.buildDest],
    hostname: "0.0.0.0",
    port: 8080
  })
);
