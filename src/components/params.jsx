import React from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import InlineSelectField from "./inline-select-field.jsx";

const Params = ({
  fields,
  title,
  formConfig,
  meta: { error, submitFailed }
}) => {
  let name = fields.name;
  if (fields.getAll()) {
    return (
      <div className="form form-horizontal">
        <h4 className="title">
          <strong>
            {title}
          </strong>
        </h4>
        <hr />
        <div className="row">
          {fields.getAll().map((member, index) => {
            if (Object.keys(member)[0] && formConfig[Object.keys(member)[0]]) {
              return (
                <div className="col-md-12" key={index}>
                  {/*name should be in format paramsX12[index].paramName like paramsX12[0].px12_docrypt*/}
                  <Field
                    name={`${name}[${index}].${Object.keys(member)[0]}`}
                    options={formConfig[Object.keys(member)[0]].options}
                    component={InlineSelectField}
                    label={`${formConfig[Object.keys(member)[0]].label}`}
                  />
                </div>
              );
            } else {
              return (
                <div className="col-md-offset-6 col-md-6">
                  <div className="form-group">
                    <div className="col-md-12">
                      {Object.keys(member)[0]}, {member[Object.keys(member)[0]]}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    return "";
  }
};

export default Params;
