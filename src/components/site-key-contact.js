import React from "react";
import { Field } from "redux-form";

import {
  required,
  zip,
  number,
  extPhoneNumber,
  email,
  alphaNumeric,
  minLength3,
  maxLength64,
  maxLength128
} from "../validators";

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
          validate={
            isRequired
              ? [required, alphaNumeric, maxLength64, minLength3]
              : [alphaNumeric, maxLength64]
          }
          component={renderTextField}
        />
      </div>
      <div className="col-md-6">
        <Field
          name={`${role}.last`}
          label={`Last Name ${isRequired ? "*" : ""}`}
          placeholder="Last Name"
          type="text"
          validate={
            isRequired
              ? [required, alphaNumeric, maxLength64, minLength3]
              : [alphaNumeric, maxLength64]
          }
          component={renderTextField}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">
        <Field
          name={`${role}.title`}
          label="Title"
          placeholder="Title"
          type="text"
          validate={[alphaNumeric, maxLength64, minLength3]}
          component={renderTextField}
        />
      </div>
      <div className="col-md-6">
        <Field
          name={`${role}.company`}
          label="Company"
          placeholder="Company Name"
          type="text"
          validate={[alphaNumeric, maxLength128, minLength3]}
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
          type="text"
          validate={isRequired ? [required, extPhoneNumber] : [extPhoneNumber]}
          component={renderTextField}
        />
      </div>
      <div className="col-md-6">
        <Field
          name={`${role}.email`}
          label={`Email ${isRequired ? "*" : ""}`}
          placeholder="Email"
          type="text"
          validate={isRequired ? [required, email] : [email]}
          component={renderTextField}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <Field
              name={`${role}.hasPortalAccess`}
              label="Do you want to give this user portal access?"
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
