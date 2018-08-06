import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react';

export default (field) => {
  const warningLabel =
    field.meta.touched && field.meta.error ? ' has-danger' : '';
  const errorMessage = field.meta.touched ? field.meta.error : '';

  return (
    <div className={"bootstrap-form-group" + warningLabel}>
      <label>{field.label}</label><br/>
      <Dropdown 
          selection {...field.input}
          value={field.input.value}
          onChange={(param, data) => field.input.onChange(data.value)}
          id={field.id} 
          options={field.options}/>
    </div>
  )
}
