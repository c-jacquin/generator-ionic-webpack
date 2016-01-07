import './styles/ionic.scss';
import './app.scss';
import template from './app.html';

import angular from 'angular';
import { AppConfig, Bootstrap, UiRouterErrorHandler } from './app.utils';
import config from './common/config';


const appModule = angular.module('<%= appName %>', <%- JSON.stringify(ngDep) %>)
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
