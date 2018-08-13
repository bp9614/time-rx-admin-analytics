import _ from 'lodash';
import React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';

export default (field) => {
  const errorMessage = field.meta.touched ? field.meta.error : '';

  return (
    <div>
      <Form.Field>
        {field.title}
      </Form.Field>
      <Form.Field>
        <Checkbox {..._.omit(field.input, ['value'])}
            label={field.label}
            onChange={(param, data) => {field.input.onChange(data.checked)}}/>
      </Form.Field>
      <p className="error-msg">{errorMessage}</p>
    </div>
  );
}