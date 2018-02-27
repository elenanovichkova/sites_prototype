import React from "react";

const CheckboxField = ({
  input,
  type,
  label,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <div className={`${touched && error ? "has-error" : ""}`}>
      <div className="checkbox">
        <label>
          <input {...input} type={type} /> {label}
        </label>
        {touched &&
          error &&
          <span className="field-error-message">
            {error}
          </span>}
      </div>
    </div>
  );
};

export default CheckboxField;
