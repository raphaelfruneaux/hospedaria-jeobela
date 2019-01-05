const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const paths = {
  styles: {
    src: 'src/assets/styles/**/*.scss',
    dest: './dist/'
  },
  scripts: {
    src: 'src/assets/scripts/**/*.js',
    dest: './dist/'
  },
  images: {
    src: 'src/assets/img/**/*',
    dest: './dist/img/'
  },
  html: {
    src: 'src/**/*.html',
    dest: './dist/'
  }
};

const clean = () => del(['dist']);
gulp.task('clean', clean);


const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    .pipe(concat('styles.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
};
gulp.task('styles', styles);

const scripts = () => {
  return gulp.src(paths.scripts.src).pipe(gulp.dest(paths.scripts.dest));
};
gulp.task('scripts', scripts);


const images = () => {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
};


const html = () => {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest));
};


const build = gulp.series(clean, gulp.parallel(styles, scripts, images, html));
gulp.task('build', build);



const serve = () => {
  browserSync.init({
    server: "./dist"
  });

  gulp.watch(paths.styles.src).on('change', gulp.series(styles, browserSync.reload));
  gulp.watch(paths.images.src).on('change', gulp.series(images, browserSync.reload));
  gulp.watch(paths.html.src).on('change', gulp.series(html, browserSync.reload));
}
gulp.task('default', gulp.series(gulp.parallel(styles, scripts, images, html), serve));
