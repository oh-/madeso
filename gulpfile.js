// Site vars

var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber')
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


var paths = {
       	SassFiles : {
		soc: 'app/theme/sass/style.scss',
		dst: 'app/theme/',
		sf: './app/theme/sass/{,*/}*.{scss,sass}'
	},
	styles: {
		src: './app/theme/sass/{,*/}*.{scss,sass}',
		sass: './app/theme/sass/',
		dest: './app/theme/',
		bower: './bower_components/',
		build: './app/temp/'
		}
}

 
gulp.task('compass', function() {
  gulp.src(paths.styles.src)
	.pipe(plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
    .pipe(compass({
		import_path: paths.styles.bower,
		config_file: './config.rb',
		require: 'susy',
		css: paths.styles.dest ,
		sass: paths.styles.sass
    }))
	.on('error', function(err) {
		//would like to catch the error here
	})
    .pipe(gulp.dest(paths.styles.build))
    .pipe(reload({ stream:true }));
});



// // Gulp Sass Task
// gulp.task('sass', function() {
//   gulp.src('./app/theme/sass/{,*/}*.{scss,sass}')
//    	.pipe(sourcemaps.init())
//    	.pipe(sass({
//       errLogToConsole: true
//     }))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('./app/theme'))
//     .pipe(reload({ stream:true }));
// });



//  browsersync config
var config = {
	files: ['app/theme/style.css', 'app/theme/*.php'],
	proxy: "localhost/ecostage/",
	notify: "false"
};

gulp.task('serve', function() {
	browserSync(config);
	gulp.watch('app/theme/**.scss', ['sass']);
});

gulp.task('default', ['compass', 'serve'], function() {
	gulp.watch('./app/theme/sass/{,*/}*.{scss,sass}' , ['compass']);
	// gulp.watch('./app/theme/sass/{,*/}*.{scss,sass}', ['sass']);
});
