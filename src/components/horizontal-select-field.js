import React from "react";

const HorizontalSelectField = ({
  input,
  label,
  options,
  labelLength,
  selectLength,
  meta: { touched, error }
}) =>
  <div className={`form-group ${touched && error ? "has-error" : ""}`}>
    <span className={`control-label col-md-${labelLength ? labelLength : "6"}`}>
      {label}
    </span>
    <div className={`col-md-${selectLength ? selectLength : "6"}`}>
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
    </div>
  </div>;

export default HorizontalSelectField;
