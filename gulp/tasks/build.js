var gulp = require('gulp'),
imagemin = require('gulp-imagemin'), // compress images
del = require('del'),
usemin = require('gulp-usemin'), // tool used to copy css & js files to dist folder, compress files and revision
rev = require('gulp-rev'), // Revision: add content hash to filenames to force browser to re-download updated files
cssnano = require('gulp-cssnano'), // compress css
uglify = require('gulp-uglify'), // compress js
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
	browserSync.init({
        notify: false,
        server: {
           baseDir: "docs" // base directory is in app folder
       } 
    });
});

gulp.task('deleteDistFolder', ['icons'], function() {
		return del("./docs");
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
	var pathsToCopy = [
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/images/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**'
	];
	
	return gulp.src(pathsToCopy) 
		.pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
		.pipe(imagemin({
			progressive: true, //optimize jpegs
			interlaced: true,  //help with gif images
			multipass: true //help with svg files
	}))
		.pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
	gulp.start("usemin");
});

gulp.task('usemin', ['styles', 'scripts'], function() {
	return gulp.src("./app/index.html")
		.pipe(usemin({
			css: [function() {return rev()}, function() {return cssnano()}],
			js: [function() {return rev()}, function() {return uglify()}]
		}))
		.pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);