import './menu.scss';
import component from './menu.component';

export default (appModule)=>{
  appModule.directive('menu', component);
};
