//write var once and separate with comma
var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars');
nested = require('postcss-nested');

//var plugins = [
//    autoprefixer,
//    cssvars
//];

gulp.task('default', function(){
   console.log("Hoory - you created a GULP task"); 
});

gulp.task('html', function(){
   console.log("Imagine something useful being done"); 
});

gulp.task('styles', function(){
    //include return here because gulp.src is an asynchronous function
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssvars, nested, autoprefixer]))
        .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function(){
    
    watch('./app/index.html', function(){
       gulp.start('html'); 
    });
    
    watch('./app/assets/styles/**/*.css', function(){
       gulp.start('styles'); 
    });
    
});