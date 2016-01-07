import co from 'co';
import inquirer from 'inquirer-async/inquirer-async';

export {
  cap,
  propertyPrompt,
  eslintFormatJson
};

/*eslint no-extend-native:0*/
String.prototype.replaceAll = function (find, replace) {
  return this.split(find).join(replace);
};

function cap(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

function eslintFormatJson(schema) {
  return schema.replaceAll('"type"', 'type')
    .replaceAll('"required"', 'required')
    .replaceAll('"minlength"', 'minlength')
    .replaceAll('"maxlength"', 'maxlength')
    .replaceAll('"max"', 'max')
    .replaceAll('"min"', 'min')
    .replaceAll('"pattern"', 'pattern')
    .replaceAll('"type"', 'type')
    .replaceAll('"key"', 'key')
    .replaceAll('"placeholder"', 'placeholder')
    .replaceAll('"templateOptions"', 'templateOptions')
    .replaceAll('"label"', 'label')
    .replaceAll('"', '\'');
}

/*eslint no-loop-func:0*/
function propertyPrompt() {
  return co(function * () {
    let next = true;
    const properties = [];
    do {
      const property = yield inquirer.promptAsync([
        {
          type: 'input',
          name: 'name',
          message: 'Name the property',
          required: true
        },
        {
          type: 'list',
          name: 'type',
          message: 'wich type is this property ?',
          choices: ['string', 'number', 'boolean', 'array']
        },
        {
          type: 'checkbox',
          name: 'validation',
          message: 'Wich validation do you want for your property ?',
          choices: (answers)=>{
            let choices;
            switch (answers.type) {
              case 'string':
                choices = ['required', 'maxlength', 'minlength', 'pattern'];
                break;
              case 'number':
                choices = ['required', 'max', 'min'];
                break;
              case 'array':
                choices = ['required'];
                break;
            }
            return choices;
          },
          when: answers =>{
            return answers.type !== 'boolean';
          }
        },
        {
          type: 'input',
          name: 'minlength',
          message: 'Specify the minimum length for this string',
          when: (answers)=>{
            if (answers.validation) {
              return answers.validation.indexOf('minlength') > -1;
            }
          },
          filter: value =>{
            return parseInt(value);
          }
        },
        {
          type: 'input',
          name: 'maxlength',
          message: 'Specify the maximum length for this string',
          when: (answers)=>{
            if (answers.validation) {
              return answers.validation.indexOf('maxlength') > -1;
            }
          },
          filter: value =>{
            return parseInt(value);
          }
        },
        {
          type: 'input',
          name: 'min',
          message: 'Specify the minimum value for this number',
          when: (answers)=>{
            if (answers.validation) {
              return answers.validation.indexOf('min') > -1;
            }
          },
          filter: value =>{
            return parseInt(value);
          }
        },
        {
          type: 'input',
          name: 'max',
          message: 'Specify the maximum value for this number',
          when: answers =>{
            if (answers.validation) {
              return answers.validation.indexOf('max') > -1;
            }
          },
          filter: value =>{
            return parseInt(value);
          }
        },
        {
          type: 'input',
          name: 'pattern',
          message: 'Specify the regex that will validate your string',
          when: (answers)=> {
            if (answers.validation) {
              return answers.validation.indexOf('pattern') > -1;
            }
          }
        },
        {
          type: 'confirm',
          name: 'displayValidationMessages',
          message: 'Do you want to display form validation messages ?',
          default: true
        },
        {
          type: 'list',
          name: 'inputType',
          message: 'Wich form input do you want to use ?',
          choices: answers =>{
            let choices;
            switch (answers.type) {
              case 'string':
                choices = ['text', 'email', 'tel', 'url'];
                break;
              case 'number':
                choices = ['number', 'range'];
                break;
              case 'boolean':
                choices = ['switch'];
                break;
            }
            return choices;
          }
        },
        {
          type: 'confirm',
          name: 'next',
          message: 'Do you want to add another property ?',
          default: true
        }
      ]);
      properties.push(property);
      next = property.next;
      delete property.next;
      delete property.validation;
    }while (next);

    return Promise.resolve(properties);
  });
}
