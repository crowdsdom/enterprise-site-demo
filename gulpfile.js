var gulp = require('gulp');
var copy = require('copy');
var del = require('del');
var run = require('gulp-run');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var htmlreplace = require('gulp-html-replace');

var path = {
  HTML: './src/**/*.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js'
};

gulp.task('bower', function() {
  run('bower install').exec();
});

gulp.task('asset:copy', function(){
  copy.dirSync('./bower_components/bootstrap/dist/css', './src/assets/css/bootstrap/css');
  copy.dirSync('./bower_components/bootstrap/dist/fonts', './src/assets/css/bootstrap/fonts');
  copy.dirSync('./bower_components/bootstrap/dist/js', './src/assets/js/bootstrap');
  copy('./bower_components/jquery/dist/jquery.min.js', './src/assets/js');
});

gulp.task('asset:install', ['bower', 'asset:copy']);

gulp.task('server', function() {
  browserSync.init({
    server: {
     baseDir: './src' 
    }
  });
})

gulp.task('serve', ['server'], function() {
  return gulp.watch([ path.HTML ], [ browserSync.reload ]);
})
