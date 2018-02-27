import React from "react";
import { Field } from "redux-form";

import TextField from "./text-field";
import CheckboxField from "./checkbox-field";

const renderTextField = TextField;
const renderCheckboxField = CheckboxField;

const SiteKeyContact = ({ role, isRequired }) =>
  <div className={`form-group ${role}-form-group`}>
    <div className="row">
      <div className="col-md-6">
        <Field
          name={`${role}.first`}
          label={`First Name ${isRequired ? "*" : ""}`}
          placeholder="First Name"
          type="text"
          component={renderTextField}
        />
      </div>
      <div className="col-md-6">
        <Field
          name={`${role}.last`}
          label={`Last Name ${isRequired ? "*" : ""}`}
          placeholder="Last Name"
          type="text"
          component={renderTextField}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">
        <Field
          name={`${role}.title`}
          label={`Title ${isRequired ? "*" : ""}`}
          placeholder="Title"
          type="text"
          component={renderTextField}
        />
      </div>
      <div className="col-md-6">
        <Field
          name={`${role}.company`}
          label="Company"
          placeholder="Company Name"
          component={renderTextField}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">
        <Field
          name={`${role}.phone`}
          label={`Phone ${isRequired ? "*" : ""}`}
          placeholder="Phone"
          component={renderTextField}
        />
      </div>
      <div className="col-md-6">
        <Field
          name={`${role}.email`}
          label={`Email ${isRequired ? "*" : ""}`}
          placeholder="Email"
          type="text"
          component={renderTextField}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-7">
            <div className="">
              <label>
                <span className="checkbox">
                  Do you want to give this user portal access?
                </span>
              </label>
            </div>
          </div>
          <div className="col-md-5">
            <Field
              name={`${role}.hasPortalAccess`}
              label=""
              type="checkbox"
              component={renderCheckboxField}
            />
          </div>
        </div>
        <div className="row" />
        <div className="form-group" />
      </div>
    </div>
  </div>;

export default SiteKeyContact;
