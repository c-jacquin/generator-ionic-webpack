const promptName = [
  {
    type: 'input',
    name: 'name',
    message: 'Name your model',
    required: true
  }
];
const promptProperty = [
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
          choices = ['required', 'maxLength', 'minLength', 'pattern'];
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
    name: 'minLength',
    message: 'Specify the minimum length for this string',
    when: (answers)=>{
      return answers.validation.indexOf('minLength') > -1;
    },
    filter: value =>{
      return parseInt(value);
    }
  },
  {
    type: 'input',
    name: 'maxLength',
    message: 'Specify the maximum length for this string',
    when: (answers)=>{
      return answers.validation.indexOf('maxLength') > -1;
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
      return answers.validation.indexOf('min') > -1;
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
      return answers.validation.indexOf('max') > -1;
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
      return answers.validation.indexOf('pattern') > -1;
    }
  },
  {
    type: 'confirm',
    name: 'validateForm',
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
];

export {
  promptName,
  promptProperty
};
