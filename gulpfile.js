import gulp from 'gulp';
import sync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import sourcemap from 'gulp-sourcemaps';

const styles = function()  {
  return gulp.src('source/scss/style.scss')
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('source/css'))
    .pipe(sync.stream());
}

const server = function() {
  sync.init({
    notify: false,
    ui: false,
    server: {
      baseDir: './source'
    }
  });
};

const watcher = function() {
  gulp.watch('source/scss/**/*.scss', styles);
};

export const start = gulp.series(styles, gulp.parallel(server, watcher));

export default start;

export const debug = function(done) {
  console.log(typeof(start));
  console.log(typeof(gulp));
  done();
};
