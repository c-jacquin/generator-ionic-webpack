import <%= upCaseName %>Controller from './<%= name %>.controller';
import <%= upCaseName %>Template from './<%= name %>.html';

describe('<%= upCaseName %>', () => {
  let makeController;

  beforeEach(window.angular.mocks.module(<*= appModule %>));
  beforeEach(window.angular.mocks.inject(()=> {
    makeController = () => {
      return new <%= upCaseName %>Controller();
    };
  }));

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
      expect(<%= upCaseName %>Template).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

});
