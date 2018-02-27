import React from "react";

const SelectField = ({ input, label, options, meta: { touched, error } }) =>
  <div className={`form-group ${touched && error ? "has-error" : ""}`}>
    <label>
      {label}
    </label>
    <select {...input} className="form-control">
      {options.map(option =>
        <option key={option.id} value={option.value}>
          {option.descr}
        </option>
      )}
    </select>
    {touched &&
      error &&
      <span className="field-error-message">
        {error}
      </span>}
  </div>;

export default SelectField;
