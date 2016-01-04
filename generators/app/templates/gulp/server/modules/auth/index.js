import jwt from 'jwt-simple';
import jsonFile from 'json-file-plus';
import gutil from 'gulp-util';
import _ from 'lodash';
import {Config, EnsureAuthenticated} from './lib/utils.js';

const mockPath = './gulp/server/mockData/user.mock.json';

export default server =>{
  server.post('/auth/signup', (req, res)=>{
    jsonFile(mockPath)
      .then((file)=> {
        req.body.id = file.data.user[file.data.user.length - 1].id + 1;
        file.data.user.push(req.body);
        return file.save();
      })
      .then(()=>{
        res.send(jwt.encode(req.body, Config.TOKEN_SECRET));
      })
      .catch((err)=>{
        throw new gutil.PluginError('json-server:jsonfile', err);
      });
  });

  server.post('/auth/signin', (req, res)=>{
    jsonFile(mockPath)
      .then((file)=>{
        var user = _.where(file.data.user, req.body)[0];
        if (user) {
          res.send(jwt.encode(user, Config.TOKEN_SECRET));
        }else {
          res.status(403).json({
            message: 'forbidden'
          });
        }
      })
      .catch((err)=>{
        throw new gutil.PluginError('json-server:jsonfile', err);
      });
  });

  server.get('/auth/me', EnsureAuthenticated, (req, res)=>{
    res.json(req.user);
  });
};
