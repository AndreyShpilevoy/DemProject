var gulp = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	concat = require("gulp-concat"),
	cssmin = require("gulp-cssmin"),
	uglify = require("gulp-uglify"),
	typings = require("gulp-typings"),
	gulpsync = require("gulp-sync")(gulp),
	del = require("del"),
	Promise = require("es6-promise").Promise,
	eventStream = require("event-stream"),
	browserify = require("browserify"),
	tsify = require("tsify"),
	source = require("vinyl-source-stream"),
	streamify = require("gulp-streamify");

var webroot = "./wwwroot/";

var config = {
	paths: {
		css: [
			"node_modules/bootstrap/dist/css/bootstrap.min.css",
			"node_modules/bootstrap/dist/css/bootstrap-theme.min.css"
		],
		scss: {
			src: webroot + "src/scss/**/",
			dest: webroot + "dist/styles"
		},
		tsx: {
			main: webroot + "src/TypeScripts/main.tsx",
			dest: webroot + "dist/scripts/"
		},
		typings: {
			src: "./typings",
			dest: webroot + "TypingsForTypeScript",
			config: "./typings.json"
		}
	},
	autoprefixer: {
		settings: {
			browsers: ["> 1%", "last 2 versions"],
			cascade: false
		}
	},
	fileNames: {
		jsBundle: "dem.min.js",
		cssBundle: "dem.min.css"
	},
	fileSelectors: {
		allTs: "/**/**.ts",
		allScss: "/**/**.scss"
	}
}


gulp.task("bundle:js", function () {
	browserify({ debug: true })
		.add(config.paths.tsx.main)
		.plugin(tsify)
		.bundle()
		.on("error", function (error) { console.error(error.toString()); })
		.pipe(source(config.fileNames.jsBundle))
		.pipe(gulp.dest(config.paths.tsx.dest));
});

gulp.task("bundle-and-min:js", function () {
	browserify()
		.add(config.paths.tsx.main)
		.plugin(tsify)
		.bundle()
		.on("error", function (error) { console.error(error.toString()); })
		.pipe(source(config.fileNames.jsBundle))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest(config.paths.tsx.dest));
});

gulp.task("bundle:css", function () {
	var sassStream = gulp.src(config.paths.scss.src + config.fileSelectors.allScss)
		.pipe(sass().on("error", sass.logError));
	var cssStream = gulp.src(config.paths.css)
		.pipe(concat("vendor.min.css"));

	return eventStream.concat(cssStream, sassStream)
		.pipe(autoprefixer({
			browsers: config.autoprefixer.settings.browsers,
			cascade: config.autoprefixer.settings.cascade
		}))
		.pipe(concat(config.fileNames.cssBundle))
		.pipe(gulp.dest(config.paths.scss.dest));
});

gulp.task("bundle-and-min:css", function () {
	var sassStream = gulp.src(config.paths.scss.src + config.fileSelectors.allScss)
		.pipe(sass().on("error", sass.logError));
	var cssStream = gulp.src(config.paths.css)
		.pipe(concat("vendor.min.css"));

	return eventStream.concat(cssStream, sassStream)
		.pipe(autoprefixer({
			browsers: config.autoprefixer.settings.browsers,
			cascade: config.autoprefixer.settings.cascade
		}))
		.pipe(concat(config.fileNames.cssBundle))
		.pipe(cssmin())
		.pipe(gulp.dest(config.paths.scss.dest));
});


gulp.task("typings-cleanDest", function () {
	return del(config.paths.typings.dest);
});

gulp.task("typings-load", function () {
	return gulp.src(config.paths.typings.config)
		.pipe(typings());
});

gulp.task("typings-move", function () {
	return gulp.src(config.paths.typings.src + config.fileSelectors.allTs)
		.pipe(gulp.dest(config.paths.typings.dest));
});

gulp.task("typings-cleanSrc", function () {
	return del(config.paths.typings.src);
});

gulp.task("build:typings-reload", gulpsync.sync(["typings-cleanDest", "typings-load", "typings-move", "typings-cleanSrc"]));