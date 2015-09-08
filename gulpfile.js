var siteurl = 'base.theme';
// Site vars

var gulp = require('gulp');
var watch = require('gulp-watch');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber')
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


var paths = {
  theme: {
    dir: './app/theme/',
    url: 'base.theme'
  },
	styles: {
		src: paths.theme.dir . '{,*/}*.{scss,sass}',
		sass: paths.theme.dir . 'sass/',
		dest: paths.theme.dir,
		bower: './bower_components/',
		build: './app/temp/'
		}
};
//  browsersync config
var config = {
	files: [paths.theme.dir . 'style.css', paths.theme.dir .'*.php'],
    proxy: paths.theme.url, // change this to your site url
    notify: 'false',
    browser: "FirefoxDeveloperEdition",
    open: false,
    ghostMode: false
// : {
//     clicks: true,
//     forms: true,
//     scroll: false
// }
};
var configo = {
	files: [paths.theme.dir . 'style.css', paths.theme.dir .'*.php'],
    proxy: paths.theme.url, // change this to your site url
    notify: 'false',
    browser: "FirefoxDeveloperEdition",
    open: true,
    ghostMode: false
};


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
		require: 'breakpoint',
		css: paths.styles.dest,
		sass: paths.styles.sass,
		sourcemap: 'true'
    }))
	.on('error', function(err) {
		//would like to catch the error here
	})
    .pipe(gulp.dest(paths.styles.build))
    .pipe(reload({ stream:true }));
});



// // Gulp Sass Task - if you would prefer Sass to Compass
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




gulp.task('serve', function() {
	browserSync(config);
	gulp.watch('paths.styles.src', ['compass']);
});
gulp.task('serveo', function() {
	browserSync(configo);
	gulp.watch('paths.styles.src', ['compass']);
});

gulp.task('o', ['compass', 'serveo'], function() {
	gulp.watch('./app/theme/sass/{,*/}*.{scss,sass}' , ['compass']);
	// gulp.watch('./app/theme/sass/{,*/}*.{scss,sass}', ['sass']);
});

gulp.task('default', ['compass', 'serve'], function() {
	gulp.watch('./app/theme/sass/{,*/}*.{scss,sass}' , ['compass']);
	// gulp.watch('./app/theme/sass/{,*/}*.{scss,sass}', ['sass']);
});
