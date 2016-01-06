import 'babel-polyfill';
import { Base } from 'yeoman-generator';
import inquirer from 'inquirer-async/inquirer-async';
import co from 'co';
import yosay from 'yosay';
import { promptName, promptProperty } from './lib/prompter';
import { cap } from './lib/utils';

/*eslint no-loop-func:0*/
export default class ModelGenerator extends Base {

    constructor(...args) {
      super(...args);
      this.prompt = inquirer.promptAsync;
    }

  get prompting() {

    return {
      promptName() {
        const done = this.async();
        this.log(yosay('Hello, and welcome to the model generator !!!'));
        this.prompt(promptName)
          .then(answers =>{
            this.log(answers);
            this.name = answers.name;
            done();
          });
      },
      promptProperties() {
        const done = this.async();
        const prompter = this.prompt;
        this.log('Now you have to define properties for your model');
        const propGen = co(function * () {
          let next = true;
          const properties = [];
          do {
            const property = yield prompter(promptProperty);
            properties.push(property);
            next = property.next;
            delete property.next;
            delete property.validation;
          }while (next);

          return Promise.resolve(properties);
        });
        propGen.then(properties =>{
          this.properties = properties;
          done();
        });
      },
      /*formlyConfigObject() {
        console.log(this.properties);
        this.properties = this.properties.map(data =>{
          const response = {
            key: data.name,
            //todo fix this
            type: 'input',
            templateOptions: {
              label: data.name,
              placeholder: data.name,
              type: data.inputType
            }
          };
        });
      }*/
      template() {
        const options = {
          name: this.name,
          upCaseName: cap(this.name)
        };
        this.fs.copyTpl(this.templatePath(`model.${this.config.getAll().model}.js`), this.destinationPath(`src/common/model/${this.name}/${this.name}.js`), options);
        this.fs.copyTpl(this.templatePath('index.js'), this.destinationPath(`src/common/model/${this.name}/index.js`), options);
      }
    };
  }
}
