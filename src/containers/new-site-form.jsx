import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, FieldArray } from "redux-form";
import { load as loadAccount } from "../actions/index.js";

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
  paramsX12: [
    {
      px12_docrypt: "Y"
    },
    {
      px12_dota1: "Y"
    }
  ],
  params837: [
    {
      px12_docrypt: "Y"
    },
    {
      px12_dota1: "Y"
    }
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

const renderParams = ({ fields, meta: { error, submitFailed } }) => {
  let name = fields.name;
  return (
    <div className="row">
      {fields.getAll().map((member, index) => {
        return (
          <div className="col-md-12" key={index}>
            {/*name should be in format paramsX12[index].paramName like paramsX12[0].px12_docrypt*/}
            <Field
              name={`${name}[${index}].${Object.keys(member)[0]}`}
              options={formConfig[Object.keys(member)[0]].options}
              component={renderSelectField}
              label={`${formConfig[Object.keys(member)[0]].label}`}
            />
          </div>
        );
      })}
    </div>
  );
};

let NewSiteForm = props => {
  const { handleSubmit, load, pristine, reset, submitting } = props;
  console.log("******************************", props);
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

      <div className="row">
        <div className="col-md-6">
          <Field
            name="masterEntity"
            label="Master Entity"
            options={formConfig.masterEntity.options}
            component={renderSelectField}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="jiraNbr"
            label="Jopari Jira number"
            placeholder="Jopari Jira number"
            type="text"
            component={renderTextField}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Field
            name="receiverName"
            label="Company name *"
            placeholder="Company name"
            type="text"
            component={renderTextField}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="receiverTaxId"
            label="TIN (Tax ID) *"
            placeholder="TIN (Tax ID)"
            component={renderTextField}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Field
            name="siteId"
            label="Jopari Site Name *"
            placeholder="Site abbreviation (all uppercase no spaces)"
            component={renderTextField}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="receiverId"
            label="Submitter ID *"
            placeholder="Submitter ID"
            type="text"
            component={renderTextField}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Field
            name="address.address1"
            label="Street *"
            placeholder="Street"
            type="text"
            component={renderTextField}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="address.address2"
            label="Address 2"
            placeholder="Suite number, floor number, building name, or P.O. Box"
            type="text"
            component={renderTextField}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <Field
            name="address.city"
            label="City *"
            placeholder="City"
            type="text"
            component={renderTextField}
          />
        </div>
        <div className="col-md-4">
          <Field
            name="address.state"
            label="State *"
            options={formConfig.address.state.options}
            component={renderSelectField}
          />
        </div>
        <div className="col-md-4">
          <Field
            name="address.zip"
            label="Zip *"
            placeholder="Zip code"
            type="text"
            component={renderTextField}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Field
            name="receiverMngmntSystem"
            label="Practice managment system"
            placeholder="Practice managment system"
            type="text"
            component={renderTextField}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="receiverAddInfo"
            label="Company Overview/Type of Client/Clearinghouse Name"
            placeholder="Company Overview/Type of Client/Clearinghouse Name"
            type="text"
            component={renderTextField}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <label>Services</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Field
                name="services.ebill"
                label="Electronic Bills"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-4">
              <Field
                name="services.eatt"
                label="Electronic Attachments"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-4">
              <Field
                name="services.faxatt"
                label="Fax Attachments"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Field
                name="services.printmail"
                label="Print & Mail(B&W images)"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-4">
              <Field
                name="services.portalcorrection"
                label="Portal Error Corrections"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-4">
              <Field
                name="services.other"
                label="Other"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
          </div>
          <div className="form-group" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <label>
                  Switch EDI payer ID to Paper (only if licensed for P/M)
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Field
                name="switchPayerIdToPaper"
                label="(for invalid payer ID, juris, form type, etc.)"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
          </div>
          <div className="form-group" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <label>Estimated Annual Volumes</label>
              </div>
            </div>
          </div>

          <div className="form form-horizontal">
            <div className="row">
              <div className="col-md-6">
                <Field
                  name="annualVolumes.wcbill"
                  label="WC Bills"
                  placeholder="WC Bills"
                  type="number"
                  component={renderHorizontalTextField}
                />
              </div>
              <div className="col-md-6">
                <Field
                  name="annualVolumes.wcatt"
                  label="WC Attachments"
                  placeholder="WC Attachments"
                  type="number"
                  component={renderHorizontalTextField}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Field
                  name="annualVolumes.autobill"
                  label="Auto Bills"
                  placeholder="Auto Bills"
                  type="number"
                  component={renderHorizontalTextField}
                />
              </div>
              <div className="col-md-6">
                <Field
                  name="annualVolumes.autoatt"
                  label="Auto Attachments"
                  placeholder="Auto Attachments"
                  type="number"
                  component={renderHorizontalTextField}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Field
                  name="annualVolumes.otherbill"
                  label="Other Bills"
                  placeholder="Other Bills"
                  type="number"
                  component={renderHorizontalTextField}
                />
              </div>
              <div className="col-md-6">
                <Field
                  name="annualVolumes.otheratt"
                  label="Other Attachments"
                  placeholder="Other Attachments"
                  type="number"
                  component={renderHorizontalTextField}
                />
              </div>
            </div>
          </div>
          <div className="form-group" />
        </div>
      </div>

      <h3 className="new-site-form-section-title new-site-form-section-title-bill-questionnaire">
        <strong>Bill Questionnaire</strong>
      </h3>
      <hr />

      <div className="row">
        <div className="col-md-6">
          <Field
            name="doElectronicBills"
            label="Do you currently submit bills electronically?"
            options={formConfig.doElectronicBills.options}
            component={renderSelectField}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="doElectronicBillsCompany"
            label="With whom?"
            placeholder="Enter a name of the company"
            component={renderTextField}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Field
            name="receiverMngmntSystem"
            label="Practice managment system"
            placeholder="Practice managment system"
            type="text"
            component={renderTextField}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="receiverAddInfo"
            label="Company Overview/Type of Client/Clearinghouse Name"
            placeholder="Company Overview/Type of Client/Clearinghouse Name"
            type="text"
            component={renderTextField}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <label>What electronic file format can you produce?</label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <Field
                name="billFileFormat.printfile"
                label="Print File"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-2">
              <Field
                name="billFileFormat.nsf"
                label="NSF"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-2">
              <Field
                name="billFileFormat.file837"
                label="837"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-2">
              <Field
                name="billFileFormat.other"
                label="Other"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
          </div>
          <div className="form-group" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <label>What forms do you produce?</label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <Field
                name="billFormType.hcfa1500"
                label="1500/HCFA"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-2">
              <Field
                name="billFormType.ub04"
                label="UB04"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-2">
              <Field
                name="billFormType.pharmacy"
                label="Pharmacy/RX"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-2">
              <Field
                name="billFormType.dental"
                label="Dental"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-2">
              <Field
                name="billFormType.other"
                label="Other"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
          </div>
          <div className="form-group" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <label>Billing Frequency</label>
              </div>
            </div>
          </div>

          <div className="form form-horizontal">
            <div className="row">
              <div className="col-md-6">
                <Field
                  name="billFrequency.billFrequencyCnt"
                  label="Number of bills"
                  type="number"
                  placeholder="Number of bills"
                  component={renderHorizontalTextField}
                />
              </div>
              <div className="col-md-3">
                <Field
                  name="billFrequency.billFrequencyPeriod"
                  label="Period"
                  options={formConfig.billFrequencyPeriod.options}
                  component={renderHorizontalSelectField}
                />
              </div>
            </div>
          </div>
          <div className="form-group" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-12">
              <label>Which delimiter will be used with X12 transactions?</label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <span>
                <Field
                  name="x12fieldSep"
                  component="input"
                  type="radio"
                  value="*"
                />{" "}
                Asterisk
              </span>
            </div>
            <div className="col-md-3">
              <span>
                <Field
                  name="x12fieldSep"
                  component="input"
                  type="radio"
                  value="~"
                />{" "}
                Tilde
              </span>
            </div>
            <div className="col-md-3">
              <span>
                <Field
                  name="x12fieldSep"
                  component="input"
                  type="radio"
                  value=":"
                />{" "}
                Colon
              </span>
            </div>
            <div className="col-md-3">
              <span>
                <Field
                  name="x12fieldSep"
                  component="input"
                  type="radio"
                  value="|"
                />{" "}
                Vertical Bar
              </span>
            </div>
          </div>
          <div className="form-group" />
        </div>
      </div>

      <h3 className="new-site-form-section-title new-site-form-section-title-bill-questionnaire">
        <strong>Attachments Questionnaire</strong>
      </h3>
      <hr />

      <div className="row">
        <div className="col-md-6">
          <Field
            name="doElectronicAtt"
            label="Do you store your attachments electronically?"
            options={formConfig.doElectronicAtt.options}
            component={renderSelectField}
          />
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-12">
              <label>Select attachments file format(s) that apply?</label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <Field
                name="attFileFormat.pdf"
                label=".pdf"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-2">
              <Field
                name="attFileFormat.tif"
                label=".tif"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-2">
              <Field
                name="attFileFormat.tiff"
                label=".tiff"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
          </div>
          <div className="form-group" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <label>What types of attachemnts do you produce?</label>
              <span> Select all that apply</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Field
                name="attType.ambulance"
                label="Ambulance"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.ame"
                label="AME"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.chartNotes"
                label="Chart Notes"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.cmnlmn"
                label="CMN / LMN"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.consult"
                label="Consult"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.diagnostic"
                label="Diagnostic"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.disabilityStatus"
                label="Disability Status"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.fcefca"
                label="FCE /FCA"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.firstReport"
                label="First Report"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.homeCare"
                label="Home Care"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.ime"
                label="IME"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.psreport"
                label="PS Report"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.pathology"
                label="Pathology"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.physicianScript"
                label="Physician Script / Orders"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.preauthorizationRequest"
                label="Pre-authorization Request"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.ptNotes"
                label="PT / OT Notes"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.qme"
                label="QME"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.radiology"
                label="Radiology"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.referralRequest"
                label="Referral Request"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.supplementalReport"
                label="Supplemental Report"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.surgical"
                label="Surgical"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.transportationReport"
                label="Transportation First Report"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.twcc73"
                label="TWCC73"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
            <div className="col-md-3">
              <Field
                name="attType.other"
                label="Other"
                type="checkbox"
                component={renderCheckboxField}
              />
            </div>
          </div>
          <div className="form-group" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <label>Add "Opt-in" attachment rule</label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <span>
                <Field
                  name="optInAttachmentRule"
                  component="input"
                  type="radio"
                  value="none"
                />{" "}
                None
              </span>
            </div>
            <div className="col-md-2">
              <span>
                <Field
                  name="optInAttachmentRule"
                  component="input"
                  type="radio"
                  value="billingTin"
                />{" "}
                Billing TIN
              </span>
            </div>
            <div className="col-md-2">
              <span htmlFor="optInAttachmentRule">
                <Field
                  id="optInAttachmentRule"
                  name="optInAttachmentRule"
                  component="input"
                  type="radio"
                  value="bht03"
                />{" "}
                Billing NPI
              </span>
            </div>
            <div className="col-md-2">
              <span>
                <Field
                  name="optInAttachmentRule"
                  component="input"
                  type="radio"
                  value="billingNpi"
                />{" "}
                BHT03
              </span>
            </div>
            <div className="col-md-2">
              <span>
                <Field
                  name="optInAttachmentRule"
                  component="input"
                  type="radio"
                  value="other"
                />{" "}
                Other
              </span>
            </div>
          </div>
          <div className="form-group" />
        </div>
        <div className="col-md-5">
          <Field
            name="optInAttachmentOtherRule"
            label="If 'Other' was selected, enter loop/segment for 'Opt-in' rule"
            placeholder="Practice managment system"
            type="text"
            component={renderTextField}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Field
            name="attPageCount"
            label="What is the average page count for each attachment?"
            type="number"
            component={renderTextField}
          />
        </div>
      </div>

      <h3 className="new-site-form-section-title new-site-form-section-title-bill-questionnaire">
        <strong>Connectivity</strong>
      </h3>
      <hr />

      <div className="row">
        <div className="col-md-6">
          <Field
            name="portalAccess"
            label="Do you need portal access?"
            options={formConfig.portalAccess.options}
            component={renderSelectField}
          />
        </div>
        <div className="col-md-6">
          <label>Specify connectivity type</label>
          <div className="row">
            <div className="col-md-4">
              <span>
                <Field
                  name="connectivity"
                  component="input"
                  type="radio"
                  value="portalOnly"
                />{" "}
                Portal Only
              </span>
            </div>
            <div className="col-md-4">
              <span>
                <Field
                  name="connectivity"
                  component="input"
                  type="radio"
                  value="ftp"
                />{" "}
                FTP (requires PGP)
              </span>
            </div>
            <div className="col-md-4">
              <span>
                <Field
                  name="connectivity"
                  component="input"
                  type="radio"
                  value="sftp"
                />{" "}
                SFTP
              </span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="new-site-form-section-title new-site-form-section-title-bill-questionnaire">
        <strong>X12 parameters</strong>
      </h3>
      <hr />

      <div className="row">
        <div className="col-md-6">
          <FieldArray name="paramsX12" component={renderParams} />
        </div>
      </div>

      <h3 className="new-site-form-section-title new-site-form-section-title-bill-questionnaire">
        <strong>837 parameters</strong>
      </h3>
      <hr />

      <div className="row">
        <div className="col-md-6">
          <FieldArray name="params837" component={renderParams} />
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

const formConfig = {
  portalAccess: {
    label: "Do you need portal access?",
    options: [
      {
        id: "portalAccess_0",
        descr: "SELECT",
        value: ""
      },
      {
        id: "portalAccess_1",
        descr: "YES",
        value: "Y"
      },
      {
        id: "portalAccess_2",
        descr: "NO",
        value: "N"
      }
    ]
  },
  billFrequencyPeriod: {
    label: "Period",
    options: [
      {
        id: "billFrequencyPeriod_0",
        descr: "SELECT",
        value: ""
      },
      {
        id: "billFrequencyPeriod_1",
        descr: "Daily",
        value: "daily"
      },
      {
        id: "billFrequencyPeriod_2",
        descr: "Bi-weekly",
        value: "biweekly"
      },
      {
        id: "billFrequencyPeriod_3",
        descr: "Weekly",
        value: "weekly"
      },
      {
        id: "billFrequencyPeriod_4",
        descr: "Bi-monthly",
        value: "bimonthly"
      },
      {
        id: "billFrequencyPeriod_5",
        descr: "Monthly",
        value: "monthly"
      }
    ]
  },
  doElectronicAtt: {
    label: "Do you store your attachments electronically?",
    options: [
      {
        id: "doElectronicAtt_0",
        descr: "SELECT",
        value: ""
      },
      {
        id: "doElectronicAtt_1",
        descr: "YES",
        value: "Y"
      },
      {
        id: "doElectronicAtt_2",
        descr: "NO",
        value: "N"
      }
    ]
  },
  doElectronicBills: {
    label: "Do you currently submit bills electronically?",
    options: [
      {
        id: "doElectronicBills_0",
        descr: "SELECT",
        value: ""
      },
      {
        id: "doElectronicBills_1",
        descr: "YES",
        value: "Y"
      },
      {
        id: "doElectronicBills_2",
        descr: "NO",
        value: "N"
      }
    ]
  },
  address: {
    label: "State",
    state: {
      options: [
        {
          id: "state_0",
          descr: "SELECT",
          value: ""
        },
        {
          id: "state_1",
          descr: "Alabama",
          value: "AL"
        },
        {
          id: "state_2",
          descr: "Alaska",
          value: "AK"
        },
        {
          id: "state_3",
          descr: "American Samoa",
          value: "AS"
        },
        {
          id: "state_4",
          descr: "Arizona",
          value: "AZ"
        },
        {
          id: "state_5",
          descr: "Arkansas",
          value: "AR"
        },
        {
          id: "state_6",
          descr: "California",
          value: "CA"
        },
        {
          id: "state_7",
          descr: "Colorado",
          value: "CO"
        },
        {
          id: "state_8",
          descr: "Connecticut",
          value: "CT"
        },
        {
          id: "state_9",
          descr: "Delaware",
          value: "DE"
        },
        {
          id: "state_10",
          descr: "District Of Columbia",
          value: "DC"
        },
        {
          id: "state_11",
          descr: "Federated States Of Micronesia",
          value: "FM"
        },
        {
          id: "state_12",
          descr: "Florida",
          value: "FL"
        },
        {
          id: "state_13",
          descr: "Georgia",
          value: "GA"
        },
        {
          id: "state_14",
          descr: "Guam",
          value: "GU"
        },
        {
          id: "state_15",
          descr: "Hawaii",
          value: "HI"
        },
        {
          id: "state_16",
          descr: "Idaho",
          value: "ID"
        },
        {
          id: "state_17",
          descr: "Illinois",
          value: "IL"
        },
        {
          id: "state_18",
          descr: "Indiana",
          value: "IN"
        },
        {
          id: "state_19",
          descr: "Iowa",
          value: "IA"
        },
        {
          id: "state_20",
          descr: "Kansas",
          value: "KS"
        },
        {
          id: "state_21",
          descr: "Kentucky",
          value: "KY"
        },
        {
          id: "state_22",
          descr: "Louisiana",
          value: "LA"
        },
        {
          id: "state_23",
          descr: "Maine",
          value: "ME"
        },
        {
          id: "state_24",
          descr: "Marshall Islands",
          value: "MH"
        },
        {
          id: "state_25",
          descr: "Maryland",
          value: "MD"
        },
        {
          id: "state_26",
          descr: "Massachusetts",
          value: "MA"
        },
        {
          id: "state_27",
          descr: "Michigan",
          value: "MI"
        },
        {
          id: "state_28",
          descr: "Minnesota",
          value: "MN"
        },
        {
          id: "state_29",
          descr: "Mississippi",
          value: "MS"
        },
        {
          id: "state_30",
          descr: "Missouri",
          value: "MO"
        },
        {
          id: "state_31",
          descr: "Montana",
          value: "MT"
        },
        {
          id: "state_32",
          descr: "Nebraska",
          value: "NE"
        },
        {
          id: "state_33",
          descr: "Nevada",
          value: "NV"
        },
        {
          id: "state_34",
          descr: "New Hampshire",
          value: "NH"
        },
        {
          id: "state_35",
          descr: "New Jersey",
          value: "NJ"
        },
        {
          id: "state_36",
          descr: "New Mexico",
          value: "NM"
        },
        {
          id: "state_37",
          descr: "New York",
          value: "NY"
        },
        {
          id: "state_38",
          descr: "North Carolina",
          value: "NC"
        },
        {
          id: "state_39",
          descr: "North Dakota",
          value: "ND"
        },
        {
          id: "state_40",
          descr: "Northern Mariana Islands",
          value: "MP"
        },
        {
          id: "state_41",
          descr: "Ohio",
          value: "OH"
        },
        {
          id: "state_42",
          descr: "Oklahoma",
          value: "OK"
        },
        {
          id: "state_43",
          descr: "Oregon",
          value: "OR"
        },
        {
          id: "state_44",
          descr: "Palau",
          value: "PW"
        },
        {
          id: "state_45",
          descr: "Pennsylvania",
          value: "PA"
        },
        {
          id: "state_46",
          descr: "Puerto Rico",
          value: "PR"
        },
        {
          id: "state_47",
          descr: "Rhode Island",
          value: "RI"
        },
        {
          id: "state_48",
          descr: "South Carolina",
          value: "SC"
        },
        {
          id: "state_49",
          descr: "South Dakota",
          value: "SD"
        },
        {
          id: "state_50",
          descr: "Tennessee",
          value: "TN"
        },
        {
          id: "state_51",
          descr: "Texas",
          value: "TX"
        },
        {
          id: "state_52",
          descr: "Utah",
          value: "UT"
        },
        {
          id: "state_53",
          descr: "Vermont",
          value: "VT"
        },
        {
          id: "state_54",
          descr: "Virgin Islands",
          value: "VI"
        },
        {
          id: "state_55",
          descr: "Virginia",
          value: "VA"
        },
        {
          id: "state_56",
          descr: "Washington",
          value: "WA"
        },
        {
          id: "state_57",
          descr: "West Virginia",
          value: "WV"
        },
        {
          id: "state_58",
          descr: "Wisconsin",
          value: "WI"
        },
        {
          id: "state_59",
          descr: "Wyoming",
          value: "WY"
        }
      ]
    }
  },
  masterEntity: {
    label: "Master Entity",
    options: [
      {
        id: "state_1",
        descr: "NONE",
        value: ""
      },
      {
        id: "state_2",
        descr: "BACTES",
        value: "BACTES"
      },
      {
        id: "state_3",
        descr: "CERESOFT",
        value: "CERESOFT"
      },
      {
        id: "state_4",
        descr: "ETACTICS",
        value: "ETACTICS"
      },
      {
        id: "state_5",
        descr: "GALENMD",
        value: "GALENMD"
      },
      {
        id: "state_6",
        descr: "INTEGRITAS",
        value: "INTEGRITAS"
      },
      {
        id: "state_7",
        descr: "RAINTREE",
        value: "RAINTREE"
      }
    ]
  },
  px12_docrypt: {
    label: "Do files need to be encrypted",
    options: [
      {
        id: "px12_docrypt_0",
        descr: "SELECT",
        value: ""
      },
      {
        id: "px12_docrypt_1",
        descr: "Yes",
        value: "Y"
      },
      {
        id: "px12_docrypt_2",
        descr: "No",
        value: "N"
      }
    ]
  },
  px12_dota1: {
    label: "Request acknowledgment",
    options: [
      {
        id: "px12_dota1_0",
        descr: "SELECT",
        value: ""
      },
      {
        id: "px12_dota1_1",
        descr: "Yes",
        value: "Y"
      },
      {
        id: "px12_dota1_2",
        descr: "No",
        value: "N"
      }
    ]
  }
};

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
      initialValues: state.siteTemplateData.data
    };
  },
  { load: loadAccount } // bind account loading action creator
)(NewSiteForm);

export default NewSiteForm;
