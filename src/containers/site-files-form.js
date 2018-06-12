import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";

import { required, alphaNumeric, maxLength9 } from "../validators";

import HorizontalTextField from "../components/horizontal-text-field";

import { validateSiteFiles, updateSiteFtpConfig } from "../actions/index";

const renderFiles = ({ fields, meta: { error, submitFailed }, formConfig }) =>
  <div>
    {fields.map((member, index) =>
      <div
        key={index}
        id={`site-file-${fields.get(index).id}`}
        className="site-file-row"
      >
        <div className="row">
          <div className="col-md-12">
            <div className="padding-top-17">
              <Field
                name={`${member}.match.value`}
                label={`${fields.get(index).name} regex`}
                placeholder="Inbound file regex"
                type="text"
                component={HorizontalTextField}
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>;

let SiteInboundFilesForm = props => {
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
      onSubmit={handleSubmit(updateSiteFtpConfig)}
      id="site-inbound-files-form"
      className="form form-horizontal"
    >
      <div className="">
        <FieldArray
          name="files"
          component={renderFiles}
          formConfig={formConfig}
        />
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
            GENERATE FTP CONFIG
          </button>
        </div>
      </div>
    </form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
SiteInboundFilesForm = reduxForm({
  form: "SiteInboundFilesForm",
  validate: validateSiteFiles
})(SiteInboundFilesForm);

function mapStateToProps(state) {
  var {
    activeSite,
    formConfig: { data: formConfig },
    defaultSiteFtpConfig: initialValues,
    activeSiteInboundFiles,
    userSitePermission
  } = state;
  // whatever is returned will show up as a props
  return {
    activeSite,
    initialValues,
    activeSiteInboundFiles,
    userSitePermission,
    formConfig
  };
}

// You have to connect() to any reducers that you wish to connect to yourself
SiteInboundFilesForm = connect(mapStateToProps)(SiteInboundFilesForm);

export default SiteInboundFilesForm;
