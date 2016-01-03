export
/*@ngInject*/
function Bootstrap(appModule){
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

export
/*@ngInject*/
function UiRouterErrorHandler($rootScope, $state){
  $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {
    if (angular.isObject(error) && angular.isString(error.code)) {
      switch (error.code) {
        case 'NOT_AUTHENTICATED':
          // go to the login page
          $state.go('login');
          break;
        default:
          // set the error object on the error state and go there
          $state.get('error').error = error;
          $state.go('error');
      }
    }
    else {
      // unexpected error
      $state.go('error');
    }
  });
}

export
/*@ngInject*/
function AppConfig($urlRouterProvider, DSProvider, DSHttpAdapterProvider, config){
  $urlRouterProvider.otherwise('/home');

  Object.assign(DSProvider.defaults,config.jsData);
  Object.assign(DSHttpAdapterProvider.defaults,config.jsData);
}
