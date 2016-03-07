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
  CSS: './src/assets/css/*.css',
  JS: './src/assets/js/*.js',
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
  copy.dirSync('./bower_components/bootstrap/dist/css', './src/assets/css/vendor/bootstrap/css');
  copy.dirSync('./bower_components/bootstrap/dist/fonts', './src/assets/css/vendor/bootstrap/fonts');
  copy.dirSync('./bower_components/bootstrap/dist/js', './src/assets/js/vendor/bootstrap');
  copy.dirSync('./bower_components/font-awesome/css', './src/assets/css/vendor/font-awesome/css');
  copy.dirSync('./bower_components/font-awesome/fonts', './src/assets/css/vendor/font-awesome/fonts');
  copy('./bower_components/jquery/dist/jquery.min.js', './src/assets/js/vendor/jquery');
  copy('./bower_components/html5shiv/dist/*.min.js', './src/assets/js/vendor/html5shiv');
  copy('./bower_components/respond/dest/*.min.js', './src/assets/js/vendor/respond');
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
  return gulp.watch([ path.HTML, path.CSS, path.JS ], [ browserSync.reload ]);
})

gulp.task('build', function() {
  gulp.src(['./src/**/*']).pipe(gulp.dest(path.DEST));
});

gulp.task('default', ['serve']);
