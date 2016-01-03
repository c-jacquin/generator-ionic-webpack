import './styles/ionic.scss';
import './app.scss';
import template from './app.html';

import './app.vendors';

import {AppConfig, Bootstrap, UiRouterErrorHandler} from './app.utils';
import config from './common/config';


const appModule = angular.module('app', [
  'ionic',
  'formlyIonic',
  'ngMessages',
  'js-data'
])
  .config(AppConfig)
  .run (UiRouterErrorHandler)
  .directive('app', () => {
    return {
      template: template,
      restrict: 'E'
    };
  }
);

config(appModule);
Bootstrap(appModule);

export default appModule;
