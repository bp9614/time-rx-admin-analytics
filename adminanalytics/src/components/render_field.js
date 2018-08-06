import React from 'react';

export default (field) => {
  const warningLabel =
      field.meta.touched && field.meta.error ? ' has-danger' : '';
  const errorMessage = field.meta.touched ? field.meta.error : '';

  return (
    <div className={"bootstrap-form-group" + warningLabel}>
      <label className="bootstrap-label" htmlFor={field.id}>
        {field.label}
      </label>
      <input
          className={field.className} type={field.type} id={field.id}
          placeholder={field.placeholder} {...field.input} />
      <p className="error-msg">{errorMessage}</p>
    </div>
  );
}