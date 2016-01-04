import './home';
import HomeController from './home.controller';
import HomeTemplate from './home.html';

describe('Home', () => {
  let makeController;

  beforeEach(window.mocks.module('qds'));
  beforeEach(window.mocks.inject(() => {
    makeController = () => {
      return new HomeController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(HomeTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

});
