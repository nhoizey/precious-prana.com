var project = require('./_project.js');
var os = require('os');
var gulp = require('gulp');

// Copy our core fonts to the dist folder
gulp.task('fonts', function copyFonts(done) {
  gulp
    .src(project.buildSrc + '/fonts/*')
    .pipe(gulp.dest(project.buildDest + '/fonts'));
  done();
});
