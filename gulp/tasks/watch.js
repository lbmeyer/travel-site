var gulp = require('gulp'),
watch = require('gulp-watch'), 
browserSync = require('browser-sync').create();

gulp.task('watch', function(){
    
    browserSync.init({
        notify: false,
        server: {
           baseDir: "app" // base directory is in app folder
       } 
    });
    
    watch('./app/index.html', function(){
       browserSync.reload(); 
    });
    
    watch('./app/assets/styles/**/*.css', function(){
       gulp.start('cssInject'); 
    });
    
});

//telling gulp before it runs cssInject task, first begin and complete any dependency tasks listed here (which is styles task)
gulp.task('cssInject', ['styles'], function(){
   return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});