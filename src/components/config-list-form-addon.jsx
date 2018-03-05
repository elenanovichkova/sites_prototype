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

const renderConfigs = ({
  fields,
  title,
  formConfig,
  meta: { error, submitFailed }
}) => {
  let name = fields.name;
  if (fields.getAll()) {
    return (
      <div className="form form-horizontal">
        <div className="row">
          {fields.getAll().map((member, index) => {
            return (
              <div className="col-md-12" key={index}>
                <Field
                  name={`${name}[${index}].doCopy`}
                  type="checkbox"
                  label={member.ID}
                  component={renderCheckboxField}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return "";
  }
};

const SiteBillQuestionnaireAddon = props => {
  console.log("#########################", props.configs);
  return (
    <div class="site-billquest-form-addon">
      <div className="row">
        <div className="col-md-6">
          Select up to three configurations you want to duplicate
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <FieldArray name="configs" component={renderConfigs} />
          {/*}{props.configs.map(config => {
            return (
              <Field
                name={`config.${config.purpose}`}
                type="checkbox"
                component={renderCheckboxField}
                label={config.ID}
              />
            );
          })}*/}
        </div>
      </div>
    </div>
  );
};

export default SiteBillQuestionnaireAddon;
