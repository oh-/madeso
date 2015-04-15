var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// var del = require('del');
// var fs = require('fs');




gulp.task('sass', function() {
	return sass('scss/')
		.on('error', function (err) {
			console.error('Error! (sass)', err.message);
		})
		.pipe(gulp.dest('wp/'))
		.pipe(reload({ stream:true }))
});

//  browsersync config
var config = {
	files: ['wp/style.css', 'wp/*.php'],
	proxy: "localhost/ecostage/?$",
	notify: "false"
};

gulp.task('serve', function() {
	browserSync(config);
	gulp.watch('scss/**.scss', ['sass']);
});

gulp.task('default', ['sass', 'serve'], function() {
	gulp.watch("scss/**/*.scss", ['sass']);
});
