'use strict';

import path from 'path';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import excludeGitignore from 'gulp-exclude-gitignore';
import mocha from 'gulp-mocha';
import { Instrumenter } from 'isparta';
import istanbul from 'gulp-istanbul';
import nsp from 'gulp-nsp';
import plumber from 'gulp-plumber';
import coveralls from 'gulp-coveralls';
import copy from 'gulp-copy';
import babel from 'gulp-babel';
import del from 'del';

gulp.task('clean', ()=>{
  del(['generators/**/*']).then(()=> {
    console.log('Deleted build folders');
  });
});

gulp.task('copyTpl', ()=>{
  gulp.src('src/**/templates/**/*')
    .pipe(copy('generators', {
      prefix: 1
    }));
});

gulp.task('build', ['clean', 'copyTpl'], () => {
  return gulp.src(['src/**/*.js', '!src/**/templates/**/*'])
    .pipe(babel({
      presets: ['es2015', 'stage-0'],
      plugins: ['syntax-async-generators', 'add-module-exports']
    }))
    .pipe(gulp.dest('generators'));
});

gulp.task('static', ()=> {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', cb => {
  nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('pre-test', ()=> {
  return gulp.src(['generators/**/*.js', '!generators/app/templates/hooks/**/*'])
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: Instrumenter
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], cb => {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec',
      compilers: 'js:babel-register'
    }))
    .on('error', function (err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('coveralls', ['test'], ()=> {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

gulp.task('prepublish', ['nsp', 'build']);
gulp.task('default', ['static', 'test', 'coveralls']);
