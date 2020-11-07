var project = require('./_project.js');
var gulp    = require('gulp');
var del   = require('del');

// cleanup the build output
gulp.task('clean-build', function () {
  return del([
    project.buildDest + '/**/*',
  ]);
});
