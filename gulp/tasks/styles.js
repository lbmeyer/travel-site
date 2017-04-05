var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import');

gulp.task('styles', function(){
    var plugins = [
        cssImport,
        cssvars,
        nested,
        autoprefixer
    ];
    //include return here because gulp.src is an asynchronous function
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./app/temp/styles'));
});