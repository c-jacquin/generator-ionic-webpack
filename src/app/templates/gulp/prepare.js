import gulp from 'gulp';
import copy from 'gulp-copy';
import replace from 'replace-in-file';
import run from 'run-sequence';

gulp.task('copy:sass', cb =>{
  gulp.src('node_modules/ionic-sdk/scss/**/*')
    .pipe(copy('./src/styles', {
      prefix: 3
    }));
    //ugly sorry i cant figure how to do
  setTimeout(()=>{
    cb();
  }, 500);
});

gulp.task('copy:font', ()=>{
  gulp.src('node_modules/ionic-sdk/release/fonts/*')
    .pipe(copy('./src/styles', {
      prefix: 3
    }));
});

gulp.task('replace', cb =>{
  replace({
    files: ['src/styles/ionicons/_ionicons-variables.scss'],
    replace: '"../fonts"',
    with: '"./fonts"'
  }, cb);
});

gulp.task('prepare', cb =>{
  run(['copy:sass', 'copy:font'], 'replace', cb);
});
