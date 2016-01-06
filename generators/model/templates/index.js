import {<%= upCaseName %>} from './<%= upCaseName %>';

/**
 * @module common/model/<%= upCaseName %>
 * @param appModule
 */
export default (appModule)=>{
  appModule.service('<%= upCaseName %>', <%= upCaseName %>);
};
