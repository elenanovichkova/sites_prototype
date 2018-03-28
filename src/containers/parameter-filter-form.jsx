import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm, FieldArray, reset } from "redux-form";

import HorizontalTextField from "../components/horizontal-text-field";
import HorizontalSelectField from "../components/horizontal-select-field";

import { fetchGParams } from "../actions/index.js";

let ParametersFilterForm = props => {
  const {
    handleSubmit,
    load,
    pristine,
    reset,
    submitting,
    error,
    gParamCategoryOptions,
    gParamGroupOptions
  } = props;
  return (
    <div className="well">
      <form onSubmit={handleSubmit(fetchGParams)} className="form-horizontal">
        <div className="row">
          <div className="col-md-3">
            <Field
              name="category"
              label="Category"
              labelLength="3"
              selectLength="9"
              options={gParamCategoryOptions}
              component={HorizontalSelectField}
            />
          </div>
          <div className="col-md-3">
            <Field
              name="group"
              label="Group"
              labelLength="3"
              selectLength="9"
              options={gParamGroupOptions}
              component={HorizontalSelectField}
            />
          </div>
          <div className="col-md-4">
            <Field
              name="pquestion"
              label="Question"
              placeholder="Question"
              type="text"
              labelLength="3"
              inputLength="9"
              component={HorizontalTextField}
            />
          </div>
          <div className="col-md-2">
            <Field
              name="ptag"
              label="Tag"
              placeholder="Tag"
              type="text"
              labelLength="2"
              inputLength="10"
              component={HorizontalTextField}
            />
          </div>
        </div>

        {error &&
          <div className="alert alert-danger">
            <strong>
              {error}
            </strong>
          </div>}
        <div className="row">
          <div className="col-md-offset-10 col-md-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary full-width"
            >
              SEARCH
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const afterSubmit = (result, dispatch, props) => {};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ParametersFilterForm = reduxForm({
  form: "parameterFilterForm"
})(ParametersFilterForm);

function mapStateToProps({
  gparams,
  gParamCategoryOptions,
  gParamGroupOptions
}) {
  return { gparams, gParamCategoryOptions, gParamGroupOptions };
}

// You have to connect() to any reducers that you wish to connect to yourself
ParametersFilterForm = connect(mapStateToProps)(ParametersFilterForm);

export default ParametersFilterForm;
