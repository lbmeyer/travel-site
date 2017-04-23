//finding absolute path since Webpack v2.3.1 required it instead of relative path
const path = require('path');
//process.traceDeprecation = true;

module.exports = {
	entry: {
		App: "./app/assets/scripts/app.js",
		Vendor: "./app/assets/scripts/Vendor.js"
	},
	output: {
		path: path.resolve(__dirname, "./app/temp/scripts"),
		filename: "[name].js" //keep filename dynamic
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				test: /\.js$/,
				exclude: /node_modules/
				//test: /\.js$/ is telling webpack that we only want this babel load (plugin) to apply to js files
				//exclude node_modules folder so babel only works on our own js files
			}
		]
	}
	 
}