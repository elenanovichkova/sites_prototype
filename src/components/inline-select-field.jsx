import React from "react";
import { Field, reduxForm, FieldArray } from "redux-form";

const InlineSelectField = ({
  input,
  label,
  options,
  meta: { touched, error }
}) =>
  <div className="form-group">
    <label className="col-xs-6 control-label">
      {label}
    </label>
    <div className="col-xs-6">
      <select {...input} className="form-control">
        {options.map(option =>
          <option key={option.id} value={option.value}>
            {option.descr}
          </option>
        )}
      </select>
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>;

export default InlineSelectField;
