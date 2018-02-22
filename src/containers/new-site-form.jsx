import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, FieldArray } from "redux-form";
import { load as loadAccount } from "../actions/index.js";
import SiteProfileFormAddon from "../components/site-profile-form-addon";
import SiteBillQuestionnaireAddon from "../components/site-billquest-form-addon";
import SiteAttQuestionnaireAddon from "../components/site-attquest-form-addon";
import SiteConnectivityAddon from "../components/site-connectivity-form-addon";

const data = {
  // used to populate "account" reducer when "Load" is clicked
  receiverName: "Receiver Name",
  receiverTaxId: "123456789",
  siteId: "ABCD",
  receiverId: "123456789",
  receiverMngmntSystem: "managment system",
  receiverAddInfo: "additional information",
  switchPayerIdToPaper: true,
  doElectronicBills: "Y",
  doElectronicBillsCompany: "partner name",
  x12fieldSep: "*",
  doElectronicAtt: "Y",
  optInAttachmentRule: "other",
  optInAttachmentOtherRule: "BVFR",
  attPageCount: 10,
  portalAccess: "Y",
  connectivity: "portalOnly",
  comment: "Born to write amazing Redux code.",
  address: {
    address1: "qqq",
    address2: "sss",
    city: "Concord",
    state: "CA",
    zip: "94596"
  },
  services: {
    ebill: true,
    eatt: true,
    faxatt: true,
    printmail: true,
    portalcorrection: true,
    other: true
  },
  annualVolumes: {
    wcbill: 12345,
    wcatt: 23333,
    autobill: 5555,
    autoatt: 426534,
    otherbill: 3462342,
    otheratt: 345632
  },
  billFileFormat: {
    printfile: true,
    nsf: true,
    file837: true,
    other: true
  },
  billFormType: {
    hcfa1500: true,
    ub04: true,
    pharmacy: true,
    dental: true,
    other: true
  },
  attFileFormat: {
    pdf: true,
    tif: true,
    tiff: true
  },
  attType: {
    ambulance: true,
    ame: true,
    chartNotes: true,
    cmnlmn: true,
    consult: true,
    diagnostic: true,
    disabilityStatus: true,
    fcefca: true,
    firstReport: true,
    homeCare: true,
    ime: true,
    psreport: true,
    pathology: true,
    physicianScript: true,
    preauthorizationRequest: true,
    ptNotes: true,
    qme: true,
    radiology: true,
    referralRequest: true,
    supplementalReport: true,
    surgical: true,
    transportationReport: true,
    twcc73: true,
    other: true
  },
  billFrequency: {
    billFrequencyCnt: 2000,
    billFrequencyPeriod: "biweekly"
  },
  paramsX12: [{ px12_docrypt: "Y" }, { px12_dota1: "Y" }],
  params837: [
    { px12_allowtest: "Y" },
    { p837_lookupstlic: "Y" },
    { p837_paper: "N" },
    { p837_pvdfld: "BCN" },
    { p837_defssn: "999999999" },
    { p837_dopaper: "" }
  ],
  paramsatt: [
    { p837_imagedays: "5" },
    { p837_attag: "634_647_517_485" },
    { p837_at: "R" }
  ],
  params999: [{ px12_do999: "" }],
  params277: [
    { px12_do277ca: "" },
    { patt_autorej277: "" },
    { patt_autorej: "15" },
    { patt_autowarn1: "5" },
    { patt_autowarn2: "15" },
    { patt_autowarn3: "" },
    { patt_autowarn4: "" },
    { p277_perbilling: "" },
    { p277_perpayer: "" },
    { p277_perdate: "" }
  ],
  params835: [
    { p835_ver: "" },
    { p835_perbilling: "" },
    { p835_perpayer: "" },
    { p835_perdate: "" },
    { p835_perclaimtype: "" },
    { p835_perpayee: "" },
    { p835_perzeropay: "" },
    { p835_billdcn: "" }
  ]
};
const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];

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
        })}
      </div>
    </div>
  );
};

let NewSiteForm = props => {
  const { handleSubmit, load, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="button" onClick={() => load(data)}>
          Load Account
        </button>
      </div>

      <h3 className="new-site-form-section-title new-site-form-section-title-company-info">
        <strong>Company Information</strong>
      </h3>
      <hr />

      <SiteProfileFormAddon {...props} />

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
        </div>
      </div>

      <div>
        <label>Comment</label>
        <div>
          <Field name="comment" component="textarea" />
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
  validate
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
