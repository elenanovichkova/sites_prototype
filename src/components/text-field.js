import React from "react";

const TextField = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error }
}) =>
  <div className={`form-group ${touched && error ? "has-error" : ""}`}>
    <label>
      {label}
    </label>
    <div className={asyncValidating ? "async-validating" : ""}>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className="form-control"
      />
      {touched &&
        error &&
        <span className="field-error-message">
          {error}
        </span>}
    </div>
  </div>;

export default TextField;
