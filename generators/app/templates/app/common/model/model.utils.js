function isRelation(relations, property){
  var isRelation = false;
  relations.keys.forEach((key)=>{
    if(key !== property){
      isRelation = true;
    }
  });
  return isRelation;
}



export function SchemaToFormly(schema, config){
  const fields = [];
  angular.forEach(schema,(obj, key)=>{
    if(obj.inputType){
      const field = {
        key: key,
        type: config.inputType,
        templateOptions: {
          label: key,
          placeholder : key,
          validate: true,
          validationsCustom : config.defaultErrorMessages,
          type : obj.inputType
        }
      };

      if(obj.hasOwnProperty('nullable')){
        field.templateOptions.required = !obj.nullable;
      }

      switch(obj.type){
        case 'string':
          field.templateOptions.label= key;
          field.templateOptions.maxlength = obj.maxlength;
          field.templateOptions.minlength = obj.minlength;
          field.templateOptions.pattern = obj.pattern;
          break;
        case 'number':
          field.templateOptions.min = obj.min || 0;
          field.templateOptions.max = obj.max || 10000;
          field.templateOptions.step = obj.step || 1;
          if(obj.inputType === 'range'){
            field.type = 'range';
            field.templateOptions.rangeClass = config.class;
            field.templateOptions.minIcon = 'ion-minus-circled';
            field.templateOptions.maxIcon = 'ion-plus-circled';
          }
          break;
        case 'boolean':
          field.type = 'toggle';
          field.templateOptions.validate = false;
          field.templateOptions.toggleClass = config.class;
          break;
        case 'array':

          break;
      }
      fields.push(field);
    }
  });
  return fields;
}
