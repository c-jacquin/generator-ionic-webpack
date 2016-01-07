import template from './menu.html';
import controller from './menu.controller';

export default
/*@ngInject*/
()=> {
  return {
    restrict: 'E',
    scope: {},
    template: template,
    controller: controller,
    controllerAs: 'vm',
    bindToController: true
  };
};
