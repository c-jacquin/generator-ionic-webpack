import menuData from './menu.json';

export default
/*@ngInject*/
class MenuController {
  constructor() {
    this.name = 'menu';
    this.menuItems = menuData;
  }
}
