import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm, FieldArray } from "redux-form";
import { asyncValidateNewSite, updateSiteProfile } from "../actions/index.js";

import SiteDetailProfileFormAddon from "../components/site-detail-profile-form-addon.jsx";

import validate from "../validate-new-site";

const submit = values => {
  console.log("submiting values", values);
};

let SiteProfileForm = props => {
  const { handleSubmit, load, pristine, reset, submitting, error } = props;
  console.log("****************************** new site props", props);
  return (
    <form onSubmit={handleSubmit(updateSiteProfile)} id="site-profile-form">
      <div className="panel panel-default">
        <div className="panel-body">
          <SiteDetailProfileFormAddon {...props} />
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
SiteProfileForm = reduxForm({
  form: "siteProfileForm",
  enableReinitialize: true,
  validate,
  asyncValidate: asyncValidateNewSite,
  asyncBlurFields: ["receiverTaxId", "siteId", "receiverId"]
})(SiteProfileForm);

function mapStateToProps({
  siteProfile: { profile: initialValues },
  formConfig: { data: formConfig }
}) {
  // whatever is returned will show up as a props
  return {
    initialValues,
    formConfig
  };
}

// You have to connect() to any reducers that you wish to connect to yourself
SiteProfileForm = connect(mapStateToProps)(SiteProfileForm);

export default SiteProfileForm;
