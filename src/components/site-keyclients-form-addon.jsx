import React from "react";
import { Field, reduxForm, FieldArray } from "redux-form";

import TextField from "./text-field";
import HorizontalTextField from "./horizontal-text-field";
import SelectField from "./select-field";
import HorizontalSelectField from "./horizontal-select-field";
import CheckboxField from "./checkbox-field";
import SiteKeyContact from "./site-key-contact";

const renderTextField = TextField;
const renderHorizontalTextField = HorizontalTextField;
const renderSelectField = SelectField;
const renderHorizontalSelectField = HorizontalSelectField;
const renderCheckboxField = CheckboxField;

const SiteKeyClientsFormAddon = props =>
  <div className="site-keyclient-form-addon">
    <div className="row">
      <div className="col-md-6">
        <h3 className="new-site-form-section-title new-site-form-section-title-company-info">
          <strong>Primary Contact</strong>
          <small> (required)</small>
        </h3>
        <hr />

        <SiteKeyContact role="sitePrimaryContact" isRequired="Y" />
      </div>

      <div className="col-md-6">
        <h3 className="new-site-form-section-title new-site-form-section-title-company-info">
          <strong>Billing Coordinator</strong>
        </h3>
        <hr />

        <SiteKeyContact role="siteBillingContact" />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <h3 className="new-site-form-section-title new-site-form-section-title-company-info">
          <strong>Technical/Operations Contact</strong>
        </h3>
        <hr />

        <SiteKeyContact role="siteTechContact" />
      </div>

      <div className="col-md-6">
        <h3 className="new-site-form-section-title new-site-form-section-title-company-info">
          <strong>Additional Contact</strong>
        </h3>
        <hr />

        <SiteKeyContact role="siteAddContact" />
      </div>
    </div>
  </div>;

export default SiteKeyClientsFormAddon;
