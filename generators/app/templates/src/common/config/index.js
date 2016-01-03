export default (appModule)=>{
  appModule.constant('config', angular.merge(require('./env/all.json'),require('./env/'+NODE_ENV+'.json')));
}
