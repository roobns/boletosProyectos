var gulp = require('gulp');
var webServer = require('gulp-webserver');
var stylus = require('gulp-stylus');
var nib = require('nib');
var cleanCSS = require('gulp-clean-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var htmlmin = require('gulp-html-minifier');
var imageop = require('gulp-image-optimization');
var concat = require('gulp-concat');



var config = {
  styles:{
    main:'./src/styles/main.styl',
    watch:'./src/styles/**/*.*',
    output:'./build/css'
  },
  indexMain:{
    watch:'./src/index.html',
    output:'./build'
  },
  views:{
    watch:'./src/views/*.html',
    output:'./build/views'
  },
  script:{
      main:'./src/script/app.js',
      watch:'./src/script/**/*.js',
      output:'./build/js',
      libs:'./src/script/librerias/*.*'
  },
  image:{
      watch:['./src/img/*.*'],
      output:'./build/img'
  }
};

gulp.task('server',function () {
  gulp.src('./build')
    .pipe(webServer({
      host: '127.0.0.1',
      port: 8085,
      livereload: true
    }));
});


gulp.task('build:css',function () {
  gulp.src(config.styles.main)
    .pipe(stylus({
        use: nib(),
        'include css':true
    }))
    .pipe(cleanCSS({keepSpecialComments:0}))
    .pipe(gulp.dest(config.styles.output));
});

gulp.task('build:js',function (){
    return browserify(config.script.main)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        /*.pipe(uglify({mangle: false}))*/
        .pipe(gulp.dest(config.script.output));
});

gulp.task('watch',function () {
  gulp.watch(config.image.watch,['images']);
  gulp.watch(config.styles.watch,['build:css']);
  gulp.watch(config.indexMain.watch,['indexMain']);
  gulp.watch(config.views.watch,['views']);
  gulp.watch(config.script.watch,['build:js']);
});

gulp.task('images', function(cb) {
    gulp.src([config.image.watch]).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest(config.image.output));
});

/*gulp.task('images',function (){
    gulp.src(config.image.watch)
            .pipe(gulp.dest(config.image.output));
});*/

gulp.task('indexMain',function (){
    gulp.src(config.indexMain.watch)
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(config.indexMain.output));
});

gulp.task('views',function (){
    gulp.src(config.views.watch)
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(config.views.output));
});

gulp.task('images',function (){
    gulp.src(config.image.watch)
            .pipe(gulp.dest(config.image.output));
});


gulp.task('librerias', function() {
    return gulp.src('./src/script/librerias/*.*')
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./build/js'));
});


gulp.task('cssLoader',function () {
  gulp.src('./src/styles/css/loading-bar.min.css')
    .pipe(cleanCSS({keepSpecialComments:0}))
    .pipe(gulp.dest('./build/css/'));
});


gulp.task('fonts', function() {
    return gulp.src([
                    './src/styles/css/fonts/*.*'])
            .pipe(gulp.dest('./build/css/fonts/'));});

gulp.task('build', ['build:css','build:js','views','indexMain','images','librerias','cssLoader','fonts']);

gulp.task('default',['server','watch','build']);
