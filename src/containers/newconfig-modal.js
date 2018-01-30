import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  closeNewConfigModal,
  updateNewConfigReceiverId,
  updateNewConfigUsage,
  updateNewConfigPurpose,
  createNewConfig
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
    width: "500px"
  }
};

class EditParamModal extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Modal
        isOpen={this.props.isNewConfigModalOpen}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        contentLabel="Edit Param Modal"
      >
        {this.props.newConfig.isSubmitting
          ? <div>Submitting new config data...</div>
          : <div>
              <div className="title page-header text-center">
                <h3>Create New Configuration</h3>
              </div>
              <form className="form form-horizontal">
                <div className="form-group">
                  <label className="control-label col-xs-4">Receiver ID</label>
                  <div className="col-xs-8">
                    <input
                      type="text"
                      className="form-control"
                      value={this.props.newConfig.receiverId}
                      onChange={event =>
                        this.props.updateNewConfigReceiverId(
                          event.target.value
                        )}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-xs-4">Purpose</label>
                  <div className="col-xs-8">
                    <select
                      className="form-control"
                      id="newconfig-purpose"
                      name="purpose"
                      value={this.props.newConfig.purpose}
                      onChange={event =>
                        this.props.updateNewConfigPurpose(event.target.value)}
                    >
                      <option value="">SELECT</option>
                      <option value="TST1">TST1</option>
                      <option value="TST2">TST2</option>
                      <option value="TST3">TST3</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-xs-4">Usage</label>
                  <div className="col-xs-8">
                    <select
                      className="form-control"
                      id="newconfig-usage"
                      name="usage"
                      value={this.props.newConfig.usage}
                      onChange={event =>
                        this.props.updateNewConfigUsage(event.target.value)}
                    >
                      <option value="">SELECT</option>
                      <option value="P">Production</option>
                      <option value="T">Test</option>
                    </select>
                  </div>
                </div>
                {this.props.newConfig.message
                  ? <div className="alert alert-danger">
                      {this.props.newConfig.message}
                    </div>
                  : ""}
                <div className="form-group">
                  <div className="col-xs-offset-4 col-xs-3">
                    <button
                      type="button"
                      className="btn btn-default full-width"
                      onClick={() => this.props.closeNewConfigModal()}
                    >
                      CANCEL
                    </button>
                  </div>
                  <div className="col-xs-3">
                    <button
                      type="button"
                      className="btn btn-primary full-width"
                      onClick={() =>
                        this.props.createNewConfig(
                          this.props.activeSite.codenbr,
                          this.props.newConfig.receiverId,
                          this.props.newConfig.purpose,
                          this.props.newConfig.usage
                        )}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </form>
            </div>}
      </Modal>
    );
  }
}

function mapStateToProps({ activeSite, isNewConfigModalOpen, newConfig }) {
  // whatever is returned will show up as a props
  return {
    activeSite,
    isNewConfigModalOpen,
    newConfig
  };
}

//enything return from this function will end up as props
function mapDispatchToProps(dispatch) {
  //whenever select is call, the result should be passed to all reducers
  return bindActionCreators(
    {
      closeNewConfigModal,
      updateNewConfigReceiverId,
      updateNewConfigUsage,
      updateNewConfigPurpose,
      createNewConfig
    },
    dispatch
  );
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(EditParamModal);
