import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, FieldArray } from "redux-form";
import { load as loadAccount, asyncValidateNewSite } from "../actions/index.js";
import SiteProfileFormAddon from "../components/site-profile-form-addon";
import SiteBillQuestionnaireAddon from "../components/site-billquest-form-addon";
import SiteAttQuestionnaireAddon from "../components/site-attquest-form-addon";
import SiteConnectivityAddon from "../components/site-connectivity-form-addon";
import SiteKeyClientsFormAddon from "../components/site-keyclients-form-addon";

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
  console.log("******************* input", input);
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

const renderInlineSelectField = ({
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

const renderParams = ({
  fields,
  title,
  formConfig,
  meta: { error, submitFailed }
}) => {
  let name = fields.name;
  if (fields.getAll()) {
    return (
      <div className="form form-horizontal">
        <h4 className="title">
          <strong>
            {title}
          </strong>
        </h4>
        <hr />
        <div className="row">
          {fields.getAll().map((member, index) => {
            if (Object.keys(member)[0] && formConfig[Object.keys(member)[0]]) {
              return (
                <div className="col-md-12" key={index}>
                  {/*name should be in format paramsX12[index].paramName like paramsX12[0].px12_docrypt*/}
                  <Field
                    name={`${name}[${index}].${Object.keys(member)[0]}`}
                    options={formConfig[Object.keys(member)[0]].options}
                    component={renderInlineSelectField}
                    label={`${formConfig[Object.keys(member)[0]].label}`}
                  />
                </div>
              );
            } else {
              return (
                <div className="col-md-offset-6 col-md-6">
                  <div className="form-group">
                    <div className="col-md-12">
                      {Object.keys(member)[0]}, {member[Object.keys(member)[0]]}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    return "";
  }
};

let NewSiteForm = props => {
  const { handleSubmit, load, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      {/*}<div>
        <button type="button" onClick={() => load(data)}>
          Load Account
        </button>
      </div>*/}

      <h3 className="new-site-form-section-title new-site-form-section-title-company-info">
        <strong>Company Information</strong>
      </h3>
      <hr />

      <SiteProfileFormAddon {...props} />

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Key Client Contacts</h3>
        </div>
        <div className="panel-body">
          <SiteKeyClientsFormAddon {...props} />
        </div>
      </div>

      <h3 className="new-site-form-section-title new-site-form-section-title-bill-questionnaire">
        <strong>Bill Questionnaire</strong>
      </h3>
      <hr />

      <SiteBillQuestionnaireAddon {...props} />

      <h3 className="new-site-form-section-title new-site-form-section-title-bill-questionnaire">
        <strong>Attachments Questionnaire</strong>
      </h3>
      <hr />

      <SiteAttQuestionnaireAddon {...props} />

      <h3 className="new-site-form-section-title new-site-form-section-title-bill-questionnaire">
        <strong>Connectivity</strong>
      </h3>
      <hr />

      <SiteConnectivityAddon {...props} />

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="title new-site-form-section-title new-site-form-section-title-edi-configuration">
            <strong>EDI configuration</strong>
          </h3>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="paramsX12"
                title="X12 General Parameters"
                formConfig={props.formConfig}
                component={renderParams}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params837"
                title="837 Healthcare Claim"
                formConfig={props.formConfig}
                component={renderParams}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="paramsatt"
                title="Attachments Parameters"
                formConfig={props.formConfig}
                component={renderParams}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params999"
                title="999 Implementation Acknowledgment"
                formConfig={props.formConfig}
                component={renderParams}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params277"
                title="277 Health Care Claim Acknowledgement"
                formConfig={props.formConfig}
                component={renderParams}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params835"
                title="835 The Explanation of Benefits (EOB)"
                formConfig={props.formConfig}
                component={renderParams}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params997"
                title="997 Functional Acknowledgment"
                formConfig={props.formConfig}
                component={renderParams}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params824"
                title="824 Health Care Benefit Enrollment"
                formConfig={props.formConfig}
                component={renderParams}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params275"
                title="275 Patient Information Transaction Set"
                formConfig={props.formConfig}
                component={renderParams}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Comment</label>
        <div>
          <Field name="comment" component="textarea" className="form-control" />
        </div>
      </div>

      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Undo Changes
        </button>
      </div>
    </form>
  );
};

function validate(values) {
  console.log("****************** validating values", values);
  return {};
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
NewSiteForm = reduxForm({
  form: "initializeFromState",
  enableReinitialize: true,
  validate,
  asyncValidate: asyncValidateNewSite,
  asyncBlurFields: ["receiverName", "receiverTaxId", "siteId", "receiverId"]
})(NewSiteForm);

// You have to connect() to any reducers that you wish to connect to yourself
NewSiteForm = connect(
  state => {
    return {
      initialValues: state.siteTemplateData.data,
      formConfig: state.formConfig.data
    };
  },
  { load: loadAccount } // bind account loading action creator
)(NewSiteForm);

export default NewSiteForm;
