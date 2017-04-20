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
	
	watch('./app/assets/scripts/**/*.js', function(){
		gulp.start('scriptsRefresh');	  
	});
    
});

//telling gulp before it runs cssInject task, first begin and complete any dependency tasks listed here (which is styles task)
gulp.task('cssInject', ['styles'], function(){
   return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

//we want browserSync to reload page AFTER webpack bundled file has been generated. So scriptsRefresh task won't run until after scripts task (found in /gulp/tasks/scripts.js) has run (a dependency)
gulp.task('scriptsRefresh', ['scripts'], function(){
	browserSync.reload();
});