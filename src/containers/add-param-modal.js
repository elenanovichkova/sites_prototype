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

const paramListStyle = {
  maxHeight: "300px",
  width: "auto",
  overflowY: "scroll",
  overflowX: "hidden"
};

class AddParamModal extends Component {
  addParamValueChanged(event) {
    let value = event.target.value;
    this.props.addParamFormControlSetValue(
      value,
      this.props.addParamFormControl
    );
  }

  handleAddNewParam() {
    console.log(this.props.addParamFormControl.options);
    let newParam = _.find(this.props.addParamFormControl.options, {
      val: this.props.addParamFormControl.selectedOptionValue
    }).param;
    this.props.updateActiveConfig(
      this.props.initialActiveConfig,
      this.props.activeConfig,
      {},
      newParam
    );
    this.props.closeAddParamModal();
  }

  renderSelectedFormControl() {
    return (
      <div className="col-xs-4">
        <div className="panel panel-success">
          <div className="panel-heading">
            Select parameter desired value and click "ADDd"
          </div>
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
                      <option key={option.id} value={option.val}>
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
                      onClick={() => this.handleAddNewParam()}
                    >
                      ADD
                    </button>
                  </div>
                : ""}
              <div />
            </div>
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
                    <label>Group</label>{" "}
                    <select className="form-control" id="add-param-group-name">
                      <option value="">SELECT</option>
                      <option value="X12">X12</option>
                      <option value="837">837</option>
                      <option value="att">Att</option>
                      <option value="277">277</option>
                      <option value="999">999</option>
                      <option value="835">835</option>
                      <option value="997">997</option>
                      <option value="275">275</option>
                    </select>{" "}
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
                          <strong>Group</strong>
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
                      <div
                        className="add-params-list-container"
                        style={paramListStyle}
                      >
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
  initialActiveConfig,
  addParamModalIsOpen,
  activeConfig,
  paramList,
  addParamFormControl
}) {
  // whatever is returned will show up as a props
  return {
    initialActiveConfig,
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
