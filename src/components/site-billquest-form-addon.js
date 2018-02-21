import React from "react";
import { Field, reduxForm, FieldArray } from "redux-form";

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

const SiteBillQuestionnaireAddon = props =>
  <div class="site-billquest-form-addon">
    <div className="row">
      <div className="col-md-6">
        <Field
          name="doElectronicBills"
          label="Do you currently submit bills electronically?"
          options={props.formConfig.doElectronicBills.options}
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
                options={props.formConfig.billFrequencyPeriod.options}
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
  </div>;

export default SiteBillQuestionnaireAddon;
