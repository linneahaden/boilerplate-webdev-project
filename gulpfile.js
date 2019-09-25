const { src, dest, watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();
const concatJs = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const cleanCss = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const sass = require('gulp-sass');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

//File paths
const files = {
  htmlPath: "src/**/*.html",
  jsPath: "src/**/*.js",
  sassPath: "src/**/*.scss",
  imgPath: "src/images/**/*"
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

//Task - SASS: Compile scss to css, minify, concat and copy
//Obs funktionaliteten för css från moment 2 är flyttad till denna funktion.
function sassTask() {
  return src(files.sassPath)
  //Compiles sass to css
  .pipe(sass().on('error', sass.logError))
  // //Autoprefixer
  .pipe(autoprefixer({cascade: false}))
  // //Concatenation
  .pipe(concatCss('main.css', {rebaseUrls: false}))
  // //Minifies
  .pipe(cleanCss({compatibility: 'ie8'}))
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
  return src(files.imgPath)
  //Minify image
  .pipe(imagemin())
  //Destination
  .pipe(dest('pub/images'))
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
  watch([files.htmlPath, files.jsPath, files.sassPath, files.imgPath],
    parallel(htmlTask, jsTask, sassTask, imageTask)
  );
}

//Exports (All tasks in default triggers with gulp commando.)
exports.default = series(
  parallel(pubCleanup, htmlTask, jsTask, sassTask, imageTask),
  watchTask
);
