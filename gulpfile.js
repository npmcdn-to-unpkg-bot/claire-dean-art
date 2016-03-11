var gulp = require('gulp');
var compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss  = require('gulp-cssnano'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util');
var path = require('path');

// var webpackConfig = require('./webpack.config.js');
var gutil = require('gulp-util');

var BUILD_DIR = path.resolve(__dirname, 'public/css');

// Styles
gulp.task('styles', function(callback) {
  return gulp.src(['./styles/**/*'])
    .pipe(compass({
        sass     : './styles/',
        css      : BUILD_DIR,
        logging  : true,
        comments : false,
        style    : 'compressed'
    }))
    .on('error', function(err) {
        gutil.log("[styles]", err.toString());
        callback();
    })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ff 17', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifycss())
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('watch', ['styles'], function(){
    gulp.watch('./styles/**/*', ['styles'])
});
