// buildworld

var gulp         = require('gulp');
var util         = require('gulp-util');
var replace      = require('gulp-replace');
var sass         = require('gulp-ruby-sass');
var filter       = require('gulp-filter');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;



var theme = {
  url: 'base.dev',
  dir: 'app/theme',
  tmp: 'app/tmp',
};


var config = {
  src: {
    scss: theme.dir + '/**/*.scss',
    css:  theme.dir,
    php: theme.dir + '/**/*.php',
    bower: 'bower_components/',
    _s: 'bower_components/_s/'
  },
  WordFrom: [
    // Search for '_s' (inside single quotations) to capture the text domain.
    "'_s'",
    // Search for _s_ to capture all the function names.
    '_s_',
    // Search for Text Domain: _s in style.css.
    'Text Domain: _s',
    // Search for  _s (with a space before it) to capture DocBlocks.
    ' _s',
    // Search for _s- to capture prefixed handles.
    '_s-'
  ],

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
    return sass(config.src.scss, {
      sourcemap: true,
      // cacheLocation: tempDir,
      loadPath: config.sassloadpath
    })
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: config.src.scss
        }));
}

/**
 * Start the Browsersync Static Server + Watch files
 */
gulp.task('serve', ['sass'], function() {

    browserSync({
        proxy: theme.url ,
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

var ThemeName = '';
var textdomain = '';

function GetThemeName () {
  if (util.env.name == null ) {
   return ThemeName = 'error',
console.log('you must Specifiy a name using --name SingleWordName');
  } else { ThemeName = util.env.name;
  ltext = ThemeName.replace(/ /gi, "");
  textdomain = ltext.toLowerCase();
  return ThemeName, textdomain;
} };

// example 
// var re = /(\w+)\s(\w+)/;
// var str = 'John Smith';
// var newstr = str.replace(re, '$2, $1');
// console.log(newstr);  // Smith, John

function Rename (tn, td) {
  gulp.src([ config.src._s + '**/*' ])
  // .pipe(replace( new RegExp("'_s'", "'" + td + "'")))
  
  .pipe(replace(config.WordFrom[0], "'" + td + "'"))
  .pipe(replace(config.WordFrom[1], td + "_"))
  .pipe(replace(config.WordFrom[3], " " + tn ))
  .pipe(replace(config.WordFrom[4], td + "-"))
  // .pipe(replace( new RegExp("'_s'", "'" + td + "'")))
  // .pipe(replace( new RegExp("_s_",  td + "_")))
  // .pipe(replace( new RegExp(" _s", " " + tn )))
  // .pipe(replace( new RegExp("_s-",  td + "-")))
  .pipe(gulp.dest('app/' + td +'/'));
}


/*
 * Create new theme based off the most current version of _s,
 * and hopefully rename all the variables
 */


gulp.task('new', function (){
  GetThemeName();
  Rename(ThemeName, textdomain);
  console.log(ThemeName), console.log(textdomain);
});
