
'use strict';

var gulp = require('gulp'),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  nano = require('gulp-cssnano'),
  replaceName = require('gulp-replace-name'),
  uglify = require('gulp-uglify'),
  streamify = require('gulp-streamify');

gulp.task('default', ['less', 'js', 'watch']);

gulp.task('less', function() {
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'))
    .pipe(nano())
    .pipe(replaceName(/\.css/g, '.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function() {
  return browserify('./src/js/main.js')
    .transform(babelify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(rename('fo-tooltip.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(streamify(uglify()))
    .pipe(streamify(replaceName(/\.js/g, '.min.js')))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/less/*.less'], ['less']);
  gulp.watch(['./src/js/**/*.js'], ['js']);
});
