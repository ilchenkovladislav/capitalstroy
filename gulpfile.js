import gulp from "gulp";
import plumber from "gulp-plumber";
import sourcemap from "gulp-sourcemaps";

import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const scss = gulpSass(dartSass);

import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";

import browserSync from "browser-sync";
const sync = browserSync.create();

import csso from "gulp-csso";
import rename from "gulp-rename";
import { deleteAsync } from "del";

const html = () => {
  return gulp.src("src/*.html").pipe(gulp.dest("build"));
};

const js = () => {
  return gulp.src("src/js/*").pipe(gulp.dest("build/js"));
};

const copy = () => {
  return gulp
    .src(
      [
        "src/fonts/**/*.{woff,woff2}",
        "src/css/**",
        "src/img/**",
        "src/js/**",
        "src/*.ico",
      ],
      {
        base: "src",
      }
    )
    .pipe(gulp.dest("build"));
};

const clean = () => {
  return deleteAsync("build");
};

const server = () => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });

  gulp.watch("src/*.html", gulp.series(html)).on("change", sync.reload);
  gulp.watch("src/js/*.js", gulp.series(js)).on("change", sync.reload);
  gulp.watch("src/scss/**/*.scss", gulp.series(styles));
};

const styles = () => {
  return gulp
    .src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(scss())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

const build = gulp.series(clean, copy, styles, html);
const start = gulp.series(styles, server);
export { build, start };
