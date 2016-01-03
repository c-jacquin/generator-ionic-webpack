import gulp from 'gulp';
import webpack from 'webpack';
import del from 'del';
import wpConfig from '../webpack.config';

gulp.task('clean', (done)=>{
  del(['www/*']).then(function (paths) {
    console.info('Deleted files/folders:\n', paths.join('\n'));
    done();
  });
});

gulp.task('webpack',['clean'], ()=> {
  webpack(wpConfig, (err, stats)=> {
    if(err){
      console.error(err);
    }
  });
});
