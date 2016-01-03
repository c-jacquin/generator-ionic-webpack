import menuData from './menu.json';

export default
/*@ngInject*/
class MenuController {
  constructor() {
    this.name = 'menu';
    console.log(menuData)
    this.menuItems = menuData;
  }
}
