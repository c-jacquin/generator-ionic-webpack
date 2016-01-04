import angular from 'angular';

export default (appModule)=>{
  /*eslint no-undef: 0*/
  appModule.constant('config', angular.merge(require('./env/all.json'), require(`./env/${NODE_ENV}.json`)));
};
