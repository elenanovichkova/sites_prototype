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

const SiteProfileFormAddon = props =>
  <div class="site-profile-form-addon">
    <div className="row">
      <div className="col-md-6">
        <Field
          name="masterEntity"
          label="Master Entity"
          options={props.formConfig.masterEntity.options}
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
          options={props.formConfig.state.options}
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
          <div className="col-md-5">
            <div className="">
              <label>
                Switch EDI payer ID to Paper (only if licensed for P/M)
              </label>
            </div>
          </div>
          <div className="col-md-7">
            <Field
              name="switchPayerIdToPaper"
              label="(for invalid payer ID, juris, form type, etc.)"
              type="checkbox"
              component={renderCheckboxField}
            />
          </div>
        </div>
        <div className="row" />
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
            <div className="col-md-8">
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
          </div>
        </div>
        <div className="form-group" />
      </div>
    </div>
  </div>;

export default SiteProfileFormAddon;
