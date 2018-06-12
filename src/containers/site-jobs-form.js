import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";

import { required, alphaNumeric, maxLength9 } from "../validators";

import CheckboxField from "../components/checkbox-field";
import SelectField from "../components/select-field";
import TextField from "../components/text-field";

import { validateSiteJobs, updateSiteJobs } from "../actions/index";

const renderJobs = ({ fields, meta: { error, submitFailed }, formConfig }) =>
  <div>
    {fields.map((member, index) =>
      <div
        key={index}
        id={`site-job-${fields.get(index).id}`}
        className="border-top"
      >
        <div className="row">
          <div className="col-md-2">
            <div className="form-group">
              <div className="padding-top-17">
                <Field
                  name={`${member}.isActive`}
                  type="checkbox"
                  props={index === 0 ? { disabled: true } : { disabled: false }}
                  component={CheckboxField}
                  label={fields.get(index).name}
                />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {index > 0
              ? <div className="row">
                  <div className="col-xs-2">
                    <Field
                      name={`${member}.schedule.timer.at.hour.hour`}
                      validate={[required]}
                      options={formConfig.hour.options}
                      component={SelectField}
                    />
                  </div>
                  <div className="col-xs-2">
                    <Field
                      name={`${member}.schedule.timer.at.hour.minute`}
                      validate={[required]}
                      options={formConfig.minute.options}
                      component={SelectField}
                    />
                  </div>
                  <div className="col-xs-2">
                    <Field
                      name={`${member}.schedule.timer.at.hour.meridiem`}
                      validate={[required]}
                      options={formConfig.meridiem.options}
                      component={SelectField}
                    />
                  </div>
                </div>
              : ""}
          </div>
        </div>
      </div>
    )}
  </div>;

let SiteJobsForm = props => {
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
    activeSiteJobs
  } = props;
  return (
    <form onSubmit={handleSubmit(updateSiteJobs)} id="site-jobs-form">
      <div className="">
        <FieldArray
          name="jobs"
          component={renderJobs}
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
            GENERATE GOBS
          </button>
        </div>
      </div>
    </form>
  );
};

const selector = formValueSelector("SiteJobsForm");

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
SiteJobsForm = reduxForm({
  form: "SiteJobsForm",
  enableReinitialize: true
})(SiteJobsForm);

function mapStateToProps(state) {
  var {
    activeSite,
    formConfig: { data: formConfig },
    defaultSiteFtpJobs: initialValues,
    activeSiteJobs,
    userSitePermission
  } = state;
  // whatever is returned will show up as a props
  return {
    activeSite,
    formConfig,
    initialValues,
    activeSiteJobs,
    userSitePermission
  };
}

// You have to connect() to any reducers that you wish to connect to yourself
SiteJobsForm = connect(mapStateToProps)(SiteJobsForm);

export default SiteJobsForm;
