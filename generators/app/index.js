'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yeomanGenerator = require('yeoman-generator');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyGenerator = (function (_Base) {
  _inherits(MyGenerator, _Base);

  function MyGenerator() {
    var _Object$getPrototypeO;

    _classCallCheck(this, MyGenerator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MyGenerator)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(MyGenerator, [{
    key: 'prompting',
    get: function get() {

      return {
        appName: function appName() {
          var _this2 = this;

          var done = this.async();
          var prompt = [{
            type: 'input',
            name: 'appName',
            message: 'Enter a name for your app:'
          }, {
            type: 'input',
            name: 'userName',
            message: 'Enter your name:'
          }];

          this.prompt(prompt, function (answers) {
            _this2.options = answers;
            done();
          });
        },
        prepare: function prepare() {
          this.mkdir(this.destinationPath('gulp'));
          this.mkdir(this.destinationPath('www'));
          this.fs.copy(this.templatePath('gulp/webpack.js'), this.destinationPath('gulp/webpack.js'));
          //todo ask the question
          this.fs.copy(this.templatePath('gulp/prepare.js'), this.destinationPath('gulp/prepare.js'));

          this.fs.copy(this.templatePath('gulp/json-server.js'), this.destinationPath('gulp/json-server.js'));
          this.directory(this.templatePath('gulp/server'), this.destinationPath('gulp/server'));

          this.directory(this.templatePath('hooks'), this.destinationPath('hooks'));
          this.directory(this.templatePath('app'), this.destinationPath('app'));

          this.fs.copy(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'));
          this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));
          this.fs.copy(this.templatePath('LICENSE'), this.destinationPath('LICENSE'));
          this.fs.copy(this.templatePath('karma.conf.js'), this.destinationPath('karma.conf.js'));
          this.fs.copy(this.templatePath('gulpfile.babel.js'), this.destinationPath('gulpfile.babel.js'));
          this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
          this.fs.copy(this.templatePath('.editorconfig'), this.destinationPath('.editorconfig'));
        },
        template: function template() {
          this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.options);
          this.fs.copyTpl(this.templatePath('ionic.project'), this.destinationPath('ionic.project'), this.options);
          this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('index.html'), this.options);
        },
        install: function install() {
          this.npmInstall();
        }
      };
    }
  }]);

  return MyGenerator;
})(_yeomanGenerator.Base);

exports.default = MyGenerator;
module.exports = exports['default'];