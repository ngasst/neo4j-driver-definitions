let gulp = require("gulp");
let webpack = require("webpack");
let chalk = require("chalk");
let rimraf = require("rimraf");
let createDevConfig = require("./webpack.config").create;

const $ = require("gulp-load-plugins")();

// --------------------------------
// Public Tasks
gulp.task("clean:server", cb => rimraf("./build", cb));
gulp.task("clean", gulp.parallel("clean:server"));
gulp.task("copy", () => {
	 return gulp.watch(['index.d.ts', 'neo4j-driver-tests.ts'], gulp.series('copy:pers', 'copy:dt'), (event) => {
		 $.util.log(`[${event.path}] changed!`);
	 });
});
gulp.task("copy:pers", () => {
	return gulp.src(['index.d.ts', 'neo4j-driver-tests.ts'])
			.pipe(gulp.dest('../neo-persistor/node_modules/@types/neo4j-driver'));
});
gulp.task("copy:dt", () => {
	return gulp.src(['index.d.ts', 'neo4j-driver-tests.ts'])
				.pipe(gulp.dest('../DefinitelyTyped/neo4j-driver'));
});

gulp.task("dev:server", gulp.series("clean:server", devServerBuild));
gulp.task("dev:watch", gulp
	.series(
		"clean",
		devServerBuild,
		devServerWatch
	));
gulp.task("prod:watch", gulp
	.series(
		"clean",
		prodServerBuild,
		prodServerWatch
	));

gulp.task("dev", gulp
	.series(
		"clean", 
		devServerBuild, 
		gulp.parallel(
			devServerWatch, 
			devServerReload)));

gulp.task("prod:server", gulp.series("clean:server", prodServerBuild));
gulp.task("prod", gulp.series("clean", gulp.parallel(prodServerBuild)));

// --------------------------------
// Private Server Tasks
const devServerWebpack = webpack(createDevConfig(true));
const prodServerWebpack = webpack(createDevConfig(false));

function devServerBuild(callback) {
	devServerWebpack.run((error, stats) => {
		outputWebpack("Dev:Server", error, stats);
		callback();
	});
}

function devServerWatch() {
	devServerWebpack.watch({poll: 1000, aggregateTimeOut: 300}, (error, stats) => {
		outputWebpack("Dev:Server", error, stats);
	});
}

function prodServerWatch() {
	prodServerWebpack.watch({poll: 1000, aggregateTimeOut: 300}, (error, stats) => {
		outputWebpack("Prod:Server", error, stats);
	});
}

function devServerReload() {
	return $.nodemon({
		script: "./build/index.js",
		watch: "./build",
		env: {
			"NODE_ENV": "development",
			"USE_WEBPACK": "true"
		}
	});
}

function prodServerBuild(callback) {
	prodServerWebpack.run((error, stats) => {
		outputWebpack("Prod:Server", error, stats);
		callback();
	});
}

// --------------------------------
// Helpers
function outputWebpack(label, error, stats) {
	if (error)
		throw new Error(error);
		
	if (stats.hasErrors()) {
		$.util.log(stats.toString({ colors: true }));
	} else {
		const time = stats.endTime - stats.startTime;
		$.util.log(chalk.bgGreen(`Built ${label} in ${time} ms`));
	}
}