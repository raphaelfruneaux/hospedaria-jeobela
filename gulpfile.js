const gulp = require("gulp");
const del = require("del");

const paths = {
  styles: {
    src: "src/assets/styles/**/*.less",
    dest: "./dist/"
  },
  scripts: {
    src: "src/assets/scripts/**/*.js",
    dest: "./dist/"
  },
  html: {
    src: "src/**/*.html",
    dest: "./dist/"
  }
};

const clean = () => del(["dist"]);
gulp.task("clean", clean);

const styles = () => {
  return gulp.src(paths.styles.src).pipe(gulp.dest(paths.styles.dest));
};
gulp.task("styles", styles);

const scripts = () => {
  return gulp.src(paths.scripts.src).pipe(gulp.dest(paths.scripts.dest));
};
gulp.task("scripts", scripts);

const html = () => {
  return gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest));
};

const build = gulp.series(clean, gulp.parallel(styles, scripts, html));
gulp.task("build", build);
