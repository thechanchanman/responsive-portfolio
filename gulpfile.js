/********************************************
** Required
********************************************/
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


/********************************************
** Paths
********************************************/
var dest = 'public';
var source = 'src';

var scripts = {
  // *** probably this section will be removed later ***
  // all scripts except vendor scripts (usually *.min.js files)
  in : source + '/js/**/*.js',
  out : 'js',
};

var styles = {
  main : source + '/scss/styles.scss',
  in : source + '/scss/**/*.scss',
  mainLess: [source + '/less/styles.less', source + '/less/frameworks.less'],
  allLess : source + '/less/**/*.less',
  out : 'css'
};

var htmlPages = {
  in : 'index.html'
};

/********************************************
** Script tasks
********************************************/
gulp.task('scripts', function(){
  gulp.src(scripts.in)
  .pipe(plumber())
  // optional --- initializing sourcemaps
  .pipe(sourcemaps.init())
  // adding .min suffix to file name
  // .pipe(rename({suffix:'.min'}))
  // minify
  .pipe(concat('main.js'))
  .pipe(uglify())
  // optional --- writing sourcemaps
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(scripts.out))
  .pipe(browserSync.reload({ stream:true }));
});

/********************************************
** Less tasks
********************************************/
gulp.task('less', function(){
  gulp.src(styles.mainLess)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(less({ outputStyle: 'expanded' }))
  .pipe(autoprefixer({browsers: ['last 5 versions']}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(styles.out))
  .pipe(browserSync.reload({ stream:true }));
});


/********************************************
** Compass / Sass tasks
********************************************/
gulp.task('sass', function(){
  gulp.src(styles.in)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'expanded' }))
  .pipe(autoprefixer({browsers: ['last 5 versions']}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(styles.out))
  .pipe(browserSync.reload({ stream:true }));
});

/********************************************
** HTML tasks
********************************************/
gulp.task('html', function(){
  gulp.src(htmlPages.in)
  .pipe(browserSync.reload({ stream:true }));
});

/********************************************
** Browser-Sync tasks
********************************************/
gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

/********************************************
** Watch tasks
********************************************/
gulp.task('watch', function(){
  // watch for changes on js files
  gulp.watch(scripts.in, ['scripts']);

  // watch for changes on scss files
  gulp.watch(styles.in, ['sass']);

  // watch for changes on less files
  gulp.watch(styles.allLess, ['less']);

  // watch for changes on html files
  gulp.watch(htmlPages.in, ['html']);
});

/********************************************
** Default task
********************************************/
// *** use browser-sync for serving html pages
// or php for php pages
//*** use webpack or scripts for javascript files
gulp.task('default', [
  'scripts',
  'less',
  'html',
  'browser-sync',
  'watch'
]);
