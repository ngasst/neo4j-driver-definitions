var path = require("path"),
	fs = require("fs"),
	webpack = require("webpack");
	
const nodeModules = fs.readdirSync("./node_modules").filter(d => d != ".bin");
function ignoreNodeModules(context, request, callback) {
	if (request[0] == ".")
		return callback();
		
	const module = request.split("/")[0];
	if (nodeModules.indexOf(module) !== -1) {
		return callback(null, "commonjs " + request);
	}
	
	return callback();
}

function createConfig(isDebug) {
	const plugins = [];

	if(isDebug) {
		plugins.push(new webpack.BannerPlugin({banner: 'require("source-map-support").install();', raw: true, entryOnly: false}));
	}
	
	if (!isDebug) {
		plugins.push(new webpack.optimize.UglifyJsPlugin());
		plugins.push(new webpack.BannerPlugin({banner: '#!/usr/bin/env node', raw: true, entryOnly: true}));
	}
	
	// ---------------------
	// WEBPACK CONFIG
	return {
		target: "node",
		devtool: "source-map",
		entry: {
			generate: "./generate.ts"
		},
		output: {
			path: path.join(__dirname, "build"),
			filename: "[name].js"
		},
		resolve: {
			extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
			alias: {
				shared: path.join(__dirname, "..", "shared"),
				root: path.join(__dirname)
			}
		},
		module: {
			loaders: [
				{ 
					test: /\.ts$/,
					loader: "ts-loader",
					exclude: /node_modules/ 
				}
			]
		},
		externals: [ignoreNodeModules],
		plugins: plugins
	};
	// ---------------------
}

module.exports = createConfig(true);
module.exports.create = createConfig;