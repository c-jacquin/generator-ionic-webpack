import 'babel-polyfill';
import _ from 'lodash';
import { Base } from 'yeoman-generator';
import inquirer from 'inquirer-async/inquirer-async';
import yosay from 'yosay';
import { cap, propertyPrompt, eslintFormatJson } from './lib/utils';

/*eslint no-loop-func:0*/
class ModelGenerator extends Base {

    constructor(...args) {
      super(...args);
      this.prompt = inquirer.promptAsync;
    }

  get prompting() {

    return {
      promptName() {
        const done = this.async();
        this.log(yosay('Hello, and welcome to the model generator !!!'));
        this.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Name your model',
            required: true
          }
        ])
          .then(answers =>{
            this.log(answers);
            this.name = answers.name;
            done();
          });
      },
      formlyConfigObject() {
        if (this.config.get('formly')) {
          const done = this.async();
          this.log('Now you have to define properties for your model');
          propertyPrompt().then(properties =>{
            this.properties = properties.map(data =>{
              return {
                key: data.name,
                //todo fix this
                type: 'input',
                templateOptions: _({
                  label: data.name,
                  placeholder: data.name,
                  type: data.inputType,
                  required: data.required,
                  minlength: data.minlength,
                  maxlength: data.maxlength,
                  pattern: data.pattern,
                  min: data.min,
                  max: data.max
                }).omit(_.isUndefined).omit(_.isNull).value()
              };
            });
            done();
          });
        }
      },
      template() {
        const options = {
          name: this.name,
          upCaseName: cap(this.name),
          formlyConfig: eslintFormatJson(JSON.stringify(this.properties, null, 2))
        };
        this.fs.copyTpl(this.templatePath(`model.${this.config.get('model')}.js`), this.destinationPath(`src/common/model/${this.name}/${options.upCaseName}.js`), options);
        if (this.config.get('formly')) {
          this.fs.copyTpl(this.templatePath('index.formly.js'), this.destinationPath(`src/common/model/${this.name}/index.js`), options);
        }else {
          this.fs.copyTpl(this.templatePath('index.js'), this.destinationPath(`src/common/model/${this.name}/index.js`), options);
        }
      }
    };
  }
}

export default ModelGenerator;
