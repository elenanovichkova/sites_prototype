import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";

import { required } from "../validators";

import HorizontalTextField from "../components/horizontal-text-field";

import { updateSiteFtpNotify } from "../actions/index";

let SiteFtpNotifyForm = props => {
  const {
    handleSubmit,
    load,
    pristine,
    reset,
    submitting,
    error,
    submitSucceeded,
    anyTouched,
    userSitePermission,
    formConfig,
    activeSiteInboundFiles
  } = props;
  return (
    <form
      onSubmit={handleSubmit(updateSiteFtpNotify)}
      id="site-ftpnotify-form"
      className="form form-horizontal"
    >
      <div className="">
        {/*}<Field
          name="states[1].actions.deliver.dest"
          label="Destination deliver"
          type="text"
          component={HorizontalTextField}
        />*/}
        <div className="row">
          <div className="col-md-12">
            <div>
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
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            GENERATE FTP NOTIFY
          </button>
        </div>
      </div>
    </form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
SiteFtpNotifyForm = reduxForm({
  form: "SiteFtpNotifyForm"
})(SiteFtpNotifyForm);

function mapStateToProps(state) {
  var {
    activeSite,
    formConfig: { data: formConfig },
    defaultSiteFtpNotify: initialValues,
    activeSiteFtpNotify,
    userSitePermission
  } = state;
  // whatever is returned will show up as a props
  return {
    activeSite,
    initialValues,
    activeSiteFtpNotify,
    userSitePermission,
    formConfig
  };
}

// You have to connect() to any reducers that you wish to connect to yourself
SiteFtpNotifyForm = connect(mapStateToProps)(SiteFtpNotifyForm);

export default SiteFtpNotifyForm;
