import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  closeAddParamModal,
  updateActiveConfig,
  updateParamList,
  selectAddParamFormControl
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
    overflowY: "scroll",
    width: "1000px"
  }
};

class AddParamModal extends Component {
  constructor() {
    super();
  }

  renderAddedParams() {
    var paramListClone = _.cloneDeep(this.props.paramList);
    return _.filter(paramListClone, formgroup => {
      let stagedFormControls = _.filter(
        formgroup.formcontrols,
        formcontrol => formcontrol.staged
      );
      formgroup.formcontrols = stagedFormControls;
      return stagedFormControls.length > 0;
    }).map(formgroup => {
      return (
        <div key={formgroup.id} className="row">
          <div className="col-md-12">
            <div className="title">
              <h3>
                {formgroup.name}
              </h3>
            </div>
          </div>
          <div className="col-md-12">
            {formgroup.formcontrols.map(formcontrol => {
              let stagedOption = _.find(
                formcontrol.options,
                option => option.val == formcontrol.selectedOptionValue
              );
              return (
                <div key={formcontrol.id} className="panel-body  nav-tabs">
                  <div className="row">
                    <div className="col-xs-3">
                      {stagedOption.param.formcontrolLabel}
                    </div>
                    <div className="col-xs-4">
                      {stagedOption.param.formcontrolOptionDescr}
                    </div>
                    <div className="col-xs-3">
                      {stagedOption.param.tag}
                    </div>
                    <div className="col-xs-2">
                      {stagedOption.param.value}
                    </div>
                  </div>
                </div>
              );
            })}{" "}
          </div>
        </div>
      );
    });
  }

  getParamClassName(formcontrol) {
    let className = "";
    if (formcontrol.selected) {
      className = "badge badge-success";
    } else if (formcontrol.staged) {
      className = "badge badge-info";
    } else {
      className = "badge";
    }
    return className;
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
                    />{" "}
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
                    ? <div>
                        {this.props.addParamFormControl.label}
                      </div>
                    : <div className="col-xs-4">Select Param</div>}
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
      selectAddParamFormControl
    },
    dispatch
  );
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(AddParamModal);
