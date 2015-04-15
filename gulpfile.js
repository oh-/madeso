var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// var del = require('del');
// var fs = require('fs');




gulp.task('sass', function() {
	return sass('app/theme/sass/')
		.on('error', function (err) {
			console.error('Error! (sass)', err.message);
		})
		.pipe(gulp.dest('app/theme'))
		.pipe(reload({ stream:true }))
});

//  browsersync config
var config = {
	files: ['app/theme/style.css', 'app/theme/*.php'],
	proxy: "localhost/madeso/",
	notify: "false"
};

gulp.task('serve', function() {
	browserSync(config);
	gulp.watch('app/theme/**.scss', ['sass']);
});

gulp.task('default', ['sass', 'serve'], function() {
	gulp.watch('app/theme/**.scss', ['sass']);
});
