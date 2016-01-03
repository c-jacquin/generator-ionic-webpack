function Bootstrap(appModule){
  'ngInject'
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

function UiRouterErrorHandler($rootScope, $state){
  'ngInject'
  $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {

  });
}

function AppConfig($urlRouterProvider, DSProvider, DSHttpAdapterProvider, config){
  'ngInject'
  $urlRouterProvider.otherwise('/home');

  Object.assign(DSProvider.defaults,config.api);
  Object.assign(DSHttpAdapterProvider.defaults,config.api);
}

export {
  AppConfig,
  Bootstrap,
  UiRouterErrorHandler
}
