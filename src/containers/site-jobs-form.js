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
          <div className="col-md-10">
            {fields.get(index).name != "Assembler"
              ? <div className="row">
                  <div className="col-xs-5">
                    <div className="row row-time">
                      <div className="col-xs-4 job-hour">
                        <Field
                          name={`${member}.schedule.timer.at.hour.hour`}
                          label="Hour"
                          validate={[required]}
                          options={formConfig.hour.options}
                          component={SelectField}
                        />
                      </div>
                      <div className="col-xs-4 job-minute">
                        <Field
                          name={`${member}.schedule.timer.at.hour.minute`}
                          validate={[required]}
                          label="Minute"
                          options={formConfig.minute.options}
                          component={SelectField}
                        />
                      </div>
                      <div className="col-xs-4 job-meridiem">
                        <Field
                          name={`${member}.schedule.timer.at.hour.meridiem`}
                          validate={[required]}
                          label="AM/PM"
                          options={formConfig.meridiem.options}
                          component={SelectField}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-1" />

                  {fields.get(index).name === "Daily 277"
                    ? <div className="col-xs-2">
                        <Field
                          name={`${member}.params.rtype`}
                          validate={[required]}
                          label="Encrypted"
                          options={formConfig.jobParam277rtype.options}
                          component={SelectField}
                        />
                      </div>
                    : ""}
                  {fields.get(index).name === "Daily 835"
                    ? <div className="col-xs-2">
                        <Field
                          name={`${member}.params.rtype`}
                          validate={[required]}
                          label="Encrypted"
                          options={formConfig.jobParam835rtype.options}
                          component={SelectField}
                        />
                      </div>
                    : ""}
                  <div className="col-xs-2">
                    <Field
                      name={`${member}.params.runftp`}
                      validate={[required]}
                      label="Run FTP"
                      options={formConfig.jobParamRunFtp.options}
                      component={SelectField}
                    />
                  </div>
                  <div className="col-xs-2">
                    <Field
                      name={`${member}.params.runnotify`}
                      validate={[required]}
                      label="Run Notify"
                      options={formConfig.jobParamRunNotify.options}
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
