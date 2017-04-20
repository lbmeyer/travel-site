//finding absolute path since Webpack v2.3.1 required it instead of relative path
const path = require('path');

module.exports = {
	entry: "./app/assets/scripts/app.js",
	output: {
		path: path.resolve(__dirname, "./app/temp/scripts"),
		filename: "App.js"
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