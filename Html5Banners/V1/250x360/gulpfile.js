var gulp         = require('gulp-async-tasks')(require('gulp'));
var inject       = require('gulp-inject');
var data         = require('gulp-data');
var watch        = require('gulp-watch');
var gulpBrowser  = require("gulp-browser");
var injectCSS    = require('gulp-inject-css');
var stylus       = require('gulp-stylus');
var nunjucks     = require('gulp-nunjucks');
var minify       = require('gulp-minifier');
var browserSync  = require('browser-sync').create();
var inline       = require('gulp-inline-fonts');
var concat       = require('gulp-concat');
var clean = require('gulp-clean');
const zip        = require('gulp-zip');
var merge        = require('merge-stream');

gulp.task('default', function() {

  gulp.run(['compile-banner']);
  gulp.run(['compile-banner-static']);

  browserSync.init({
    server: "./dist/test/"
  });

  gulp.watch('./src/css/**/*.styl', ['compile-styl', 'compile-fonts']);
  gulp.watch('./src/templates/**/*.html', ['compile-styl', 'compile-fonts', 'compile-html', 'compile-banner']);
  gulp.watch('./src/js/**/*.js', ['compile-js']);

});

gulp.task('compile-img', function(){
   gulp.src('./src/img/*')
    .pipe(gulp.dest('./dist/test/'))
    .pipe(gulp.dest('./dist/prod-static/'))
    .pipe(gulp.dest('./dist/prod/'));
});

gulp.task('compile-styl', function(){
  return gulp.src('./src/css/style.styl')
    .pipe(stylus())
    .pipe(minify({
      minify: true,
      minifyJS: true,
      uglifyJS: true,
      uglifyCSS: true,
      minifyCSS: true,
      minifyHTML: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist/test/'))
    .pipe(browserSync.stream());
});

gulp.task('compile-html', ['compile-styl', 'compile-img', 'compile-fonts'] ,function(){

  data = {
    _ADPATH_  : '',
    _ADCLICK_ : '',
    _ADCUID_  : '',
    _ADADID_  : '',
    _ADBNID_  : '',
    _ADTIME_  : ''
  };

  return gulp.src('./src/templates/index.html')
    .pipe(nunjucks.compile(data))
    .pipe(injectCSS())
    .pipe(gulp.dest('./dist/test/'));
});

gulp.task('compile-html-prod', ['compile-styl', 'compile-img', 'compile-fonts'], function(){
  data = {
    _ADPATH_  : '',
    _ADCLICK_ : '_ADCLICK_',
    _ADCUID_  : '_ADCUID_',
    _ADADID_  : '_ADADID_',
    _ADBNID_  : '_ADBNID_',
    _ADTIME_  : '_ADTIME_'
  };

  return gulp.src('./src/templates/index.html')
    .pipe(nunjucks.compile(data))
    .pipe(injectCSS())
    .pipe(minify({
      minify: true,
      minifyJS: true,
      uglifyJS: true,
      uglifyCSS: true,
      minifyCSS: true,
      minifyHTML: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist/prod/'));
});

gulp.task('compile-html-prod-static', ['compile-styl', 'compile-img', 'compile-fonts'], function(){
    return gulp.src('./src/templates/index.html')
        .pipe(nunjucks.compile())
        .pipe(injectCSS())
        .pipe(minify({
            minify: true,
            minifyJS: true,
            uglifyJS: true,
            uglifyCSS: true,
            minifyCSS: true,
            minifyHTML: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./dist/prod-static/'));
});

gulp.task('compile-banner', ['compile-html', 'compile-html-prod'], function(){

  return gulp.src(['./dist/prod/index.html', './dist/prod/image.jpg', './dist/prod/logo.svg', './dist/prod/stroke.svg'])
    .pipe(zip('Banner_V1_250x360.zip'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-banner-static', ['compile-html-prod-static'], function(){

    return gulp.src(['./dist/prod-static/index.html', './dist/prod-static/image.jpg', './dist/prod-static/logo.svg', './dist/prod-static/stroke.svg'])
        .pipe(zip('Banner_V1_250x360-static.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-js', function(){
  return gulp.src('./src/js/*.js')
    .pipe(gulpBrowser.browserify())
    .pipe(gulp.dest('./dist/prod-static/js/'))
    .pipe(gulp.dest('./dist/prod/js/'))
    .pipe(gulp.dest('./dist/test/js/'));
});

gulp.task('compile-fonts', function() {

  var fontStream = merge();

  [300, 700].forEach(function(weight) {
    fontStream
      .add(gulp.src(`./src/fonts/${weight}.otf`)
        .pipe(inline({ name: 'font', weight: weight, formats: ['otf'] })));
  });

  return fontStream
    .pipe(concat('font.css'))
    .pipe(gulp.dest('./dist/test/'));
});