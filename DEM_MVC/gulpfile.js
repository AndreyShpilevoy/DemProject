/// <binding BeforeBuild='bild-debug' AfterBuild='bild-clean:ts.js' Clean='bild-reload:typings, clean:css, clean:js, clean:temp-css, clean:temp-js' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp"),
    typings = require("gulp-typings"),
    sass = require("gulp-sass"),
    del = require("del"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    gulpsync = require("gulp-sync")(gulp),
    typeScript = require("gulp-typescript"),
    autoprefixer = require("gulp-autoprefixer"),
    Promise = require("es6-promise").Promise;

var fileSelectors = {
    allTs: "/**/**.ts",
    allJs: "/**/**.js",
    allScss: "/**/**.scss",
    allCss: "/**/**.css"
}

var paths = {
    webroot: "./wwwroot/"
};
paths.cleanJsFiles = paths.webroot + "js/**/**.js";
paths.cleanJsFilesInTs = paths.webroot + "TypeScripts/**/**.js";
paths.cleanJsFilesInTemp = paths.webroot + "js/temp/**/**.js";
paths.cleanCssFiles = paths.webroot + "css/**/**.css";
paths.cleanCssFilesInTemp = paths.webroot + "css/temp/**/**.css";
paths.typingsSrcFolder = "./typings";
paths.typingsDestFolder = paths.webroot + "TypingsForTypeScript";
paths.ts = paths.webroot + "TypeScripts/**/*.ts";
paths.scss = paths.webroot + "scss/**/*.scss";
paths.jsTempFolder = paths.webroot + "js/temp";
paths.cssTempFolder = paths.webroot + "css/temp";
paths.jsFolder = paths.webroot + "js";
paths.cssFolder = paths.webroot + "css";
paths.allTs = "/**/**.ts";



gulp.task("clean:js", function () {
    return del(paths.cleanJsFiles);
});

gulp.task("clean:temp-js", function () {
    return del(paths.cleanJsFilesInTemp);
});

gulp.task("clean:css", function () {
    return del(paths.cleanCssFiles);
});

gulp.task("clean:temp-css", function () {
    return del(paths.cleanCssFilesInTemp);
});

gulp.task("clean:typingsDest", function () {
    return del(paths.typingsDestFolder);
});

gulp.task("clean:typingsSrc", function () {
    return del(paths.typingsSrcFolder);
});

gulp.task("bild-clean:ts.js", function () {
    return del(paths.cleanJsFilesInTs);
});

gulp.task("load:typings", function () {
    return gulp.src("./typings.json")
        .pipe(typings());
});

gulp.task("move:typings", function () {
    return gulp.src(paths.typingsSrcFolder + fileSelectors.allTs)
        .pipe(gulp.dest(paths.typingsDestFolder));
});

gulp.task("procces:ts-to-js", function () {
    var tsResult = gulp.src(paths.ts)
        .pipe(typeScript({
            noImplicitAny: true
        }));
    return tsResult.js.pipe(gulp.dest(paths.jsTempFolder));
});

gulp.task("procces:sass-to-css", function () {
    return gulp.src(paths.scss)
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(paths.cssTempFolder));
});

gulp.task("concat-and-min:js", function () {
    return gulp.src(paths.jsTempFolder + fileSelectors.allJs)
        .pipe(concat("dem.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsFolder));
});

gulp.task("concat-and-min:css", function () {
    return gulp.src(paths.cssTempFolder + fileSelectors.allCss)
        .pipe(autoprefixer({
            browsers: ["> 1%", "last 2 versions"],
            cascade: false
        }))
        .pipe(concat("dem.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.cssFolder));
});

gulp.task("concat:js", function () {
    return gulp.src(paths.jsTempFolder + fileSelectors.allJs)
        .pipe(concat("dem.min.js"))
        .pipe(gulp.dest(paths.jsFolder));
});

gulp.task("concat:css", function () {
    return gulp.src(paths.cssTempFolder + fileSelectors.allCss)
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

gulp.task("bild-release", gulpsync.async(
    [["clean:js", "procces:ts-to-js", "concat-and-min:js", "clean:temp-js"],
    ["clean:css", "procces:sass-to-css", "concat-and-min:css", "clean:temp-css"]]
    ));

gulp.task("bild-reload:typings", gulpsync.sync(["clean:typingsDest", "load:typings", "move:typings", "clean:typingsSrc"]));