import './styles/ionic.scss';
import './app.scss';
import template from './app.html';

import './app.vendors';

import { AppConfig, Bootstrap, UiRouterErrorHandler } from './app.utils';
import config from './common/config';


const appModule = angular.module('<%= appName %>', <%= ngDep %>)
  .config(AppConfig)
  .run (UiRouterErrorHandler)
  .directive('<%= appName %>', () => {
    'ngInject'
    return {
      template,
      restrict: 'E'
    };
  }
);

config(appModule);
Bootstrap(appModule);

export default appModule;
