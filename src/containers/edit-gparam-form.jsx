import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm, FieldArray } from "redux-form";
import { updateGParam, deleteOption } from "../actions/index.js";

import TextField from "../components/text-field";

const renderOptions = ({ fields, meta: { error, submitFailed } }) =>
  <div>
    <div className="row">
      <div className="col-md-offset-2 col-md-8">
        <div className="form-group">
          <button
            type="button"
            onClick={() => fields.push({})}
            className="btn btn-primary full-width"
          >
            Add Option
          </button>
        </div>
      </div>

      {submitFailed &&
        error &&
        <span>
          {error}
        </span>}
    </div>
    {fields.map((member, index) =>
      <div key={index} className="panel panel-default">
        <div className="panel-heading">
          <div className="row">
            <div className="col-xs-11">
              Option #{index + 1}
            </div>
            <div className="col-xs-1">
              <a href="#">
                <span
                  type="button"
                  title="Remove Member"
                  className="fa fa-trash"
                  onClick={() => fields.remove(index)}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="panel-body">
          <Field
            name={`${member}.val`}
            type="text"
            component={TextField}
            label="Value"
          />
          <Field
            name={`${member}.descr`}
            type="text"
            component={TextField}
            label="Description"
          />
        </div>
      </div>
    )}
  </div>;

let EditGParamForm = props => {
  const {
    handleSubmit,
    load,
    pristine,
    reset,
    submitting,
    error,
    activeGParam,
    deleteOption
  } = props;
  return (
    <form onSubmit={handleSubmit(updateGParam)} id="sites-edit-gparam-form">
      <div className="">
        <div className="panel-body">
          <Field
            name="category"
            label="Parameter Category"
            placeholder="Category"
            type="text"
            component={TextField}
          />
          <Field
            name="group"
            label="Parameter Group"
            placeholder="Group"
            type="text"
            component={TextField}
          />
          <Field
            name="question"
            label="Parameter Question"
            placeholder="Question"
            type="text"
            component={TextField}
          />
          <div>
            <FieldArray name="options" component={renderOptions} />
          </div>
          {error &&
            <div className="alert alert-danger">
              <strong>
                {error}
              </strong>
            </div>}

          <div className="row">
            <div className="col-xs-6">
              <button
                type="submit"
                disabled={pristine || submitting}
                className="btn btn-primary full-width"
              >
                Submit
              </button>
            </div>
            <div className="col-xs-6">
              <button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
                className="btn btn-default full-width"
              >
                Undo Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditGParamForm = reduxForm({
  form: "editGParamForm"
})(EditGParamForm);

function mapStateToProps({ activeGParam, activeGParam: initialValues }) {
  // whatever is returned will show up as a props
  return {
    activeGParam,
    initialValues
  };
}

// You have to connect() to any reducers that you wish to connect to yourself
EditGParamForm = connect(mapStateToProps)(EditGParamForm);

export default EditGParamForm;
