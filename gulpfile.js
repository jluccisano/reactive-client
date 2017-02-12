const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');
const zip = require('gulp-zip');
const shell = require('gulp-shell')


const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('docker:build', shell.task([
  'docker build -t jluccisano/reactive-client:1.0 ./docker'
]))

gulp.task('build', gulp.series(gulp.parallel('other', 'webpack:dist'), createZip));
gulp.task('test', gulp.series('karma:single-run'));
gulp.task('test:auto', gulp.series('karma:auto-run'));
gulp.task('serve', gulp.series('webpack:watch', 'watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);

function reloadBrowserSync(cb) {
  browserSync.reload();
  cb();
}

function watch(done) {
  gulp.watch(conf.path.tmp('index.html'), reloadBrowserSync);
  done();
}

function createZip(done) {
  gulp.src('dist/*')
    .pipe(zip('reactive-client.zip'))
    .pipe(gulp.dest('docker'))
  done();
}

