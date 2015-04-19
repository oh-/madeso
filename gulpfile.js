var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// var del = require('del');
// var fs = require('fs');

var SassFiles = {
	soc: 'app/theme/sass/style.scss',
	dst: 'app/theme/',
	sf: './app/theme/sass/{,*/}*.{scss,sass}'
};

// Gulp Sass Task 
gulp.task('sass', function() {
  gulp.src('./app/theme/sass/{,*/}*.{scss,sass}')
   	.pipe(sourcemaps.init())
   	.pipe(sass({
      errLogToConsole: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/theme'))
    .pipe(reload({ stream:true }));
})



// gulp-ruby-sass task info for sass
// gulp.task('sass', function() {
// 	// Sass watch
// 	// var watcher = gulp.watch('SassFiles(src)', [sass])
// 	return sass('app/theme/sass/', {sass }
// 		.on('error', function (err) {
// 			console.error('Error! (sass)', err.message);
// 		})
// 		.pipe(gulp.dest('app/theme'))
// 		.pipe(reload({ stream:true }))
// });

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
	// gulp.watch('./app/theme/sass/**.scss', ['sass']);
	gulp.watch('./app/theme/sass/{,*/}*.{scss,sass}', ['sass']);
});
