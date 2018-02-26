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

const SiteKeyClientsFormAddon = props =>
  <div class="site-keyclient-form-addon">
    <div className="row">
      <div className="col-md-6">
        <h3 className="new-site-form-section-title new-site-form-section-title-company-info">
          <strong>Primary Contact</strong>
          <small> (required)</small>
        </h3>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <Field
              name="sitePrimaryContact.first"
              label="First Name *"
              placeholder="First Name"
              type="text"
              component={renderTextField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="sitePrimaryContact.last"
              label="Last Name *"
              placeholder="Last Name"
              type="text"
              component={renderTextField}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Field
              name="sitePrimaryContact.title"
              label="Title *"
              placeholder="Title"
              type="text"
              component={renderTextField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="sitePrimaryContact.company"
              label="Company"
              placeholder="Company Name"
              component={renderTextField}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Field
              name="sitePrimaryContact.phone"
              label="Phone *"
              placeholder="Phone"
              component={renderTextField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="sitePrimaryContact.email"
              label="Email *"
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
                  name="sitePrimaryContact.hasPortalAccess"
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
      </div>

      <div className="col-md-6">
        <h3 className="new-site-form-section-title new-site-form-section-title-company-info">
          <strong>Billing Coordinator</strong>
        </h3>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <Field
              name="siteBillingContact.first"
              label="First Name"
              placeholder="First Name"
              type="text"
              component={renderTextField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="siteBillingContact.last"
              label="Last Name"
              placeholder="Last Name"
              type="text"
              component={renderTextField}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Field
              name="siteBillingContact.title"
              label="Title"
              placeholder="Title"
              type="text"
              component={renderTextField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="siteBillingContact.company"
              label="Company"
              placeholder="Company Name"
              component={renderTextField}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Field
              name="siteBillingContact.phone"
              label="Phone"
              placeholder="Phone"
              component={renderTextField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="siteBillingContact.email"
              label="Email"
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
                  name="siteBillingContact.hasPortalAccess"
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
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <h3 className="new-site-form-section-title new-site-form-section-title-company-info">
          <strong>Technical/Operations Contact</strong>
        </h3>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <Field
              name="siteTechContact.first"
              label="First Name"
              placeholder="First Name"
              type="text"
              component={renderTextField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="siteTechContact.last"
              label="Last Name"
              placeholder="Last Name"
              type="text"
              component={renderTextField}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Field
              name="siteTechContact.title"
              label="Title"
              placeholder="Title"
              type="text"
              component={renderTextField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="siteTechContact.company"
              label="Company"
              placeholder="Company Name"
              component={renderTextField}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Field
              name="siteTechContact.phone"
              label="Phone"
              placeholder="Phone"
              component={renderTextField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="siteTechContact.email"
              label="Email"
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
                  name="siteTechContact.hasPortalAccess"
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
      </div>

      <div className="col-md-6">
        <h3 className="new-site-form-section-title new-site-form-section-title-company-info">
          <strong>Additional Contact</strong>
        </h3>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <Field
              name="siteAddContact.first"
              label="First Name"
              placeholder="First Name"
              type="text"
              component={renderTextField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="siteAddContact.last"
              label="Last Name"
              placeholder="Last Name"
              type="text"
              component={renderTextField}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Field
              name="siteAddContact.title"
              label="Title"
              placeholder="Title"
              type="text"
              component={renderTextField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="siteAddContact.company"
              label="Company"
              placeholder="Company Name"
              component={renderTextField}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Field
              name="siteAddContact.phone"
              label="Phone"
              placeholder="Phone"
              component={renderTextField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="siteAddContact.email"
              label="Email"
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
                  name="siteAddContact.hasPortalAccess"
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
      </div>
    </div>
  </div>;

export default SiteKeyClientsFormAddon;
