var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var filter       = require('gulp-filter');
var sass         = require('gulp-ruby-sass');
var sourcemaps   = require('gulp-sourcemaps');
var reload       = browserSync.reload;
var theme = {
    url: 'vcs.dev',
    dir: 'app/vcstheme'
}
var src = {
    scss: theme.dir+'/**/*.scss',
    css:  theme.dir,
    php: theme.dir+'*.php'
};

/**
 * Kick off the sass stream with source maps + error handling
 */
function sassStream () {
    return sass(theme.dir+'/sass', {sourcemap: true})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: theme.dir+'/sass'
        }));
}

/**
 * Start the Browsersync Static Server + Watch files
 */
gulp.task('serve', ['sass'], function() {

    browserSync({
        // server: "./app/theme"
        proxy: theme.url , // change this to your site url
        open: false
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.php).on('change', reload);
});

/**
 * Compile sass, filter the results, inject CSS into all browsers
 */
gulp.task('sass', function() {
    return sassStream()
        .pipe(gulp.dest(src.css))
        .pipe(filter("**/*.css"))
        .pipe(reload({stream: true}));
});

/**
 * Default task
 */
gulp.task('default', ['serve']);
