import menuData from './menu.json';

export default MenuController;

class MenuController {
  constructor() {
    'ngInject';
    this.name = 'menu';
    this.menuItems = menuData;
  }
}
