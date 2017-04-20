var gulp = require('gulp'),
webpack = require('webpack');

gulp.task('scripts', function(callback){
	webpack(require('../../webpack.config.js'), function(err, stats){
		if (err) {
			//log out any error messages	
			console.log(err.toString());
		}
		console.log(stats.toString());
		callback(); //make sure that gulp is aware when webpack completes
	});
}); 