import React from "react";

const RadioField = ({
  input,
  id,
  label,
  type,
  placeholder,
  meta: { touched, error }
}) =>
  <div className={`${touched && error ? "has-error" : ""}`}>
    <div className="radio">
      <input id={id} {...input} type={type} />
      <label htmlFor={id} className="light">
        {label}
      </label>
      {touched &&
        error &&
        <span className="field-error-message">
          {error}
        </span>}
    </div>
  </div>;

export default RadioField;
