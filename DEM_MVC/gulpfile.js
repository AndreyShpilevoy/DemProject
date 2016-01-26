/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp"),
    tsd = require("gulp-tsd"),
    cache = require("gulp-cache"),//-
    sass = require("gulp-sass"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),//-
    typescript = require("gulp-typescript"),
    autoprefixer = require("gulp-autoprefixer");//-

var paths = {
    webroot: "./wwwroot/"
};
paths.cleanJsFiles = paths.webroot + "js/**/**.js";
paths.cleanJsFilesInTs = paths.webroot + "TypeScripts/**/**.js";
paths.cleanCssFiles = paths.webroot + "css/**/**.css";
paths.cleanTsdFiles = paths.webroot + "TypingsForTypeScript/**/**.ts";
paths.ts = paths.webroot + "TypeScripts/**/*.ts";
paths.scss = paths.webroot + "scss/**/*.scss";
paths.jsTempFolder = paths.webroot + "js/temp";
paths.cssTempFolder = paths.webroot + "css/temp";
paths.jsFolder = paths.webroot + "js";
paths.cssFolder = paths.webroot + "css";

gulp.task("clean:ts.js", function (cb) {
    rimraf(paths.cleanJsFilesInTs, cb);
});

gulp.task("clean:js", function (cb) {
    rimraf(paths.cleanJsFiles, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.cleanCssFiles, cb);
});

gulp.task("clean:tsd", function (cb) {
    rimraf(paths.cleanTsdFiles, cb);
});

gulp.task("clean:all", ["clean:js", "clean:css", "clean:tsd"]);

gulp.task("load:tsd", function (callback) {
    tsd({
        command: "reinstall",
        config: "./tsd.json"
    }, callback);
});

gulp.task("procces:ts-to-js", function () {
    return gulp.src(paths.ts)
		.pipe(typescript({
		    noImplicitAny: true
		}))
		.pipe(gulp.dest(paths.jsTempFolder));
});

gulp.task('procces:sass-to-css', function () {
    return gulp.src(paths.scss)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(paths.cssTempFolder));
});

gulp.task("concat-and-min:js", function () {
    return gulp.src(paths.jsTempFolder + "/**/**.js")
        .pipe(concat("dem.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsFolder));
});

gulp.task("concat-and-min:css", function () {
    return gulp.src(paths.cssTempFolder + "/**/**.css")
        .pipe(concat("dem.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.cssFolder));
});

gulp.task("concat-and-min", ["concat-and-min:js", "concat-and-min:css"]);

gulp.task("concat:js", function () {
    return gulp.src(paths.jsTempFolder + "/**/**.js")
        .pipe(concat("dem.min.js"))
        .pipe(gulp.dest(paths.jsFolder));
});

gulp.task("concat:css", function () {
    return gulp.src(paths.cssTempFolder + "/**/**.css")
        .pipe(concat("dem.min.css"))
        .pipe(gulp.dest(paths.cssFolder));
});

gulp.task("concat", ["concat:js", "concat:css"]);