import fs from 'fs';
import fsp from 'fs-promise';
import path from 'path';

export {
  getDirectories,
  addMenuItem
};

function getDirectories(baseDir) {
  return fs.readdirSync(baseDir).filter((file)=> {
    return fs.statSync(path.join(baseDir, file)).isDirectory();
  });
}

function addMenuItem(params) {
  return fsp.readJson(params.menuPath)
    .then((data)=>{
      if (params.parent) {
        for (let i = 0; i <= data.length; i++) {
          if (data[i].state === params.parent) {
            if (data[i].nestedItems !== 'object') {
              data[i].nestedItems = [params.menuItem];
            }else {
              data[i].nestedItems.push(params.menuItem);
            }
            break;
          }
        }
      }else {
        data.push(params.menuItem);
      }
      return fsp.outputJson(params.menuPath, data);
    });
}
