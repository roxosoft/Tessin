var gulp         = require('gulp');
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

    gulp.run (['compile-banner']);

	browserSync.init({
		server: "./dist/test/"
	});

	gulp.watch('./src/css/**/*.styl', ['compile-styl', 'compile-fonts']);
	gulp.watch('./src/templates/**/*.html', ['compile-styl', 'compile-fonts', 'compile-html', 'compile-banner']);
    gulp.watch('./src/js/*.js', ['compile-js']);

});

gulp.task('compile-svg', function () {
    return gulp.src([
        './src/img/loading.svg',
        './src/img/logo.svg',
    ])
        .pipe(gulp.dest('./dist/test/'))
        .pipe(gulp.dest('./dist/prod/'));
});

gulp.task('compile-js', function () {
    return gulp.src([
        './src/js/main.js'
    ])
        .pipe(gulp.dest('./dist/test/'))
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
        .pipe(gulp.dest('./src/compiled-styles/'))
		.pipe(browserSync.stream());
});

gulp.task('compile-html', ['compile-js', 'compile-svg', 'compile-fonts', 'compile-styl'], function(){

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
    .pipe(gulp.dest('./dist/test/'));
});

gulp.task('compile-html-prod', [ 'compile-html'], function(){
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

gulp.task('compile-banner', ['compile-html-prod'], function(cb){
    data = {
    _ADPATH_  : '',
    _ADCLICK_ : '_ADCLICK_',
    _ADCUID_  : '_ADCUID_',
    _ADADID_  : '_ADADID_',
    _ADBNID_  : '_ADBNID_',
    _ADTIME_  : '_ADTIME_'
    };

    return gulp.src([
    './dist/prod/index.html',
    './dist/prod/loading.svg',
    './dist/prod/logo.svg',
    './dist/prod/main.js',
  ])
    .pipe(zip('widget.zip'))
    .pipe(gulp.dest('./dist/prod/'));

});

gulp.task('compile-js', function(){
  return gulp.src('./src/js/*.js')
    .pipe(gulpBrowser.browserify())
    .pipe(gulp.dest('./dist/prod/'))
    .pipe(gulp.dest('./dist/test/'));
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
    .pipe(gulp.dest('./src/compiled-styles/'))
    .pipe(gulp.dest('./dist/test/'));

});