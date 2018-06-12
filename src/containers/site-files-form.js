import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";

import { required, alphaNumeric, maxLength9 } from "../validators";

import TextField from "../components/text-field";
import SelectField from "../components/select-field";
import RadioField from "../components/radio-field";

import { validateSiteFiles, updateSiteFtpConfig } from "../actions/index";

const renderField = ({ input, label, type, meta: { touched, error } }) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>;

const renderHobbies = ({ fields, meta: { error } }) =>
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Hobby
      </button>
    </li>
    {fields.map((hobby, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        >
          Remove Hobby
        </button>
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}
        />
      </li>
    )}
    {error &&
      <li className="error">
        {error}
      </li>}
  </ul>;

const renderFiles = ({ fields, meta: { error, submitFailed } }) => {
  console.log("### fields", fields);
  return (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}>
          Add File
        </button>
        {submitFailed &&
          error &&
          <span>
            {error}
          </span>}
      </li>
      {fields.forEach((file, index) => {
        console.log("### file", fields.get(index));
        return (
          <li key={index}>
            {index > 0
              ? <button
                  type="button"
                  title="Remove File"
                  onClick={() => fields.remove(index)}
                >
                  Remove File
                </button>
              : ""}
            <h4>
              File Type #{index + 1}
            </h4>
            <Field
              name={`${file}.fileDescr`}
              type="text"
              component={renderField}
              label="File Description"
            />
            <Field
              name={`${file}.fileExtension`}
              label="File Extention"
              validate={[required]}
              options={[
                {
                  id: `${file}-extention-option-0`,
                  descr: "SELECT",
                  value: ""
                },
                {
                  id: `${file}-extention-option-1`,
                  descr: ".txt",
                  value: ".txt"
                },
                {
                  id: `${file}-extention-option-2`,
                  descr: ".txt.pgp",
                  value: ".txt.pgp"
                },
                {
                  id: `${file}-extention-option-3`,
                  descr: ".zip",
                  value: ".zip"
                }
              ]}
              component={SelectField}
            />
            <FieldArray name={`${file}.hobbies`} component={renderHobbies} />
          </li>
        );
      })}
    </ul>
  );
};

const renderDefaults = ({ fields, meta: { error, submitFailed } }) => {
  return (
    <div>
      {fields.map((file, fileIndex) => {
        console.log("### file", fields.get(fileIndex));
        return (
          <div key={fileIndex}>
            <p>
              <strong>
                {fields.get(fileIndex).fileDescr}
              </strong>
            </p>
            <p>
              <span>
                {fields.get(fileIndex).fileNameParts.map((part, partIndex) =>
                  <span key={part.value}>
                    <span>
                      {part.value == "siteId"
                        ? fields.get(fileIndex).siteId
                        : part.value}
                    </span>
                    <span>
                      {partIndex <
                      fields.get(fileIndex).fileNameParts.length - 1
                        ? fields.get(fileIndex).fileNamePartsSeparator
                        : ""}
                    </span>
                  </span>
                )}
              </span>
              <span>
                {fields.get(fileIndex).fileExtension}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

let SiteFilesForm = props => {
  const {
    handleSubmit,
    load,
    pristine,
    reset,
    submitting,
    error,
    submitSucceeded,
    fileNameConventionType,
    userSitePermission
  } = props;
  return (
    <form onSubmit={handleSubmit(updateSiteFtpConfig)} id="site-files-form">
      <div className="">
        <div className="panel-body">
          <Field
            id="fileNameConventionType_default"
            name="fileNameConventionType"
            label="Default File Name Convention"
            type="radio"
            value="default"
            component={RadioField}
          />
          <Field
            id="fileNameConventionType_custom"
            name="fileNameConventionType"
            label="Custom File Name Convention"
            type="radio"
            value="custom"
            component={RadioField}
          />
          {fileNameConventionType == "default"
            ? <FieldArray name="default" component={renderDefaults} />
            : "custom"}
          {error &&
            <div className="alert alert-danger">
              <strong>
                {error}
              </strong>
            </div>}

          {!error &&
            submitSucceeded &&
            <div className="alert alert-success">
              <strong>Update Successful</strong>
            </div>}

          {userSitePermission === "fulledit" || userSitePermission === "edit"
            ? <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  GEN FTP CONFIG
                </button>
              </div>
            : ""}
        </div>
      </div>
    </form>
  );
};

const selector = formValueSelector("SiteFilesForm");

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
SiteFilesForm = reduxForm({
  form: "SiteFilesForm",
  enableReinitialize: true,
  validate: validateSiteFiles
})(SiteFilesForm);

function mapStateToProps(state) {
  var {
    activeSite,
    formConfig: { data: formConfig },
    userSitePermission
  } = state;
  const fileNameConventionType = selector(state, "fileNameConventionType");
  // whatever is returned will show up as a props
  return {
    activeSite,
    fileNameConventionType,
    formConfig,
    userSitePermission
  };
}

// You have to connect() to any reducers that you wish to connect to yourself
SiteFilesForm = connect(mapStateToProps)(SiteFilesForm);

export default SiteFilesForm;
