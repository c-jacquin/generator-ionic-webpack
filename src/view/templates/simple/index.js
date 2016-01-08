import './<%= name %>.scss';
import template from './<%= name %>.html';
import controller from './<%= name %>.controller.js';

export default (appModule)=>{
  appModule.config($stateProvider => {
    'ngInject';
    $stateProvider
      .state('<%= name %>', {
        url: '/<%= name %>',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
};
