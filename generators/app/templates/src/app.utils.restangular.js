function Bootstrap(appModule) {
  'ngInject';
  const components = require.context('./components', true, /index.js$/);
  const common = require.context('./common', true, /index.js$/);

  function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
  }

  requireAll(components)
    .forEach((componentFactory)=>{
      componentFactory(appModule);
    });

  requireAll(common)
    .forEach((componentFactory)=>{
      componentFactory(appModule);
    });
}

function UiRouterErrorHandler($rootScope) {
  'ngInject';
  /*eslint no-unused-vars:0*/
  $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {

  });
}

function AppConfig($urlRouterProvider, config, RestangularProvider) {
  'ngInject';
  $urlRouterProvider.otherwise('/home');
  RestangularProvider.setBaseUrl(config.api.basePath);
}

export {
  AppConfig,
  Bootstrap,
  UiRouterErrorHandler
};
