import React from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import {
  required,
  zip,
  number,
  abbreviation,
  alphaNumeric,
  length9,
  minLength3,
  maxLength9,
  maxLength12,
  maxLength64,
  maxLength120
} from "../validators";

import TextField from "./text-field";
import HorizontalTextField from "./horizontal-text-field";
import SelectField from "./select-field";
import HorizontalSelectField from "./horizontal-select-field";
import CheckboxField from "./checkbox-field";
import SiteParams from "./site-params.jsx";

const renderParams = SiteParams;
const renderTextField = TextField;
const renderHorizontalTextField = HorizontalTextField;
const renderSelectField = SelectField;
const renderHorizontalSelectField = HorizontalSelectField;
const renderCheckboxField = CheckboxField;

const SiteDetailProfileFormAddon = props => {
  console.log("-------------------", props);
  return (
    <div className="site-profile-form-addon">
      <div className="row">
        <div className="col-md-6">
          <Field
            name="receiverName"
            label="Company name *"
            placeholder="Company name"
            type="text"
            validate={[required, minLength3, maxLength120]}
            component={renderTextField}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="receiverTaxId"
            label="TIN (Tax ID) *"
            placeholder="TIN (Tax ID)"
            type="text"
            validate={[required, number, length9]}
            component={renderTextField}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Field
            name="jiraNbr"
            label="Jopari Jira number"
            placeholder="Jopari Jira number"
            type="text"
            component={renderTextField}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="receiverType"
            label="Type of subbmitter *"
            placeholder="Type of subbmitter"
            validate={[required]}
            options={props.formConfig.receiverType.options}
            component={renderSelectField}
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
            validate={[required]}
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
            validate={[required]}
            component={renderTextField}
          />
        </div>
        <div className="col-md-4">
          <Field
            name="address.state"
            label="State *"
            validate={[required]}
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
            validate={[required, zip]}
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
            validate={[alphaNumeric]}
            component={renderTextField}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="receiverAddInfo"
            label="Company Overview/Type of Client/Clearinghouse Name"
            placeholder="Company Overview/Type of Client/Clearinghouse Name"
            type="text"
            validate={[alphaNumeric]}
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
                name="services.pcorr"
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
            <div className="col-md-4">
              <div className="">
                <label>
                  <span className="checkbox">
                    Switch EDI payer ID to Paper (only if licensed for P/M)
                  </span>
                </label>
              </div>
            </div>
            <div className="col-md-8">
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
            <div className="col-md-4">
              <div className="">
                <label>
                  <span className="checkbox">
                    Do you send 999 acknowledgment after receiving 835?
                  </span>
                </label>
              </div>
            </div>
            <div className="col-md-8">
              <Field
                name="doEobAck999"
                label="(available only via FTP/SFTP)"
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
                      validate={[number, maxLength12]}
                      component={renderHorizontalTextField}
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      name="annualVolumes.wcatt"
                      label="WC Attachments"
                      placeholder="WC Attachments"
                      type="number"
                      validate={[number, maxLength12]}
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
                      validate={[number, maxLength12]}
                      component={renderHorizontalTextField}
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      name="annualVolumes.autoatt"
                      label="Auto Attachments"
                      placeholder="Auto Attachments"
                      type="number"
                      validate={[number, maxLength12]}
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
                      validate={[number, maxLength12]}
                      component={renderHorizontalTextField}
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      name="annualVolumes.otheratt"
                      label="Other Attachments"
                      placeholder="Other Attachments"
                      type="number"
                      validate={[number, maxLength12]}
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

      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <FieldArray
                name="siteparams"
                title="Site parameters"
                formConfig={props.formConfig}
                component={renderParams}
              />
            </div>
          </div>

          <div className="form-group" />
        </div>
      </div>
    </div>
  );
};

export default SiteDetailProfileFormAddon;
