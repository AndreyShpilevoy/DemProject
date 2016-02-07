/// <binding BeforeBuild='bild-releas' AfterBuild='bild-clean:ts.js' Clean='bild-clean:ts.js, clean:js, clean:css, bild-reload:tsd' />
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
    gulpsync = require("gulp-sync")(gulp),
    typescript = require("gulp-typescript"),
    autoprefixer = require("gulp-autoprefixer"),
    Promise = require("es6-promise").Promise;;

var paths = {
    webroot: "./wwwroot/"
};
paths.cleanJsFiles = paths.webroot + "js/**/**.js";
paths.cleanJsFilesInTs = paths.webroot + "TypeScripts/**/**.js";
paths.cleanJsFilesInTemp = paths.webroot + "js/temp/**/**.js";
paths.cleanCssFiles = paths.webroot + "css/**/**.css";
paths.cleanCssFilesInTemp = paths.webroot + "css/temp/**/**.css";
paths.cleanTsdFiles = paths.webroot + "TypingsForTypeScript/**/**.ts";
paths.ts = paths.webroot + "TypeScripts/**/*.ts";
paths.scss = paths.webroot + "scss/**/*.scss";
paths.jsTempFolder = paths.webroot + "js/temp";
paths.cssTempFolder = paths.webroot + "css/temp";
paths.jsFolder = paths.webroot + "js";
paths.cssFolder = paths.webroot + "css";


gulp.task("clean:js", function (callback) {
    return rimraf(paths.cleanJsFiles, callback);
});

gulp.task("clean:temp-js", function (callback) {
    return rimraf(paths.cleanJsFilesInTemp, callback);
});

gulp.task("clean:css", function (callback) {
    rimraf(paths.cleanCssFiles, callback);
});

gulp.task("clean:temp-css", function (callback) {
    rimraf(paths.cleanCssFilesInTemp, callback);
});

gulp.task("clean:tsd", function (callback) {
    rimraf(paths.cleanTsdFiles, callback);
});

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

gulp.task("procces:sass-to-css", function () {
    return gulp.src(paths.scss)
      .pipe(sass().on("error", sass.logError))
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
        .pipe(autoprefixer({
            browsers: ["> 1%", "last 2 versions"],
            cascade: false
        }))
        .pipe(concat("dem.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.cssFolder));
});

gulp.task("concat:js", function () {
    return gulp.src(paths.jsTempFolder + "/**/**.js")
        .pipe(concat("dem.min.js"))
        .pipe(gulp.dest(paths.jsFolder));
});

gulp.task("concat:css", function () {
    return gulp.src(paths.cssTempFolder + "/**/**.css")
        .pipe(autoprefixer({
            browsers: ["> 1%", "last 2 versions"],
            cascade: false
        }))
        .pipe(concat("dem.min.css"))
        .pipe(gulp.dest(paths.cssFolder));
});

gulp.task("bild-debug", gulpsync.async(
    [["clean:js", "procces:ts-to-js", "concat:js", "clean:temp-js"],
    ["clean:css", "procces:sass-to-css", "concat:css", "clean:temp-css"]]
    ));

gulp.task("bild-releas", gulpsync.async(
    [["clean:js", "procces:ts-to-js", "concat-and-min:js", "clean:temp-js"],
    ["clean:css", "procces:sass-to-css", "concat-and-min:css", "clean:temp-css"]]
    ));

gulp.task("bild-reload:tsd", gulpsync.sync(["clean:tsd", "load:tsd"]));

gulp.task("bild-clean:ts.js", function (callback) {
    rimraf(paths.cleanJsFilesInTs, callback);
});