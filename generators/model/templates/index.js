import {<%= upCaseName %>} from './<%= upCaseName %>';

const formlyConfig = <%- formlyConfig %>;

/**
 * @module common/model/<%= upCaseName %>
 * @param appModule
 */
export default (appModule)=> {
  appModule.service('<%= upCaseName %>', <%= upCaseName %>);
  appModule.constant('formly<%= upCaseName %>Config', formlyConfig);
};
