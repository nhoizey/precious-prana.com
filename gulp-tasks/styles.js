var project = require("./_project.js");
var gulp = require("gulp");
var sass = require("gulp-sass");

/*
  Compile SCSS files to CSS
*/
gulp.task("styles", function() {
  return gulp
    .src(project.buildSrc + "/scss/styles.scss")
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(gulp.dest(project.buildSrc + "/_includes"));
});
