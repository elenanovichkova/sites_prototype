import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  closeAddParamModal,
  updateActiveConfig,
  updateParamList,
  selectAddParamFormControl,
  addParamFormControlSetValue
} from "../actions/index";
import { bindActionCreators } from "redux";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "700px",
    width: "1000px"
  }
};

class AddParamModal extends Component {
  addParamValueChanged(event) {
    let value = event.target.value;
    this.props.addParamFormControlSetValue(
      value,
      this.props.addParamFormControl
    );
  }

  renderSelectedFormControl() {
    return (
      <div className="col-xs-4">
        <div className="panel-body">
          <div className="form">
            <div className="form-group">
              <label>
                {this.props.addParamFormControl.label}
              </label>
              <select
                className="form-control"
                value={this.props.addParamFormControl.selectedOptionValue}
                onChange={event => this.addParamValueChanged(event)}
              >
                <option value="">SELECT</option>
                {this.props.addParamFormControl.options.map(option => {
                  return (
                    <option value={option.val}>
                      {option.descr}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-xs-2 control-label">Tag</label>
                <div className="col-xs-10">
                  <p className="form-control-static">
                    {this.props.addParamFormControl.options[0].param.tag}
                  </p>
                </div>
              </div>
              <div className="form-group">
                <label className="col-xs-2 control-label">Value</label>
                <div className="col-xs-10">
                  <p className="form-control-static">
                    {this.props.addParamFormControl.selectedParamValue}
                  </p>
                </div>
              </div>
            </div>
            {this.props.addParamFormControl.selectedParamValue != ""
              ? <div className="form-group">
                  <button
                    className="btn btn-primary"
                    onClick={this.props.addNewParam}
                  >
                    ADD
                  </button>
                </div>
              : ""}
            <div />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Modal
        isOpen={this.props.addParamModalIsOpen}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        contentLabel="Add Param Modal"
      >
        <div className="row">
          <div className="col-xs-offset-11 col-xs-1 text-right">
            <a href="#" onClick={() => this.props.closeAddParamModal()}>
              <span className="fa fa-times" />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="title page-header text-center">
              <h3>Add Parameter</h3>
            </div>
            <div>
              <p>Search parameter</p>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <form
                  id="search-param-to-add-form"
                  className="form form-inline"
                >
                  <div className="form-group">
                    <label>Group Name</label>{" "}
                    <input
                      type="text"
                      className="form-control"
                      id="add-param-group-name"
                    />{" "}
                  </div>
                  <div className="form-group">
                    <label>&nbsp;Question</label>{" "}
                    <input
                      type="text"
                      className="form-control"
                      id="add-param-question"
                    />{" "}
                  </div>
                  <div className="form-group">
                    <label>&nbsp;Parameter</label>{" "}
                    <input
                      type="text"
                      className="form-control"
                      id="add-param-tag"
                    />
                  </div>{" "}
                  <button type="button" className="btn btn-primary">
                    Search
                  </button>
                </form>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-xs-8">
                    <div className="nav-tabs">
                      <div className="row">
                        <div className="col-xs-3">
                          <strong>Group name</strong>
                        </div>
                        <div className="col-xs-4">
                          <strong>Question</strong>
                        </div>
                        <div className="col-xs-5">
                          <strong>Parameter</strong>
                        </div>
                      </div>
                    </div>
                    <div className="add-param-table-body">
                      {this.props.paramList.length == 0
                        ? <div>Loading...</div>
                        : ""}
                      <div className="add-params-list-container">
                        {this.props.paramList.map(formgroup => {
                          return (
                            <div key={formgroup.id}>
                              {formgroup.formcontrols.map(formcontrol => {
                                return (
                                  <div
                                    key={formcontrol.id}
                                    className={`row ${this.props
                                      .addParamFormControl.name ==
                                    formcontrol.name
                                      ? "selected"
                                      : ""}`}
                                    onClick={() =>
                                      this.props.selectAddParamFormControl(
                                        formcontrol
                                      )}
                                  >
                                    <div className="">
                                      <div className="nav-tabs">
                                        <div className="col-xs-3">
                                          {formgroup.name}
                                        </div>
                                        <div className="col-xs-4">
                                          {formcontrol.label}
                                        </div>
                                        <div className="col-xs-5">
                                          {formcontrol.options[0].param.tag}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {this.props.addParamFormControl.options
                    ? this.renderSelectedFormControl()
                    : <div className="col-xs-4">
                        <div className="panel-body">
                          <div className="form">
                            <div className="form-group">
                              <label>Select Parameter</label>
                            </div>
                          </div>
                        </div>
                      </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps({
  addParamModalIsOpen,
  activeConfig,
  paramList,
  addParamFormControl
}) {
  // whatever is returned will show up as a props
  return {
    addParamModalIsOpen,
    activeConfig,
    paramList,
    addParamFormControl
  };
}

//enything return from this function will end up as props
function mapDispatchToProps(dispatch) {
  //whenever select is call, the result should be passed to all reducers
  return bindActionCreators(
    {
      closeAddParamModal,
      updateActiveConfig,
      updateParamList,
      selectAddParamFormControl,
      addParamFormControlSetValue
    },
    dispatch
  );
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(AddParamModal);
