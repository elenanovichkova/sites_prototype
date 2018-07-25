import React from "react";

const TextField = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error, warning }
}) =>
  <div
    className={`form-group ${touched && error ? "has-error" : ""} ${touched &&
    warning
      ? "has-warning"
      : ""}`}
  >
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
      {touched &&
        warning &&
        !error &&
        <span className="field-warning-message">
          {warning}
        </span>}
    </div>
  </div>;

export default TextField;
