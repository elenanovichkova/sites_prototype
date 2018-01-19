import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  closeAddParamModal,
  updateActiveConfig,
  updateParamList
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
        <div className="title page-header text-center">
          <h3>Add Parameters</h3>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            Select parameter to be added to configuration
          </div>
          <div className="panel-body">
            <div className="row params-list-container">
              <div className="col-md-12">
                <div className="">
                  {this.props.paramList.length == 0
                    ? <div>Loading...</div>
                    : ""}
                  {this.props.paramList.map(formgroup => {
                    return (
                      <div key={formgroup.id}>
                        {formgroup.formcontrols.map(formcontrol => {
                          return (
                            <div key={formcontrol.id}>
                              <div className="form-group">
                                <label>
                                  {formcontrol.label}
                                </label>
                                <div className="row">
                                  <div className="col-xs-12">
                                    <select
                                      className="form-control"
                                      disabled={formcontrol.selected}
                                      value={
                                        formcontrol.selected ||
                                        formcontrol.staged
                                          ? formcontrol.selectedOptionValue
                                          : ""
                                      }
                                      onChange={event =>
                                        this.props.updateParamList(
                                          event,
                                          formcontrol,
                                          this.props.paramList
                                        )}
                                    >
                                      <option value="">Select</option>
                                      {formcontrol.options.map(option => {
                                        return (
                                          <option
                                            key={option.id}
                                            value={option.val}
                                          >
                                            {option.descr}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    <small>
                                      {formgroup.name} parameter,{" "}
                                      <span
                                        className={this.getParamClassName(
                                          formcontrol
                                        )}
                                      >
                                        {formcontrol.options[0].param.tag}
                                        {formcontrol.selected ||
                                        formcontrol.staged
                                          ? `, ${formcontrol.selectedParamValue}`
                                          : ``}
                                      </span>
                                    </small>
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
          </div>
          <div className="panel-footer">
            <div>
              Green badge - parameter is in configuration(to change value close
              this modal and click edit)
            </div>
            <div>Blue badge - selected parameter</div>
            <div>Gray badge - available parameter to be selected</div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">Selected parameters</div>
          <div className="panel-body">
            {this.renderAddedParams()}
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-md-2">
              <button type="button" className="btn btn-default full-width">
                Cancel
              </button>
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-primary full-width">
                OK
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps({ addParamModalIsOpen, activeConfig, paramList }) {
  // whatever is returned will show up as a props
  return {
    addParamModalIsOpen,
    activeConfig,
    paramList
  };
}

//enything return from this function will end up as props
function mapDispatchToProps(dispatch) {
  //whenever select is call, the result should be passed to all reducers
  return bindActionCreators(
    {
      closeAddParamModal,
      updateActiveConfig,
      updateParamList
    },
    dispatch
  );
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(AddParamModal);
