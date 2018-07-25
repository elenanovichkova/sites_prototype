import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Field,
  reduxForm,
  FieldArray,
  reset,
  updateSyncWarnings
} from "redux-form";
import {
  asyncValidateNewSite,
  submitNewSite,
  changeSitesView,
  selectSite,
  fetchConfigs,
  handleOrgNameChange
} from "../actions/index.js";
import SiteProfileFormAddon from "../components/site-profile-form-addon";
import SiteBillQuestionnaireAddon from "../components/site-billquest-form-addon";
import SiteAttQuestionnaireAddon from "../components/site-attquest-form-addon";
import SiteConnectivityAddon from "../components/site-connectivity-form-addon";
import SiteKeyClientsFormAddon from "../components/site-keyclients-form-addon";
import Params from "../components/params.jsx";

import validate from "../validate-new-site";
import { newSiteWarn } from "../actions/index.js";

/*const submitMyForm = data => {
  const { createRecord, resetForm } = props;
  return createRecord(data).then(() => {
    resetForm();
    // do other success stuff
  });
};*/

let NewSiteForm = props => {
  const { handleSubmit, load, pristine, reset, submitting, error } = props;
  return (
    <form onSubmit={handleSubmit(submitNewSite)}>
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
                component={Params}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params837"
                title="837 Healthcare Claim"
                formConfig={props.formConfig}
                component={Params}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="paramsatt"
                title="Attachments Parameters"
                formConfig={props.formConfig}
                component={Params}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params999"
                title="999 Implementation Acknowledgment"
                formConfig={props.formConfig}
                component={Params}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params277"
                title="277 Health Care Claim Acknowledgement"
                formConfig={props.formConfig}
                component={Params}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params835"
                title="835 The Explanation of Benefits (EOB)"
                formConfig={props.formConfig}
                component={Params}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params997"
                title="997 Functional Acknowledgment"
                formConfig={props.formConfig}
                component={Params}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params824"
                title="824 Health Care Benefit Enrollment"
                formConfig={props.formConfig}
                component={Params}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="params275"
                title="275 Patient Information Transaction Set"
                formConfig={props.formConfig}
                component={Params}
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

const afterSubmit = (result, dispatch, props) => {
  console.log("######################### props", props.values.siteId);
  dispatch(changeSitesView("site-detail"));
  dispatch(selectSite({ siteId: "ADELANTO" }));
  dispatch(fetchConfigs());
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
NewSiteForm = reduxForm({
  form: "newSiteForm",
  enableReinitialize: true,
  validate,
  asyncValidate: asyncValidateNewSite,
  asyncBlurFields: ["receiverName", "siteId", "receiverId"],
  onSubmitSuccess: afterSubmit,
  destroyOnUnmount: true
})(NewSiteForm);

function mapStateToProps({
  siteTemplateData: { data: initialValues },
  formConfig: { data: formConfig },
  orglist
}) {
  return { initialValues, formConfig, orglist };
}

function mapDispatchToProps(dispatch) {
  const updateNewSiteSyncWarnings = syncWarning =>
    updateSyncWarnings("newSiteForm", syncWarning);
  return bindActionCreators(
    { handleOrgNameChange, updateNewSiteSyncWarnings },
    dispatch
  );
}

// You have to connect() to any reducers that you wish to connect to yourself
NewSiteForm = connect(mapStateToProps, mapDispatchToProps)(NewSiteForm);

export default NewSiteForm;
