var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

// svgSprite package wants it's options to be defined in an object literal
var config = {
	shape: {
		spacing: {
			padding: 1
		}	
	},
    mode: {
        css: {
			//filter function
			variables: {
				replaceSvgWithPng: function() {
					return function(sprite, render) {
						//sprite variable is dynamic file name i.e sprite-#####.svg. Here we replace svg with png in filename
						return render(sprite).split('.svg').join('.png');
					}
				}
			},
            sprite: 'sprite.svg', //remove prefix of 'css.' infront of sprite-######.svg generated name
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

gulp.task('beginClean', function(){
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function(){
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('createPngCopy', ['createSprite'], function() {
	return gulp.src('./app/temp/sprite/css/*.svg')
		.pipe(svg2png())
		.pipe(gulp.dest('./app/temp/sprite/css'));
}); 

gulp.task('copySpriteGraphic', ['createPngCopy'], function(){
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
        .pipe(gulp.dest('./app/assets/images/sprites'));
}); //move sprites to app/assets/.. to make it more tidy

gulp.task('copySpriteCSS', ['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
}); //2nd parameter in task is a dependency. Basically saying that createSprite has to run first

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
   return del('./app/temp/sprite'); 
});

//run 'gulp icons' in command line to generate svg and png files
gulp.task('icons', ['beginClean','createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']); 
