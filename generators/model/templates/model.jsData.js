/**
 * Angular service that use js-data angular to manage <%= name %>s
 */
class <%= upCaseName %> {
  /**
   *
   * @param {object} DS - js-data service
   * @returns {object} - a js-data resource integrated  with angular
   */
  constructor(DS) {
    'ngInject'
    return DS.defineResource('<%= upCaseName %>', {
      name: '<%= name %>',
      idAttribute: 'id'
    });
  }
}

export default <%= upCaseName %>;
