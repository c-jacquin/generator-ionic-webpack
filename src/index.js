import { Base } from 'yeoman-generator';

export default class MyGenerator extends Base {

    constructor(...args) {
      super(...args);
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
            name: 'userName',
            message: 'Enter your name:'
          }
        ];

        this.prompt(prompt, answers => {
          this.options = answers;
          done();
        });
      },
      prepare(){
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
      template(){
        this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.options);
        this.fs.copyTpl(this.templatePath('ionic.project'), this.destinationPath('ionic.project'), this.options);
        this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('index.html'), this.options);
      },
      install(){
        this.npmInstall();
      }
    };
  }
}
