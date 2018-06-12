import React from "react";

const CheckboxField = ({
  input,
  type,
  label,
  placeholder,
  disabled,
  meta: { touched, error }
}) => {
  return (
    <div className={`${touched && error ? "has-error" : ""}`}>
      <div className="checkbox">
        {disabled
          ? <label htmlFor={input.name} className="light">
              <input {...input} type={type} disabled /> {label}
            </label>
          : <label htmlFor={input.name} className="light">
              <input {...input} type={type} /> {label}
            </label>}
        {touched &&
          error &&
          !disabled &&
          <span className="field-error-message">
            {error}
          </span>}
      </div>
    </div>
  );
};

export default CheckboxField;
