import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";
import { closeNewConfigModal } from "../actions/index";
import { bindActionCreators } from "redux";

class NewSiteForm extends Component {
  renderSiteInfoTextField(field) {
    return (
      <div className="form-group">
        <label className="control-label col-md-6">
          {field.label}
        </label>
        <div className="col-md-6">
          <input
            {...field.input}
            name={field.name}
            type={field.type}
            value={field.defaultValue}
            className="form-control"
          />
        </div>
      </div>
    );
  }

  renderSiteInfoSelectField(field) {
    return (
      <div className="form-group">
        <label className="control-label col-md-6">
          {field.label}
        </label>
        <div className="col-md-6">
          <select
            {...field.input}
            name={field.name}
            type={field.type}
            className="form-control"
          >
            {field.options.map(option =>
              <option value={option.val}>
                {option.descr}
              </option>
            )}
          </select>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.props.activeSiteTemplate);
    return (
      <div className="row">
        <div className="col-md-12">
          <form className="form form-horizontal">
            <div className="row">
              <div className="col-md-12">
                <h3>Site Information</h3>
              </div>
            </div>
            {Object.keys(
              this.props.activeSiteTemplate.epsite
            ).map((key, index) => {
              let siteProperty = this.props.activeSiteTemplate.epsite[key];
              if (siteProperty.type === "text") {
                return (
                  <Field
                    name={siteProperty.name}
                    label={siteProperty.label}
                    defaultValue={siteProperty.defaultValue}
                    component={this.renderSiteInfoTextField}
                  />
                );
              } else if (siteProperty.type === "select") {
                return (
                  <Field
                    name={siteProperty.name}
                    label={siteProperty.label}
                    options={siteProperty.options}
                    component={this.renderSiteInfoSelectField}
                  />
                );
              }
            })}
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ activeSiteTemplate }) {
  // whatever is returned will show up as a props
  return {
    activeSiteTemplate,
    initialValues: { codeNbr: "qqq" }
  };
}

//enything return from this function will end up as props
function mapDispatchToProps(dispatch) {
  //whenever select is call, the result should be passed to all reducers
  return bindActionCreators(
    {
      closeNewConfigModal
    },
    dispatch
  );
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "NewSiteForm" })(NewSiteForm)
);
