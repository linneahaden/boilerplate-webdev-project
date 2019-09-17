const { src, dest, watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();
const concatJs = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const cleanCss = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

//File paths
const files = {
  htmlPath: "src/**/*.html",
  jsPath: "src/**/*.js",
  cssPath: "src/**/*.css",
  //Här har jag inte hittat något bra sätt att komma åt bildfiler generellt
  jpgPath: "src/**/*.jpg",
  pngPath: "src/**/*.png",
  gifPath: "src/**/*.gif",
  svgPath: "src/**/*.svg"
}

//Task - Clear the pub folder
async function pubCleanup(cb){
  const deletedPaths = await del(['pub/*']);
  console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
  cb();//Callback
}

//Task - HTML: Copy html files
function htmlTask(){
  return src(files.htmlPath)
  //Destination
  .pipe(dest('pub'))
  .pipe(browserSync.stream()
);
}

//Task - CSS: Minify, concat and copy css files
function cssTask(){
  return src(files.cssPath)
  //Autoprefixer
  .pipe(autoprefixer({cascade: false}))
  //Cancatenation
  .pipe(concatCss('main.css', {rebaseUrls: false}))
  //Minifies
  .pipe(cleanCss({compatibility: 'ie8'}))
  //Destination
  .pipe(dest('pub/css'))
  .pipe(browserSync.stream()
  );
}

//Task - JAVASCRIPT: Minify, concat and copy js files
function jsTask(){
  return src(files.jsPath)
  //Cancatenation
  .pipe(concatJs('main.js'))
  //Uglify js-files
  .pipe(uglify())
  //Destination
  .pipe(dest('pub/js'))
  .pipe(browserSync.stream()
  );
}

//Task - IMAGES: Minify and copy image files
function imageTask(){
  return src([files.jpgPath, files.pngPath, files.gifPath, files.pngPath])
  //Minify image
  .pipe(imagemin())
  //Destination
  .pipe(dest('pub'))
  .pipe(browserSync.stream()
);
}

//Task - watchTask
function watchTask(){
  //Initiates browserSync i pub folder
  browserSync.init({
        server: {
            baseDir: 'pub/'
        }
    });
  //Watches the following file paths and triggers the related functions
  watch([files.htmlPath, files.jsPath, files.cssPath, files.jpgPath, files.pngPath, files.gifPath, files.pngPath],
    parallel(htmlTask, jsTask, cssTask, imageTask)
  );
}

//Exports (All tasks in default triggers with gulp commando.)
exports.default = series(
  parallel(pubCleanup, htmlTask, jsTask, cssTask, imageTask),
  watchTask
);
