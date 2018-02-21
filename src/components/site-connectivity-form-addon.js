import React from "react";
import { Field, reduxForm, FieldArray } from "redux-form";

const renderTextField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error }
}) =>
  <div className="form-group">
    <label>
      {label}
    </label>
    <div>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className="form-control"
      />
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>;

const renderHorizontalTextField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error }
}) =>
  <div className="form-group">
    <span className="control-label col-md-6">
      {label}
    </span>
    <div className="col-md-6">
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className="form-control"
      />
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>;

const renderSelectField = ({
  input,
  label,
  options,
  meta: { touched, error }
}) =>
  <div className="form-group">
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
      <span>
        {error}
      </span>}
  </div>;

const renderHorizontalSelectField = ({
  input,
  label,
  options,
  meta: { touched, error }
}) =>
  <div className="form-group">
    <span className="control-label col-md-6">
      {label}
    </span>
    <div className="col-md-6">
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

const renderCheckboxField = ({
  input,
  type,
  label,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <div className="">
      <div className="checkbox">
        <label>
          <input {...input} type={type} /> {label}
        </label>
        {touched &&
          error &&
          <span>
            {error}
          </span>}
      </div>
    </div>
  );
};

const SiteConnectivityAddon = props =>
  <div class="site-connectivity-form-addon">
    <div className="row">
      <div className="col-md-6">
        <Field
          name="portalAccess"
          label="Do you need portal access?"
          options={props.formConfig.portalAccess.options}
          component={renderSelectField}
        />
      </div>
      <div className="col-md-6">
        <label>Specify connectivity type</label>
        <div className="row">
          <div className="col-md-4">
            <span>
              <Field
                name="connectivity"
                component="input"
                type="radio"
                value="portalOnly"
              />{" "}
              Portal Only
            </span>
          </div>
          <div className="col-md-4">
            <span>
              <Field
                name="connectivity"
                component="input"
                type="radio"
                value="ftp"
              />{" "}
              FTP (requires PGP)
            </span>
          </div>
          <div className="col-md-4">
            <span>
              <Field
                name="connectivity"
                component="input"
                type="radio"
                value="sftp"
              />{" "}
              SFTP
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>;

export default SiteConnectivityAddon;
