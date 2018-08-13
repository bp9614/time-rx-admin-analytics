import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default (field) => {
  const warningLabel =
    field.meta.touched && field.meta.error ? ' has-danger' : '';
  const errorMessage = field.meta.touched ? field.meta.error : '';

  return (
    <div className={"bootstrap-form-group" + warningLabel}>
      <label>{field.label}</label><br/>
      <DatePicker
          {...field.input}
          dateForm="MM/DD/YYYY"
          selected={field.input.value ? moment(field.input.value) : null}/>
      <p className="error-msg">{errorMessage}</p>
    </div>
  )
}
