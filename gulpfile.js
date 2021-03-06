import gulp from 'gulp';
import sync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import sourcemap from 'gulp-sourcemaps';
import svgstore from 'gulp-svgstore';

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

const refresh = function (done) {
  sync.reload();
  done();
};

const watcher = function() {
  gulp.watch("source/*.html", refresh);
  gulp.watch('source/scss/**/*.scss', styles);
};

export const sprite = function() {
  return gulp.src('source/sprite/*.svg')
    .pipe(svgstore({inlineSvg: true}))
    .pipe(gulp.dest('source/img'));

}

export const start = gulp.series(styles, gulp.parallel(server, watcher));

export default start;

export const debug = function(done) {
  console.log(typeof(start));
  console.log(typeof(gulp));
  gulp.series(styles, gulp.parallel(server, watcher))();
  done();
};
