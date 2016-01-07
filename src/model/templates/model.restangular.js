/**
 * Angular service that use js-data angular to manage <%= name %>s
 */
class <%= upCaseName %> {
  /**
   *
   * @param {object} DS - js-data service
   * @returns {object} - a js-data resource integrated  with angular
   */
  constructor(Restangular) {
    'ngInject'
    return Restangular.all('<%= name %>');
  }
}

export default <%= upCaseName %>;
