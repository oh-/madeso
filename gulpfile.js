var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var filter       = require('gulp-filter');
var sass         = require('gulp-ruby-sass');
var sourcemaps   = require('gulp-sourcemaps');
var reload       = browserSync.reload;
var theme = {
  url: 'eco.dev',
  dir: 'app/ecoscore',
  bower: 'bower_components/'
};
var config = {
  src: {
    scss: theme.dir+'/**/*.scss',
    css:  theme.dir,
    php: theme.dir+'*.php'
  },

  sassloadpath: [
    theme.bower + 'compass-mixins/lib/',
    // theme.bower + 'bower-compass-core/compass/stylesheets/',
    theme.bower + 'vertical-rhythms-without-compass/',
    theme.bower + 'susy/sass/',
    theme.bower + 'sass-web-fonts/'
  ]
};

/**
 * Kick off the sass stream with source maps + error handling
 */
// tempDir = './app/tmp/';
function sassStream () {
    return sass(theme.dir+'/sass', {
      sourcemap: true,
      // cacheLocation: tempDir,
      loadPath: config.sassloadpath
    })
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

    gulp.watch(config.src.scss, ['sass']);
    gulp.watch(config.src.php).on('change', reload);
});

/**
 * Compile sass, filter the results, inject CSS into all browsers
 */
gulp.task('sass', function() {
    return sassStream()
        .pipe(gulp.dest(config.src.css))
        .pipe(filter("**/*.css"))
        .pipe(reload({stream: true}));
});

/*
 * cleaning away the dirty files
 */
gulp.task('clear', function() {
  return sass.clearCache();
})
/**
 * Default task
 */
gulp.task('default', ['serve']);
