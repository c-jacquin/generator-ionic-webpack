import './menu.scss';
import template from './menu.html';
import controller from './menu.controller';

export default (appModule)=>{
  appModule.controller('MenuController', controller);
  appModule.component('menu', {
    /*eslint no-unused-var:0*/
    template: ($element, $attrs)=>{
      return template;
    },
    controller: 'MenuController as vm'
  });
};
