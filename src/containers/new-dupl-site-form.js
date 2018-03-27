import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, FieldArray } from "redux-form";
import {
  load as loadAccount,
  asyncValidateNewSite,
  submitNewDuplSite
} from "../actions/index.js";
import SiteProfileFormAddon from "../components/site-profile-form-addon";
import SiteBillQuestionnaireAddon from "../components/site-billquest-form-addon";
import SiteAttQuestionnaireAddon from "../components/site-attquest-form-addon";
import SiteConnectivityAddon from "../components/site-connectivity-form-addon";
import SiteKeyClientsFormAddon from "../components/site-keyclients-form-addon";
import ConfigListFormAddon from "../components/config-list-form-addon";

import validate from "../validate-new-site";

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

let NewDuplSiteForm = props => {
  const { handleSubmit, load, pristine, reset, submitting, error } = props;
  return (
    <form onSubmit={handleSubmit(submitNewDuplSite)}>
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
            <strong>EDI configurations</strong>
          </h3>
        </div>
        <div className="panel-body">
          <ConfigListFormAddon {...props} />
        </div>
      </div>

      <div className="form-group">
        <label>Comment</label>
        <div>
          <Field name="comment" component="textarea" className="form-control" />
        </div>
      </div>

      {error &&
        <div className="alert alert-danger">
          <strong>
            {error}
          </strong>
        </div>}

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

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
NewDuplSiteForm = reduxForm({
  form: "newDuplSiteForm",
  enableReinitialize: true,
  validate,
  asyncValidate: asyncValidateNewSite,
  asyncBlurFields: ["receiverName", "receiverTaxId", "siteId", "receiverId"]
})(NewDuplSiteForm);

// You have to connect() to any reducers that you wish to connect to yourself
NewDuplSiteForm = connect(
  state => {
    return {
      initialValues: state.siteDuplicateData,
      formConfig: state.formConfig.data
    };
  },
  { load: loadAccount } // bind account loading action creator
)(NewDuplSiteForm);

export default NewDuplSiteForm;
