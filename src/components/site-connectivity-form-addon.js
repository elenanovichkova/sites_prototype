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

const SiteConnectivityAddon = props =>
  <div class="site-connectivity-form-addon">
    <div className="row">
      <div className="col-md-6">
        <Field
          name="portalAccess"
          label="Do you need portal access?"
          options={props.formConfig.portalAccess.options}
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
  </div>;

export default SiteConnectivityAddon;
