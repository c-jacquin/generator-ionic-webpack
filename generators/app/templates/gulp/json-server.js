import gulp       from 'gulp';
import gutil      from 'gulp-util';
import watch      from 'gulp-watch';
import path       from 'path';
import glob       from 'glob-promise';
import jsonServer from 'json-server';
import bodyParser from 'body-parser';

import Prompt from './generator/lib/Prompt';
import {displayError} from './generator/lib/_utils';

import {addModel,addView, addModule} from './generator/index';

let instance;

function initServer(){
  const server = jsonServer.create();
  server.use(jsonServer.defaults());
  server.use(bodyParser.json());
  return glob('gulp/server/modules/**/index.js')
    .then((modules)=>{
      modules.forEach((module)=>{
        require('./'+module.replace('gulp/','').replace('/index.js',''))(server);
      });
      return glob('gulp/server/mockData/*.mock.json');
    })
    .then((mocks)=>{
      let db = {};
      mocks.forEach((mock)=>{
        try{
          db[mock.replace('gulp/server/mockData/','').replace('.mock.json','')] =  require('./'+mock.replace('gulp/',''))
        }catch(err){
          displayError(err);
        }
      });
      var router = jsonServer.router(db);
      server.use(router);
      instance = server.listen(3000, ()=>{

      });
    })
    .catch(displayError)
}

gulp.task('json-server', (done)=> {
  initServer();
  watch('gulp/server/mockData/*', ()=>{
    instance.close();
    setTimeout(()=>{
      initServer();
    },1000)
  })
});

gulp.task('add:model', addModel);

gulp.task('add:view', addView);

gulp.task('add:module', ()=>{
  addModule('crud');
});

gulp.task('generator', ()=>{
  Prompt.generator()
    .then((data)=>{
      switch(data.generator){
        case 'model':
          addModel();
          break;
        case 'view':
          addView();
          break;
        case 'module':

          break;
        default:

          break;
      }
    })
});
