import React from 'react';
import { Form, Radio } from 'semantic-ui-react'

export default (field) => {
  return (
    <div>
      <Form.Field>
        {field.title}
      </Form.Field>
      <Form.Field>
        <Radio {...field.input}
            label={field.choice[0]}
            value={field.choice[0]}
            checked={field.input.value === field.choice[0]}
            onChange={(param, data) => field.input.onChange(data.value)}/>
      </Form.Field>
      <Form.Field>
        <Radio {...field.input}
            label={field.choice[1]}
            value={field.choice[1]}
            checked={field.input.value === field.choice[1]}
            onChange={(param, data) => field.input.onChange(data.value)}/>
      </Form.Field>
    </div>
  );
}