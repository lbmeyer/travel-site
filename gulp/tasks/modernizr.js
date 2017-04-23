var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

// This will check all our css and js files and gulp-modernizr package will check exactly which features we will need to test for. Then, it'll create customized copy of modernizr tailored to your site (more lightweight)

gulp.task('modernizr', function() {
	return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
		.pipe(modernizr({
			"options": [
				"setClasses"
			]
	}))
		.pipe(gulp.dest('./app/temp/scripts/')); 
});