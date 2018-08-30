var gulp         = require('gulp-async-tasks')(require('gulp'));
var data         = require('gulp-data');
var gulpBrowser  = require("gulp-browser");
var injectCSS    = require('gulp-inject-css');
var stylus       = require('gulp-stylus');
var nunjucks     = require('gulp-nunjucks');
var minify       = require('gulp-minifier');
var concat       = require('gulp-concat');
var inline       = require('gulp-inline-fonts');
const zip        = require('gulp-zip');
var merge        = require('merge-stream');

gulp.task('default', function() {
    gulp.run(['compile-banner-adtech-160x600']);
    gulp.run(['compile-banner-adtoma-160x600']);

    gulp.run(['compile-banner-adtech-200x600']);
    gulp.run(['compile-banner-adtoma-200x600']);

    gulp.run(['compile-banner-adtech-250x360']);
    gulp.run(['compile-banner-adtoma-250x360']);

    gulp.run(['compile-banner-adtech-300x250']);
    gulp.run(['compile-banner-adtoma-300x250']);

    gulp.run(['compile-banner-adtech-320x320']);
    gulp.run(['compile-banner-adtoma-320x320']);

    gulp.run(['compile-banner-adtech-468x240']);
    gulp.run(['compile-banner-adtoma-468x240']);

    gulp.run(['compile-banner-adtech-480x280']);
    gulp.run(['compile-banner-adtoma-480x280']);

    gulp.run(['compile-banner-adtech-480x320']);
    gulp.run(['compile-banner-adtoma-480x320']);

    gulp.run(['compile-banner-adtech-844x178']);
    gulp.run(['compile-banner-adtoma-844x178']);

    gulp.run(['compile-banner-adtech-980x240']);
    gulp.run(['compile-banner-adtoma-980x240']);
});

/*160x600*/

gulp.task('compile-img-160x600', function(){
    gulp.src('./src/160x600/img/*')
        .pipe(gulp.dest('./dist/public-adtech/160x600/'))
        .pipe(gulp.dest('./dist/public-adtoma/160x600/'));
});

gulp.task('compile-styl-160x600', function(){
    return gulp.src('./src/160x600/css/style.styl')
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
        .pipe(gulp.dest('./dist/styles/160x600/'))
});

gulp.task('compile-html-adtech-160x600', ['compile-styl-160x600', 'compile-img-160x600', 'compile-fonts-160x600'], function(){
    data = {
        _ADPATH_  : '',
        _ADCLICK_ : '_ADCLICK_',
        _ADCUID_  : '_ADCUID_',
        _ADADID_  : '_ADADID_',
        _ADBNID_  : '_ADBNID_',
        _ADTIME_  : '_ADTIME_'
    };

    return gulp.src('./src/160x600/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtech/160x600/'));
});

gulp.task('compile-html-adtoma-160x600', ['compile-styl-160x600', 'compile-img-160x600', 'compile-fonts-160x600'], function(){
    return gulp.src('./src/160x600/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtoma/160x600/'));
});

gulp.task('compile-banner-adtech-160x600', ['compile-html-adtech-160x600'], function(){

    return gulp.src(['./dist/public-adtech/160x600/index.html', './dist/public-adtech/160x600/image.jpg', './dist/public-adtech/160x600/logo.svg', './dist/public-adtech/160x600/stroke.svg'])
        .pipe(zip('V2_160x600_Adtech.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-banner-adtoma-160x600', ['compile-html-adtoma-160x600'], function(){

    return gulp.src(['./dist/public-adtoma/160x600/index.html', './dist/public-adtech/160x600/image.jpg', './dist/public-adtoma/160x600/logo.svg', './dist/public-adtoma/160x600/stroke.svg'])
        .pipe(zip('V2_160x600_Adtoma.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-js-160x600', function(){
    return gulp.src('./src/160x600/js/*.js')
        .pipe(gulpBrowser.browserify())
        .pipe(gulp.dest('./dist/public-adtoma/160x600/js/'))
        .pipe(gulp.dest('./dist/public-adtech/160x600/js/'))
});

gulp.task('compile-fonts-160x600', function() {

    var fontStream = merge();

    [300, 700].forEach(function(weight) {
        fontStream
            .add(gulp.src(`./src/160x600/fonts/${weight}.otf`)
                .pipe(inline({ name: 'font', weight: weight, formats: ['otf'] })));
    });

    return fontStream
        .pipe(concat('font.css'))
        .pipe(gulp.dest('./dist/styles/160x600/'));
});

/*200x600*/

gulp.task('compile-img-200x600', function(){
    gulp.src('./src/200x600/img/*')
        .pipe(gulp.dest('./dist/public-adtech/200x600/'))
        .pipe(gulp.dest('./dist/public-adtoma/200x600/'));
});

gulp.task('compile-styl-200x600', function(){
    return gulp.src('./src/200x600/css/style.styl')
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
        .pipe(gulp.dest('./dist/styles/200x600/'))
});

gulp.task('compile-html-adtech-200x600', ['compile-styl-200x600', 'compile-img-200x600', 'compile-fonts-200x600'], function(){
    data = {
        _ADPATH_  : '',
        _ADCLICK_ : '_ADCLICK_',
        _ADCUID_  : '_ADCUID_',
        _ADADID_  : '_ADADID_',
        _ADBNID_  : '_ADBNID_',
        _ADTIME_  : '_ADTIME_'
    };

    return gulp.src('./src/200x600/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtech/200x600/'));
});

gulp.task('compile-html-adtoma-200x600', ['compile-styl-200x600', 'compile-img-200x600', 'compile-fonts-200x600'], function(){
    return gulp.src('./src/200x600/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtoma/200x600/'));
});

gulp.task('compile-banner-adtech-200x600', ['compile-html-adtech-200x600'], function(){

    return gulp.src(['./dist/public-adtech/200x600/index.html', './dist/public-adtech/200x600/image.jpg', './dist/public-adtech/200x600/logo.svg', './dist/public-adtech/200x600/stroke.svg'])
        .pipe(zip('V2_200x600_Adtech.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-banner-adtoma-200x600', ['compile-html-adtoma-200x600'], function(){

    return gulp.src(['./dist/public-adtoma/200x600/index.html', './dist/public-adtech/200x600/image.jpg', './dist/public-adtoma/200x600/logo.svg', './dist/public-adtoma/200x600/stroke.svg'])
        .pipe(zip('V2_200x600_Adtoma.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-js-200x600', function(){
    return gulp.src('./src/200x600/js/*.js')
        .pipe(gulpBrowser.browserify())
        .pipe(gulp.dest('./dist/public-adtoma/200x600/js/'))
        .pipe(gulp.dest('./dist/public-adtech/200x600/js/'))
});

gulp.task('compile-fonts-200x600', function() {

    var fontStream = merge();

    [300, 700].forEach(function(weight) {
        fontStream
            .add(gulp.src(`./src/200x600/fonts/${weight}.otf`)
                .pipe(inline({ name: 'font', weight: weight, formats: ['otf'] })));
    });

    return fontStream
        .pipe(concat('font.css'))
        .pipe(gulp.dest('./dist/styles/200x600/'));
});

/*250x360*/

gulp.task('compile-img-250x360', function(){
    gulp.src('./src/250x360/img/*')
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
        .pipe(gulp.dest('./dist/styles/250x360/'))
});

gulp.task('compile-html-adtech-250x360', ['compile-styl-250x360', 'compile-img-250x360', 'compile-fonts-250x360'], function(){
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

gulp.task('compile-html-adtoma-250x360', ['compile-styl-250x360', 'compile-img-250x360', 'compile-fonts-250x360'], function(){
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

gulp.task('compile-banner-adtech-250x360', ['compile-html-adtech-250x360'], function(){

    return gulp.src(['./dist/public-adtech/250x360/index.html', './dist/public-adtech/250x360/image.jpg', './dist/public-adtech/250x360/logo.svg', './dist/public-adtech/250x360/stroke.svg'])
        .pipe(zip('V2_250x360_Adtech.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-banner-adtoma-250x360', ['compile-html-adtoma-250x360'], function(){

    return gulp.src(['./dist/public-adtoma/250x360/index.html', './dist/public-adtech/250x360/image.jpg', './dist/public-adtoma/250x360/logo.svg', './dist/public-adtoma/250x360/stroke.svg'])
        .pipe(zip('V2_250x360_Adtoma.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-js-250x360', function(){
    return gulp.src('./src/250x360/js/*.js')
        .pipe(gulpBrowser.browserify())
        .pipe(gulp.dest('./dist/public-adtoma/250x360/js/'))
        .pipe(gulp.dest('./dist/public-adtech/250x360/js/'))
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
        .pipe(gulp.dest('./dist/styles/250x360/'));
});

/*300x250*/

gulp.task('compile-img-300x250', function(){
    gulp.src('./src/300x250/img/*')
        .pipe(gulp.dest('./dist/public-adtech/300x250/'))
        .pipe(gulp.dest('./dist/public-adtoma/300x250/'));
});

gulp.task('compile-styl-300x250', function(){
    return gulp.src('./src/300x250/css/style.styl')
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
        .pipe(gulp.dest('./dist/styles/300x250/'))
});

gulp.task('compile-html-adtech-300x250', ['compile-styl-300x250', 'compile-img-300x250', 'compile-fonts-300x250'], function(){
    data = {
        _ADPATH_  : '',
        _ADCLICK_ : '_ADCLICK_',
        _ADCUID_  : '_ADCUID_',
        _ADADID_  : '_ADADID_',
        _ADBNID_  : '_ADBNID_',
        _ADTIME_  : '_ADTIME_'
    };

    return gulp.src('./src/300x250/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtech/300x250/'));
});

gulp.task('compile-html-adtoma-300x250', ['compile-styl-300x250', 'compile-img-300x250', 'compile-fonts-300x250'], function(){
    return gulp.src('./src/300x250/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtoma/300x250/'));
});

gulp.task('compile-banner-adtech-300x250', ['compile-html-adtech-300x250'], function(){

    return gulp.src(['./dist/public-adtech/300x250/index.html', './dist/public-adtech/300x250/image.jpg', './dist/public-adtech/300x250/logo.svg', './dist/public-adtech/300x250/stroke.svg'])
        .pipe(zip('V2_300x250_Adtech.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-banner-adtoma-300x250', ['compile-html-adtoma-300x250'], function(){

    return gulp.src(['./dist/public-adtoma/300x250/index.html', './dist/public-adtech/300x250/image.jpg', './dist/public-adtoma/300x250/logo.svg', './dist/public-adtoma/300x250/stroke.svg'])
        .pipe(zip('V2_300x250_Adtoma.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-js-300x250', function(){
    return gulp.src('./src/300x250/js/*.js')
        .pipe(gulpBrowser.browserify())
        .pipe(gulp.dest('./dist/public-adtoma/300x250/js/'))
        .pipe(gulp.dest('./dist/public-adtech/300x250/js/'))
});

gulp.task('compile-fonts-300x250', function() {

    var fontStream = merge();

    [300, 700].forEach(function(weight) {
        fontStream
            .add(gulp.src(`./src/300x250/fonts/${weight}.otf`)
                .pipe(inline({ name: 'font', weight: weight, formats: ['otf'] })));
    });

    return fontStream
        .pipe(concat('font.css'))
        .pipe(gulp.dest('./dist/styles/300x250/'));
});

/*320x320*/

gulp.task('compile-img-320x320', function(){
    gulp.src('./src/320x320/img/*')
        .pipe(gulp.dest('./dist/public-adtech/320x320/'))
        .pipe(gulp.dest('./dist/public-adtoma/320x320/'));
});

gulp.task('compile-styl-320x320', function(){
    return gulp.src('./src/320x320/css/style.styl')
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
        .pipe(gulp.dest('./dist/styles/320x320/'))
});

gulp.task('compile-html-adtech-320x320', ['compile-styl-320x320', 'compile-img-320x320', 'compile-fonts-320x320'], function(){
    data = {
        _ADPATH_  : '',
        _ADCLICK_ : '_ADCLICK_',
        _ADCUID_  : '_ADCUID_',
        _ADADID_  : '_ADADID_',
        _ADBNID_  : '_ADBNID_',
        _ADTIME_  : '_ADTIME_'
    };

    return gulp.src('./src/320x320/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtech/320x320/'));
});

gulp.task('compile-html-adtoma-320x320', ['compile-styl-320x320', 'compile-img-320x320', 'compile-fonts-320x320'], function(){
    return gulp.src('./src/320x320/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtoma/320x320/'));
});

gulp.task('compile-banner-adtech-320x320', ['compile-html-adtech-320x320'], function(){

    return gulp.src(['./dist/public-adtech/320x320/index.html', './dist/public-adtech/320x320/image.jpg', './dist/public-adtech/320x320/logo.svg', './dist/public-adtech/320x320/stroke.svg'])
        .pipe(zip('V2_320x320_Adtech.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-banner-adtoma-320x320', ['compile-html-adtoma-320x320'], function(){

    return gulp.src(['./dist/public-adtoma/320x320/index.html', './dist/public-adtech/320x320/image.jpg', './dist/public-adtoma/320x320/logo.svg', './dist/public-adtoma/320x320/stroke.svg'])
        .pipe(zip('V2_320x320_Adtoma.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-js-320x320', function(){
    return gulp.src('./src/320x320/js/*.js')
        .pipe(gulpBrowser.browserify())
        .pipe(gulp.dest('./dist/public-adtoma/320x320/js/'))
        .pipe(gulp.dest('./dist/public-adtech/320x320/js/'))
});

gulp.task('compile-fonts-320x320', function() {

    var fontStream = merge();

    [300, 700].forEach(function(weight) {
        fontStream
            .add(gulp.src(`./src/320x320/fonts/${weight}.otf`)
                .pipe(inline({ name: 'font', weight: weight, formats: ['otf'] })));
    });

    return fontStream
        .pipe(concat('font.css'))
        .pipe(gulp.dest('./dist/styles/320x320/'));
});

/*468x240*/

gulp.task('compile-img-468x240', function(){
    gulp.src('./src/468x240/img/*')
        .pipe(gulp.dest('./dist/public-adtech/468x240/'))
        .pipe(gulp.dest('./dist/public-adtoma/468x240/'));
});

gulp.task('compile-styl-468x240', function(){
    return gulp.src('./src/468x240/css/style.styl')
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
        .pipe(gulp.dest('./dist/styles/468x240/'))
});

gulp.task('compile-html-adtech-468x240', ['compile-styl-468x240', 'compile-img-468x240', 'compile-fonts-468x240'], function(){
    data = {
        _ADPATH_  : '',
        _ADCLICK_ : '_ADCLICK_',
        _ADCUID_  : '_ADCUID_',
        _ADADID_  : '_ADADID_',
        _ADBNID_  : '_ADBNID_',
        _ADTIME_  : '_ADTIME_'
    };

    return gulp.src('./src/468x240/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtech/468x240/'));
});

gulp.task('compile-html-adtoma-468x240', ['compile-styl-468x240', 'compile-img-468x240', 'compile-fonts-468x240'], function(){
    return gulp.src('./src/468x240/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtoma/468x240/'));
});

gulp.task('compile-banner-adtech-468x240', ['compile-html-adtech-468x240'], function(){

    return gulp.src(['./dist/public-adtech/468x240/index.html', './dist/public-adtech/468x240/image.jpg', './dist/public-adtech/468x240/logo.svg', './dist/public-adtech/468x240/stroke.svg'])
        .pipe(zip('V2_468x240_Adtech.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-banner-adtoma-468x240', ['compile-html-adtoma-468x240'], function(){

    return gulp.src(['./dist/public-adtoma/468x240/index.html', './dist/public-adtech/468x240/image.jpg', './dist/public-adtoma/468x240/logo.svg', './dist/public-adtoma/468x240/stroke.svg'])
        .pipe(zip('V2_468x240_Adtoma.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-js-468x240', function(){
    return gulp.src('./src/468x240/js/*.js')
        .pipe(gulpBrowser.browserify())
        .pipe(gulp.dest('./dist/public-adtoma/468x240/js/'))
        .pipe(gulp.dest('./dist/public-adtech/468x240/js/'))
});

gulp.task('compile-fonts-468x240', function() {

    var fontStream = merge();

    [300, 700].forEach(function(weight) {
        fontStream
            .add(gulp.src(`./src/468x240/fonts/${weight}.otf`)
                .pipe(inline({ name: 'font', weight: weight, formats: ['otf'] })));
    });

    return fontStream
        .pipe(concat('font.css'))
        .pipe(gulp.dest('./dist/styles/468x240/'));
});

/*480x280*/

gulp.task('compile-img-480x280', function(){
    gulp.src('./src/480x280/img/*')
        .pipe(gulp.dest('./dist/public-adtech/480x280/'))
        .pipe(gulp.dest('./dist/public-adtoma/480x280/'));
});

gulp.task('compile-styl-480x280', function(){
    return gulp.src('./src/480x280/css/style.styl')
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
        .pipe(gulp.dest('./dist/styles/480x280/'))
});

gulp.task('compile-html-adtech-480x280', ['compile-styl-480x280', 'compile-img-480x280', 'compile-fonts-480x280'], function(){
    data = {
        _ADPATH_  : '',
        _ADCLICK_ : '_ADCLICK_',
        _ADCUID_  : '_ADCUID_',
        _ADADID_  : '_ADADID_',
        _ADBNID_  : '_ADBNID_',
        _ADTIME_  : '_ADTIME_'
    };

    return gulp.src('./src/480x280/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtech/480x280/'));
});

gulp.task('compile-html-adtoma-480x280', ['compile-styl-480x280', 'compile-img-480x280', 'compile-fonts-480x280'], function(){
    return gulp.src('./src/480x280/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtoma/480x280/'));
});

gulp.task('compile-banner-adtech-480x280', ['compile-html-adtech-480x280'], function(){

    return gulp.src(['./dist/public-adtech/480x280/index.html', './dist/public-adtech/480x280/image.jpg', './dist/public-adtech/480x280/logo.svg', './dist/public-adtech/480x280/stroke.svg'])
        .pipe(zip('V2_480x280_Adtech.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-banner-adtoma-480x280', ['compile-html-adtoma-480x280'], function(){

    return gulp.src(['./dist/public-adtoma/480x280/index.html', './dist/public-adtech/480x280/image.jpg', './dist/public-adtoma/480x280/logo.svg', './dist/public-adtoma/480x280/stroke.svg'])
        .pipe(zip('V2_480x280_Adtoma.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-js-480x280', function(){
    return gulp.src('./src/480x280/js/*.js')
        .pipe(gulpBrowser.browserify())
        .pipe(gulp.dest('./dist/public-adtoma/480x280/js/'))
        .pipe(gulp.dest('./dist/public-adtech/480x280/js/'))
});

gulp.task('compile-fonts-480x280', function() {

    var fontStream = merge();

    [300, 700].forEach(function(weight) {
        fontStream
            .add(gulp.src(`./src/480x280/fonts/${weight}.otf`)
                .pipe(inline({ name: 'font', weight: weight, formats: ['otf'] })));
    });

    return fontStream
        .pipe(concat('font.css'))
        .pipe(gulp.dest('./dist/styles/480x280/'));
});

/*480x320*/

gulp.task('compile-img-480x320', function(){
    gulp.src('./src/480x320/img/*')
        .pipe(gulp.dest('./dist/public-adtech/480x320/'))
        .pipe(gulp.dest('./dist/public-adtoma/480x320/'));
});

gulp.task('compile-styl-480x320', function(){
    return gulp.src('./src/480x320/css/style.styl')
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
        .pipe(gulp.dest('./dist/styles/480x320/'))
});

gulp.task('compile-html-adtech-480x320', ['compile-styl-480x320', 'compile-img-480x320', 'compile-fonts-480x320'], function(){
    data = {
        _ADPATH_  : '',
        _ADCLICK_ : '_ADCLICK_',
        _ADCUID_  : '_ADCUID_',
        _ADADID_  : '_ADADID_',
        _ADBNID_  : '_ADBNID_',
        _ADTIME_  : '_ADTIME_'
    };

    return gulp.src('./src/480x320/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtech/480x320/'));
});

gulp.task('compile-html-adtoma-480x320', ['compile-styl-480x320', 'compile-img-480x320', 'compile-fonts-480x320'], function(){
    return gulp.src('./src/480x320/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtoma/480x320/'));
});

gulp.task('compile-banner-adtech-480x320', ['compile-html-adtech-480x320'], function(){

    return gulp.src(['./dist/public-adtech/480x320/index.html', './dist/public-adtech/480x320/image.jpg', './dist/public-adtech/480x320/logo.svg', './dist/public-adtech/480x320/stroke.svg'])
        .pipe(zip('V2_480x320_Adtech.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-banner-adtoma-480x320', ['compile-html-adtoma-480x320'], function(){

    return gulp.src(['./dist/public-adtoma/480x320/index.html', './dist/public-adtech/480x320/image.jpg', './dist/public-adtoma/480x320/logo.svg', './dist/public-adtoma/480x320/stroke.svg'])
        .pipe(zip('V2_480x320_Adtoma.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-js-480x320', function(){
    return gulp.src('./src/480x320/js/*.js')
        .pipe(gulpBrowser.browserify())
        .pipe(gulp.dest('./dist/public-adtoma/480x320/js/'))
        .pipe(gulp.dest('./dist/public-adtech/480x320/js/'))
});

gulp.task('compile-fonts-480x320', function() {

    var fontStream = merge();

    [300, 700].forEach(function(weight) {
        fontStream
            .add(gulp.src(`./src/480x320/fonts/${weight}.otf`)
                .pipe(inline({ name: 'font', weight: weight, formats: ['otf'] })));
    });

    return fontStream
        .pipe(concat('font.css'))
        .pipe(gulp.dest('./dist/styles/480x320/'));
});

/*844x178*/

gulp.task('compile-img-844x178', function(){
    gulp.src('./src/844x178/img/*')
        .pipe(gulp.dest('./dist/public-adtech/844x178/'))
        .pipe(gulp.dest('./dist/public-adtoma/844x178/'));
});

gulp.task('compile-styl-844x178', function(){
    return gulp.src('./src/844x178/css/style.styl')
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
        .pipe(gulp.dest('./dist/styles/844x178/'))
});

gulp.task('compile-html-adtech-844x178', ['compile-styl-844x178', 'compile-img-844x178', 'compile-fonts-844x178'], function(){
    data = {
        _ADPATH_  : '',
        _ADCLICK_ : '_ADCLICK_',
        _ADCUID_  : '_ADCUID_',
        _ADADID_  : '_ADADID_',
        _ADBNID_  : '_ADBNID_',
        _ADTIME_  : '_ADTIME_'
    };

    return gulp.src('./src/844x178/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtech/844x178/'));
});

gulp.task('compile-html-adtoma-844x178', ['compile-styl-844x178', 'compile-img-844x178', 'compile-fonts-844x178'], function(){
    return gulp.src('./src/844x178/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtoma/844x178/'));
});

gulp.task('compile-banner-adtech-844x178', ['compile-html-adtech-844x178'], function(){

    return gulp.src(['./dist/public-adtech/844x178/index.html', './dist/public-adtech/844x178/image.jpg', './dist/public-adtech/844x178/logo.svg', './dist/public-adtech/844x178/stroke.svg'])
        .pipe(zip('V2_844x178_Adtech.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-banner-adtoma-844x178', ['compile-html-adtoma-844x178'], function(){

    return gulp.src(['./dist/public-adtoma/844x178/index.html', './dist/public-adtech/844x178/image.jpg', './dist/public-adtoma/844x178/logo.svg', './dist/public-adtoma/844x178/stroke.svg'])
        .pipe(zip('V2_844x178_Adtoma.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-js-844x178', function(){
    return gulp.src('./src/844x178/js/*.js')
        .pipe(gulpBrowser.browserify())
        .pipe(gulp.dest('./dist/public-adtoma/844x178/js/'))
        .pipe(gulp.dest('./dist/public-adtech/844x178/js/'))
});

gulp.task('compile-fonts-844x178', function() {

    var fontStream = merge();

    [300, 700].forEach(function(weight) {
        fontStream
            .add(gulp.src(`./src/844x178/fonts/${weight}.otf`)
                .pipe(inline({ name: 'font', weight: weight, formats: ['otf'] })));
    });

    return fontStream
        .pipe(concat('font.css'))
        .pipe(gulp.dest('./dist/styles/844x178/'));
});

/*980x240*/

gulp.task('compile-img-980x240', function(){
    gulp.src('./src/980x240/img/*')
        .pipe(gulp.dest('./dist/public-adtech/980x240/'))
        .pipe(gulp.dest('./dist/public-adtoma/980x240/'));
});

gulp.task('compile-styl-980x240', function(){
    return gulp.src('./src/980x240/css/style.styl')
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
        .pipe(gulp.dest('./dist/styles/980x240/'))
});

gulp.task('compile-html-adtech-980x240', ['compile-styl-980x240', 'compile-img-980x240', 'compile-fonts-980x240'], function(){
    data = {
        _ADPATH_  : '',
        _ADCLICK_ : '_ADCLICK_',
        _ADCUID_  : '_ADCUID_',
        _ADADID_  : '_ADADID_',
        _ADBNID_  : '_ADBNID_',
        _ADTIME_  : '_ADTIME_'
    };

    return gulp.src('./src/980x240/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtech/980x240/'));
});

gulp.task('compile-html-adtoma-980x240', ['compile-styl-980x240', 'compile-img-980x240', 'compile-fonts-980x240'], function(){
    return gulp.src('./src/980x240/templates/index.html')
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
        .pipe(gulp.dest('./dist/public-adtoma/980x240/'));
});

gulp.task('compile-banner-adtech-980x240', ['compile-html-adtech-980x240'], function(){

    return gulp.src(['./dist/public-adtech/980x240/index.html', './dist/public-adtech/980x240/image.jpg', './dist/public-adtech/980x240/logo.svg', './dist/public-adtech/980x240/stroke.svg'])
        .pipe(zip('V2_980x240_Adtech.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-banner-adtoma-980x240', ['compile-html-adtoma-980x240'], function(){

    return gulp.src(['./dist/public-adtoma/980x240/index.html', './dist/public-adtech/980x240/image.jpg', './dist/public-adtoma/980x240/logo.svg', './dist/public-adtoma/980x240/stroke.svg'])
        .pipe(zip('V2_980x240_Adtoma.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-js-980x240', function(){
    return gulp.src('./src/980x240/js/*.js')
        .pipe(gulpBrowser.browserify())
        .pipe(gulp.dest('./dist/public-adtoma/980x240/js/'))
        .pipe(gulp.dest('./dist/public-adtech/980x240/js/'))
});

gulp.task('compile-fonts-980x240', function() {

    var fontStream = merge();

    [300, 700].forEach(function(weight) {
        fontStream
            .add(gulp.src(`./src/980x240/fonts/${weight}.otf`)
                .pipe(inline({ name: 'font', weight: weight, formats: ['otf'] })));
    });

    return fontStream
        .pipe(concat('font.css'))
        .pipe(gulp.dest('./dist/styles/980x240/'));
});