var project = require("./_project.js");
var os = require("os");
var gulp = require("gulp");

// Copy files to the dist folder
gulp.task("files", function copyFiles(done) {
  gulp
    .src(project.buildSrc + "/files/*")
    .pipe(gulp.dest(project.buildDest + "/files"));
  done();
});
