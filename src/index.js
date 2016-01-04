import { Base } from 'yeoman-generator';

export default class MyGenerator extends Base {

    constructor(...args) {
      super(...args);
      this.package = {
        dependencies: [],
        devDependencies: []
      };
      this.webpackEntry = [
        'lodash',
        'angular',
        'angular-animate',
        'angular-sanitize',
        'angular-ui-router',
        'ionic',
        'ionicAngular'
      ];
    }

  get prompting() {

    return {

      appName() {

        const done = this.async();
        const prompt = [
          {
            type: 'input',
            name: 'appName',
            message: 'Enter a name for your app:'
          },
          {
            type: 'input',
            name: 'description',
            message: 'Describe your project:'
          },
          {
            type: 'input',
            name: 'userName',
            message: 'Enter your name:'
          },
          {
            type: 'input',
            name: 'userEmail',
            message: 'Enter your email:'
          },
          {
            type: 'input',
            name: 'version',
            message: 'Enter the version of your app:',
            default: '0.0.0'
          },
          {
            type: 'confirm',
            name: 'jsonServer',
            message: 'Do you want to json-server as a mocked modular back-end ?',
            default: true
          },
          {
            type: 'list',
            name: 'modelService',
            message: 'Wich libarary to manage model do you want to use ?',
            choices: [
              'restangular',
              'js-data',
              'none'
            ]
          },
          {
            type: 'confirm',
            name: 'menu',
            message: 'Do you want to use our wonderfull menu component (work well with subgenerators) ?',
            default: true
          },
          {
            type: 'confirm',
            name: 'formly',
            message: 'Do you want to use angular-formly to manage your form ?',
            default: true
          }
        ];

        this.prompt(prompt, answers => {
          this.options = answers;
          //regex camelCase to - separator string
          let tagName = this.options.appName.replace(/\.?([A-Z]+)/g,
            (x, y)=> {
              return '-' + y.toLowerCase();
            }
          );
          tagName.replace(/^-/, '');
          this.options.appComponent = `<${tagName}>Loading ...<${tagName}/>`;
          done();
        });
      },
      dependencies() {
        this.options.ngDep = ['ionic'];

        if (this.options.formly) {
          this.options.ngDep.push('formlyIonic');
          this.package.dependencies.push('angular-formly');
          this.package.dependencies.push('api-check');
          this.package.dependencies.push('angular-messages');
          this.package.dependencies.push('angular-formly-templates-ionic');

          this.config.set('formly', true);
        }

        if (this.options.modelService === 'restangular' || this.options.modelService === 'js-data') {
          this.options.ngDep.push(this.options.modelService);
          switch (this.options.modelService) {
            case 'restangular':
              this.package.dependencies.push('restangular');
              break;
            case 'js-data':
              this.package.dependencies.push('js-data');
              this.package.dependencies.push('js-data-angular');
              break;
          }
        }

        if (this.options.jsonServer) {
          this.config.set('json-server', true);
          this.package.devDependencies.push('json-server');
          this.package.devDependencies.push('jwt-simple');
        }
      },
      prepare() {
        this.mkdir(this.destinationPath('www'));

        this.fs.copy(this.templatePath('gulp/webpack.js'), this.destinationPath('gulp/webpack.js'));
        this.fs.copy(this.templatePath('gulp/prepare.js'), this.destinationPath('gulp/prepare.js'));

        if (this.options.jsonServer) {
          this.fs.copy(this.templatePath('gulp/json-server.js'), this.destinationPath('gulp/json-server.js'));
          this.directory(this.templatePath('gulp/server'), this.destinationPath('gulp/server'));
        }

        this.directory(this.templatePath('hooks'), this.destinationPath('hooks'));
        this.directory(this.templatePath('src/components/views'), this.destinationPath('src/components/views'));
        this.directory(this.templatePath('src/common'), this.destinationPath('src/common'));
        this.fs.copy(this.templatePath('src/app.scss'), this.destinationPath('src/app.scss'));

        if (this.options.modelService === 'restangular') {
          this.fs.copy(this.templatePath('src/app.utils.restangular.js'), this.destinationPath('src/app.utils.js'));
        }else if (this.options.modelService === 'js-data') {
          this.fs.copy(this.templatePath('src/app.utils.js-data.js'), this.destinationPath('src/app.utils.js'));
        }else {
          this.fs.copy(this.templatePath('src/app.utils.js'), this.destinationPath('src/app.utils.js'));
        }

        this.fs.copy(this.templatePath('src/app.html'), this.destinationPath('src/app.html'));
        this.fs.copy(this.templatePath('.eslintrc'), this.destinationPath('.eslintrc'));
        this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));
        this.fs.copy(this.templatePath('LICENSE'), this.destinationPath('LICENSE'));
        this.fs.copy(this.templatePath('karma.conf.js'), this.destinationPath('karma.conf.js'));
        this.fs.copy(this.templatePath('gulpfile.babel.js'), this.destinationPath('gulpfile.babel.js'));
        this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
        this.fs.copy(this.templatePath('.editorconfig'), this.destinationPath('.editorconfig'));
      },
      menu() {
        if (this.options.menu) {
          this.directory(this.templatePath('src/components/menu'), this.destinationPath('src/components/menu'));
          this.options.menuHtml = `<menu></menu>`;
        }else {
          this.options.menuHtml =
          `<ion-content>
            <ion-list>
              <ion-item ui-sref="home">
                Home
              </ion-item>
            </ion-list>
          </ion-content>`;
        }
      },
      template() {
        this.webpackEntry = this.webpackEntry.concat(this.package.dependencies);
        this.webpackEntry.push(this.destinationPath('src/app.js'));
        this.options.webpackEntry = JSON.stringify(this.webpackEntry);
        this.log(this.options.webpackEntry);
        this.fs.copyTpl(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'), this.options);
        this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.options);
        this.fs.copyTpl(this.templatePath('ionic.project'), this.destinationPath('ionic.project'), this.options);
        this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('index.html'), this.options);

        this.fs.copyTpl(this.templatePath('src/app.js'), this.destinationPath('src/app.js'), this.options);
        this.fs.copyTpl(this.templatePath('src/app.html'), this.destinationPath('src/app.html'), this.options);
      },
      install() {
        this.npmInstall(this.package.dependencies, {save: true });
        this.npmInstall(this.package.devDependencies, {saveDev: true });
        this.npmInstall();
      }
    };
  }
}
