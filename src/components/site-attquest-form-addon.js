import React from "react";
import { Field, reduxForm, FieldArray } from "redux-form";

import TextField from "./text-field";
import HorizontalTextField from "./horizontal-text-field";
import SelectField from "./select-field";
import HorizontalSelectField from "./horizontal-select-field";
import CheckboxField from "./checkbox-field";

const renderTextField = TextField;
const renderHorizontalTextField = HorizontalTextField;
const renderSelectField = SelectField;
const renderHorizontalSelectField = HorizontalSelectField;
const renderCheckboxField = CheckboxField;

const SiteAttQuestionnaireAddon = props =>
  <div class="site-attquest-form-addon">
    <div className="row">
      <div className="col-md-6">
        <Field
          name="doElectronicAtt"
          label="Do you store your attachments electronically?"
          options={props.formConfig.doElectronicAtt.options}
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
      <div className="col-md-7">
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
          placeholder="Enter loop/segment for 'Opt-in' rule"
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
  </div>;

export default SiteAttQuestionnaireAddon;
