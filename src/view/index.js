import { Base } from 'yeoman-generator';
import yosay from 'yosay';
import { getDirectories, addMenuItem } from './lib/utils';
import { cap } from '../model/lib/utils';

class ViewGenerator extends Base {

    constructor(...args) {
      super(...args);
    }

  get prompting() {

    return {
      prompt() {
        const done = this.async();
        this.log(yosay('Hello, and welcome to the view generator !!!'));
        this.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Name your view',
            required: true
          },
          {
            type: 'confirm',
            name: 'parent',
            message: 'Is this view nested into another one ?',
            default: false
          },
          {
            type: 'list',
            name: 'parent',
            message: 'Choose the parent view.',
            choices: ()=>{
              return getDirectories(this.destinationPath('src/components/views'));
            },
            when: (answers)=>{
              return answers.parent;
            }
          },
          {
            type: 'list',
            name: 'type',
            message: 'Wich kind of view do you want ?',
            choices: ()=>{
              return getDirectories(this.templatePath());
            },
            default: 'simple'
          },
          {
            type: 'confirm',
            name: 'menu',
            message: 'Do you want to add an item in your app menu ?',
            default: true,
            when: ()=> {
              return !!this.config.get('menu');
            }
          }
        ], answers =>{
          this.parentView = answers.parent;
          this.name = answers.name;
          this.type = answers.type;
          if (answers.menu) {
            addMenuItem({
              menuPath: this.destinationPath('src/components/menu/menu.json'),
              parent: this.parent,
              menuItem: {
                state: this.name,
                label: this.name
              }
            }).then(()=>{
              done();
            })
            .catch(err=>{
              this.log(err);
              done(err);
            });
          }else {
            done();
          }
        });
      },
      template() {
        const options = {
          name: this.name,
          upCaseName: cap(this.name),
          appModule: this.config.get('appModule')
        };
        let basePath;
        if (this.parentView) {
          basePath = `src/components/views/${this.parentView}/${this.name}`;
        } else {
          basePath = `src/components/views/${this.name}`;
        }
        switch (this.type) {
          case 'simple':
            this.fs.copyTpl(this.templatePath(`simple/index.js`), this.destinationPath(`${basePath}/index.js`), options);
            this.fs.copyTpl(this.templatePath(`simple/simple.controller.js`), this.destinationPath(`${basePath}/${this.name}.controller.js`), options);
            this.fs.copyTpl(this.templatePath(`simple/simple.controller.spec.js`), this.destinationPath(`${basePath}/${this.name}.controller.spec.js`), options);
            this.fs.copyTpl(this.templatePath('simple/simple.scss'), this.destinationPath(`${basePath}/${this.name}.scss`), options);
            this.fs.copy(this.templatePath('simple/simple.html'), this.destinationPath(`${basePath}/${this.name}.html`));
            break;
        }
      }
    };
  }
}

export default ViewGenerator;
