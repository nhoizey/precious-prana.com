var project = require('./_project.js');
var os = require('os');
var gulp = require('gulp');

// Copy our core fonts to the dist folder
gulp.task('cms', function copyCMS(done) {
  gulp
    .src(project.buildSrc + '/admin/*')
    .pipe(gulp.dest(project.buildDest + '/admin'));
  done();
});
