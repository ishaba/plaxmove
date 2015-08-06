gulp = require 'gulp'
plugins = require('gulp-load-plugins')(pattern: [
  '*{-,.}*'
])

gulp.task 'uglify', ->
  gulp.src '_src/plaxmove.js'
  .pipe plugins.rename 'plaxmove.min.js'
  .pipe plugins.uglify()
  .pipe gulp.dest '.'
  return

gulp.task 'default', ['uglify'], ->
  return
