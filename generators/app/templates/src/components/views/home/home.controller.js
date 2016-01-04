class HomeController {
  constructor($scope) {
    'ngInject';
    //ugly shit to make controllerAs work with ionic wtf ???!!??!
    $scope.vm = this;
    this.name = 'home';
  }
}

export default HomeController;
