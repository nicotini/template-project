const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
//sass
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webpCss = require('gulp-webp-css');

const htmlclean = require('gulp-htmlclean');
const webpHTML = require('gulp-webp-html');

const clean = require("gulp-clean");
const fs = require("fs");
const server = require("gulp-server-livereload");
const sourceMaps = require("gulp-sourcemaps");
const groupMedia = require("gulp-group-css-media-queries");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const webpack = require("webpack-stream");
const babel = require("gulp-babel");

//images
const imagemin = require("gulp-imagemin");
const webp = require('gulp-webp');
const changed = require('gulp-changed');


const fileIncludeSettings = {
  prefix: "@@",
  basepath: "@file",
};
const serverOptions = {
  livereload: true,
  open: true,
};

gulp.task("clean:docs", function (done) {
  if (fs.existsSync("./docs")) {
    return gulp.src("./docs", { read: false }).pipe(clean());
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

gulp.task("html:docs", function () {
  return gulp
    .src(["./src/html/**/*.html","!./src/html/blocks/*.html"])
    .pipe(changed("./docs/"))
    .pipe(plumber(plumberNotify("HTML")))
    .pipe(fileInclude(fileIncludeSettings))
    .pipe(webpHTML())
    .pipe(htmlclean())
    .pipe(gulp.dest("./docs/"));
});

gulp.task("sass:docs", function () {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(changed("./docs/css/"))
    .pipe(plumber(plumberNotify("SCSS")))
    .pipe(sourceMaps.init())
    .pipe(autoprefixer())
    .pipe(sassGlob())
    .pipe(webpCss())
    .pipe(groupMedia())
    .pipe(sass())
    .pipe(csso())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("./docs/css/"));
});

gulp.task("images:docs", function () {
  return gulp.src("./src/images/**/*")
  .pipe(changed("./docs/images/"))
  .pipe(webp())
  .pipe(gulp.dest("./docs/images/"))
  .pipe(gulp.src("./src/images/**/*"))
  .pipe(changed("./docs/images/"))
  .pipe(imagemin({ verbose: true }))
  .pipe(gulp.dest("./docs/images/"));
});

gulp.task("fonts:docs", function () {
  return gulp.src("./src/fonts/**/*").pipe(gulp.dest("./docs/webfonts/"));
});
gulp.task("files:docs", function () {
  return gulp.src("./src/files/**/*").pipe(gulp.dest("./docs/files/"));
});

gulp.task("js:docs", function() {
    return gulp.src("./src/js/*.js")
    .pipe(plumber(plumberNotify("JS")))
    .pipe(babel())
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(gulp.dest('./docs/js'))
});

gulp.task("server:docs", function () {
  return gulp.src("./docs/").pipe(server(serverOptions));
});




