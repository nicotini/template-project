const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const clean = require("gulp-clean");
const fs = require("fs");
const server = require("gulp-server-livereload");
const sourceMaps = require("gulp-sourcemaps");

const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const webpack = require("webpack-stream");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const changed = require('gulp-changed');
/* const icons = require('@fortawesome/fontawesome-free') */

const fileIncludeSettings = {
  prefix: "@@",
  basepath: "@file",
};
const serverOptions = {
  livereload: true,
  open: true,
};

gulp.task("clean:dev", function (done) {
  if (fs.existsSync("./build")) {
    return gulp.src("./build", { read: false }).pipe(clean());
  }
  done();
});

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: "Error <%= error.message %>",
      sound: false,
    }),
  };
};

gulp.task("html:dev", function () {
  return gulp
    .src(["./src/html/**/*.html","!./src/html/blocks/*.html"])
    .pipe(changed("./build/", {hasChanged: changed.compareContents}))
    .pipe(plumber(plumberNotify("HTML")))
    .pipe(fileInclude(fileIncludeSettings))
    .pipe(gulp.dest("./build/"));
});

gulp.task("sass:dev", function () {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(changed("./build/css/"))
    .pipe(plumber(plumberNotify("SCSS")))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("./build/css/"));
});
/* gulp.task("icons:dev", function () {
  return gulp
  .src("node_modules/@fortawesome/fontawesome-free/webfonts/*")
  .pipe(gulp.dest("./build/webfonts/"));
}) */

gulp.task("images:dev", function () {
  return gulp.src("./src/images/**/*")
  .pipe(changed("./build/images/"))
  .pipe(imagemin({ verbose: true }))
  .pipe(gulp.dest("./build/images/"));
});

gulp.task("fonts:dev", function () {
  return gulp.src("./src/fonts/**/*").pipe(gulp.dest("./build/webfonts/"));
});
gulp.task("files:dev", function () {
  return gulp.src("./src/files/**/*").pipe(gulp.dest("./build/files/"));
});

gulp.task("js:dev", function() {
    return gulp.src("./src/js/*.js")
    .pipe(plumber(plumberNotify("JS")))
    .pipe(babel())
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./build/js'))
});

gulp.task("server:dev", function () {
  return gulp.src("./build/").pipe(server(serverOptions));
});
gulp.task("watch:dev", function () {
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("sass:dev"));
  gulp.watch("./src/**/*.html", gulp.parallel("html:dev"));
  gulp.watch("./src/images/**/*", gulp.parallel("images:dev"));
  gulp.watch("./src/fonts/**/*", gulp.parallel("fonts:dev"));
  gulp.watch("./src/files/**/*", gulp.parallel("files:dev"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("js:dev"));
});

