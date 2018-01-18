import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { closeAddParamModal, updateActiveConfig } from "../actions/index";
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
    height: "auto"
  }
};

class AddParamModal extends Component {
  constructor() {
    super();
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
          <h3>Add Parameter</h3>
        </div>
        <div className="panel panel-default">
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
                                  <div className="col-xs-10">
                                    <select
                                      className="form-control"
                                      disabled={formcontrol.selected}
                                      value={
                                        formcontrol.selected
                                          ? formcontrol.selectedOptionValue
                                          : ""
                                      }
                                    >
                                      <option value="">Select</option>
                                      {formcontrol.options.map(option => {
                                        return (
                                          <option value={option.val}>
                                            {option.descr}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    <small>
                                      {formgroup.name} parameter,{" "}
                                      <span
                                        className={
                                          formcontrol.selected
                                            ? "badge badge-success"
                                            : "badge"
                                        }
                                      >
                                        {formcontrol.options[0].param.tag}
                                        {formcontrol.selected
                                          ? `, ${formcontrol.selectedParamValue}`
                                          : ``}
                                      </span>
                                    </small>
                                  </div>
                                  {formcontrol.selected
                                    ? ""
                                    : <div className="col-xs-2">
                                        <button
                                          type="button"
                                          className="btn btn-default"
                                        >
                                          ADD
                                        </button>
                                      </div>}
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
      updateActiveConfig
    },
    dispatch
  );
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(AddParamModal);
