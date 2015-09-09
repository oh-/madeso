// Site vars

var gulp = require('gulp');
var watch = require('gulp-watch');
var compass = require('gulp-compass');
var sass = require('gulp-sass')
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


var theme = {
  dir: 'app/theme/',
  url: 'base.theme'
};
var paths = {
	styles: {
		src: theme.dir + '{,*/}*.{scss,sass}',
		sass: theme.dir + 'sass/',
		dest: theme.dir,
		bower: './bower_components/',
		build: './app/temp/'
		}
};
//  browsersync config
var config = {
	files: [theme.dir + 'style.css', theme.dir + '*.php'],
    proxy: theme.url, // change this to your site url
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
	files: [theme.dir + 'style.css', theme.dir + '*.php'],
    proxy: theme.url, // change this to your site url
    notify: 'false',
    browser: "FirefoxDeveloperEdition",
    open: true,
    ghostMode: false
};


// gulp.task('compass', function() {
//   gulp.src('./' + paths.styles.src)
// 	.pipe(plumber({
// 		errorHandler: function (error) {
// 			console.log(error.message);
// 			this.emit('end');
//   }}))
//   .pipe(compass({
// 		// import_path: paths.styles.bower,
// 		config_file: './config.rb',
// 		require: ['susy', 'breakpoint'],
// 		css: 'css',
// 		sass: 'sass',
//     image: 'img'
//     }))
// 	.on('error', function(err) {
// 		//would like to catch the error here
// 	})
//     .pipe(gulp.dest(paths.styles.build))
//     .pipe(browserSync.stream({match: ['*|)}>#*.css', '*|)}>#*.php']}));
// });


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return sass(paths.styles.sass, {sourcemap: true})
        .pipe(plumber())
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write(theme.dir, {
            includeContent: false,
            sourceRoot: '/'+theme.dir+'sass'
        }))
        .pipe(browserSync.stream({match: theme.dir + '**/*.css'}));
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init(config);
    gulp.watch( paths.styles.src, ['sass']);
    gulp.watch(theme.dir + '*.{php,scss,css}').on('change', browserSync.reload);
});


gulp.task('default', ['serve']);



// gulp.task('oldserve', function() {
// 	browserSync(config);
// 	gulp.watch('paths.styles.src', ['compass']);
// });
// gulp.task('serve', ['compass'], function() {
//   browserSync.init(config);
// 	gulp.watch('paths.styles.src', ['compass']);
// });
// gulp.task('serveo', function() {
// 	browserSync(configo);
// 	gulp.watch('paths.styles.src', ['compass']);
// });
//
// gulp.task('o', ['compass', 'serveo'], function() {
// 	gulp.watch( paths.styles.src , ['compass']);
// 	// gulp.watch('./app/theme/sass/{,|)}>#}*.{scss,sass}', ['sass']);
// });
//
// gulp.task('default', ['compass', 'serve'], function() {
// 	gulp.watch( paths.styles.src , ['compass']);
// });
