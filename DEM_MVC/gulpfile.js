/// <binding />
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
	Promise = require("es6-promise").Promise,

	browserify = require('browserify'),
	tsify = require('tsify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	streamify = require('gulp-streamify');


gulp.task("bundle:js", function () {
	browserify()
		.add('./wwwroot/src/TypeScripts/main.tsx')
		.plugin(tsify, { noImplicitAny: true })
		.bundle()
		.on('error', function (error) { console.error(error.toString()); })
		.pipe(source('dem.min.js'))
		.pipe(gulp.dest("./wwwroot/dist/scripts/"));
});

gulp.task("bundle-and-min:js", function () {
	browserify()
		.add('./wwwroot/src/TypeScripts/main.tsx')
		.plugin(tsify, { noImplicitAny: true })
		.bundle()
		.on('error', function (error) { console.error(error.toString()); })
		.pipe(source('dem.min.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest("./wwwroot/dist/scripts/"));
});


var fileSelectors = {
	allTs: "/**/**.ts",
	allJs: "/**/**.js",
	allScss: "/**/**.scss",
	allCss: "/**/**.css",
	allFiles: "/**/*.*"
}

var paths = {
	webroot: "./wwwroot/"
};
paths.cleanJsFiles = paths.webroot + "dist/scripts/**/**.js";
paths.cleanJsFilesInTs = paths.webroot + "src/TypeScripts/**/**.js";
paths.cleanJsFilesInTemp = paths.webroot + "dist/scripts/temp/**/**.js";
paths.cleanCssFiles = paths.webroot + "dist/styles/**/**.css";
paths.cleanCssFilesInTemp = paths.webroot + "dist/styles/temp/**/**.css";
paths.typingsSrcFolder = "./typings";
paths.typingsDestFolder = paths.webroot + "TypingsForTypeScript";
paths.ts = paths.webroot + "src/TypeScripts/**/*.ts";
paths.scss = paths.webroot + "src/scss/**/*.scss";
paths.jsTempFolder = paths.webroot + "dist/scripts/temp";
paths.cssTempFolder = paths.webroot + "dist/styles/temp";
paths.jsFolder = paths.webroot + "dist/scripts";
paths.cssFolder = paths.webroot + "dist/styles";
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

gulp.task("concat:js", function() {
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
	[
		["clean:js", "procces:ts-to-js", "concat:js", "clean:temp-js"],
		["clean:css", "procces:sass-to-css", "concat:css", "clean:temp-css"]
	]
));

gulp.task("bild-release", gulpsync.async(
	[
		["clean:js", "procces:ts-to-js", "concat-and-min:js", "clean:temp-js"],
		["clean:css", "procces:sass-to-css", "concat-and-min:css", "clean:temp-css"]
	]
));

gulp.task("bild-reload:typings", gulpsync.sync(["clean:typingsDest", "load:typings", "move:typings", "clean:typingsSrc"]));