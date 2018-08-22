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
var concat       = require('gulp-concat');
var inline       = require('gulp-inline-fonts');
var clean = require('gulp-clean');
const zip        = require('gulp-zip');
var merge        = require('merge-stream');

gulp.task('default', function() {

  gulp.run(['compile-banner-250x360']);
  gulp.run(['compile-banner-static-250x360']);
});

gulp.task('compile-img-250x360', function(){
   gulp.src('./src/250x360/img/*')
    .pipe(gulp.dest('./dist/test/250x360/'))
    .pipe(gulp.dest('./dist/public-adtech/250x360/'))
    .pipe(gulp.dest('./dist/public-adtoma/250x360/'));
});

gulp.task('compile-styl-250x360', function(){
  return gulp.src('./src/250x360/css/style.styl')
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
    .pipe(gulp.dest('./dist/test/250x360/'))
    .pipe(browserSync.stream());
});

gulp.task('compile-html-250x360', ['compile-styl-250x360', 'compile-img-250x360', 'compile-fonts-250x360'] ,function(){

  data = {
    _ADPATH_  : '',
    _ADCLICK_ : '',
    _ADCUID_  : '',
    _ADADID_  : '',
    _ADBNID_  : '',
    _ADTIME_  : ''
  };

  return gulp.src('./src/250x360/templates/index.html')
    .pipe(nunjucks.compile(data))
    .pipe(injectCSS())
    .pipe(gulp.dest('./dist/test/250x360/'));
});

gulp.task('compile-html-prod-250x360', ['compile-styl-250x360', 'compile-img-250x360', 'compile-fonts-250x360'], function(){
  data = {
    _ADPATH_  : '',
    _ADCLICK_ : '_ADCLICK_',
    _ADCUID_  : '_ADCUID_',
    _ADADID_  : '_ADADID_',
    _ADBNID_  : '_ADBNID_',
    _ADTIME_  : '_ADTIME_'
  };

  return gulp.src('./src/250x360/templates/index.html')
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
    .pipe(gulp.dest('./dist/public-adtech/250x360/'));
});

gulp.task('compile-html-prod-static-250x360', ['compile-styl-250x360', 'compile-img-250x360', 'compile-fonts-250x360'], function(){
    return gulp.src('./src/250x360/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtoma/250x360/'));
});

gulp.task('compile-banner-250x360', ['compile-html-250x360', 'compile-html-prod-250x360'], function(){

    return gulp.src(['./dist/public-adtech/250x360/index.html', './dist/public-adtech/250x360/image.jpg', './dist/public-adtech/250x360/logo.svg', './dist/public-adtech/250x360/stroke.svg'])
        .pipe(zip('Banner_V1_250x360-adtech.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-banner-static-250x360', ['compile-html-prod-static-250x360'], function(){

    return gulp.src(['./dist/public-adtoma/250x360/index.html', './dist/public-adtoma/250x360/image.jpg', './dist/public-adtoma/250x360/logo.svg', './dist/public-adtoma/250x360/stroke.svg'])
        .pipe(zip('Banner_V1_250x360-adtoma.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-js-250x360', function(){
  return gulp.src('./src/250x360/js/*.js')
    .pipe(gulpBrowser.browserify())
    .pipe(gulp.dest('./dist/public-adtoma/250x360/js/'))
    .pipe(gulp.dest('./dist/public-adtech/250x360/js/'))
    .pipe(gulp.dest('./dist/test/250x360/js/'));
});

gulp.task('compile-fonts-250x360', function() {

    var fontStream = merge();

    [300, 700].forEach(function(weight) {
        fontStream
            .add(gulp.src(`./src/250x360/fonts/${weight}.otf`)
                .pipe(inline({ name: 'font', weight: weight, formats: ['otf'] })));
    });

    return fontStream
        .pipe(concat('font.css'))
        .pipe(gulp.dest('./dist/test/250x360/'));
});