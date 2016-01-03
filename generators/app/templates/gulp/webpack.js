import gulp from 'gulp';
import webpack from 'webpack';
import del from 'del';
import wpConfig from '../webpack.config';

import {displayError, logger} from './generator/lib/_utils';

gulp.task('clean', (done)=>{
  del(['www/*']).then(function (paths) {
    logger.info('Deleted files/folders:\n', paths.join('\n'));
    done();
  });
});

gulp.task('webpack',['clean'], ()=> {
  webpack(wpConfig, (err, stats)=> {
    if(err){
      displayError(err);
    }
  });
});
