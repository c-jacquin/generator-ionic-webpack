class <%= upCaseName %>Controller {
  constructor($scope) {
    'ngInject';
    //ugly shit to make controllerAs work with ionic wtf ???!!??!
    $scope.vm = this;
    this.name = '<%= name %>';
  }
}

export default <%= upCaseName %>Controller;
