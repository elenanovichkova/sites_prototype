import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  closeDuplConfigModal,
  updateDuplConfigReceiverId,
  updateDuplConfigUsage,
  updateDuplConfigPurpose,
  createDuplConfig
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

class DuplConfigModal extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Modal
        isOpen={this.props.isDuplConfigModalOpen}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        contentLabel="Duplicate config modal"
      >
        {this.props.duplConfig.isSubmitting
          ? <div>Submitting duplicate config data...</div>
          : <div>
              <div className="title page-header text-center">
                <h3>
                  Duplicate Configuration {this.props.configToDuplicate.ID}
                </h3>
              </div>
              <p>Enter new configuration identifiers</p>
              <form className="form form-horizontal">
                <div className="form-group">
                  <label className="control-label col-xs-4">Receiver ID</label>
                  <div className="col-xs-8">
                    <input
                      type="text"
                      className="form-control"
                      id="duplconfig-receiverid"
                      value={this.props.duplConfig.receiverId}
                      onChange={event =>
                        this.props.updateDuplConfigReceiverId(
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
                      id="duplconfig-purpose"
                      name="purpose"
                      value={this.props.duplConfig.purpose}
                      onChange={event =>
                        this.props.updateDuplConfigPurpose(event.target.value)}
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
                      id="duplconfig-usage"
                      name="usage"
                      value={this.props.duplConfig.usage}
                      onChange={event =>
                        this.props.updateDuplConfigUsage(event.target.value)}
                    >
                      <option value="">SELECT</option>
                      <option value="P">Production</option>
                      <option value="T">Test</option>
                    </select>
                  </div>
                </div>
                {this.props.duplConfig.message
                  ? <div className="alert alert-danger">
                      {this.props.duplConfig.message}
                    </div>
                  : ""}
                <div className="form-group">
                  <div className="col-xs-offset-4 col-xs-3">
                    <button
                      type="button"
                      className="btn btn-default full-width"
                      onClick={() => this.props.closeDuplConfigModal()}
                    >
                      CANCEL
                    </button>
                  </div>
                  <div className="col-xs-3">
                    <button
                      type="button"
                      className="btn btn-primary full-width"
                      onClick={() =>
                        this.props.createDuplConfig(
                          this.props.activeSite.codenbr,
                          this.props.duplConfig.receiverId,
                          this.props.duplConfig.purpose,
                          this.props.duplConfig.usage,
                          this.props.activeConfig
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

function mapStateToProps({
  activeSite,
  isDuplConfigModalOpen,
  duplConfig,
  configToDuplicate
}) {
  // whatever is returned will show up as a props
  return {
    activeSite,
    isDuplConfigModalOpen,
    duplConfig,
    configToDuplicate
  };
}

//enything return from this function will end up as props
function mapDispatchToProps(dispatch) {
  //whenever select is call, the result should be passed to all reducers
  return bindActionCreators(
    {
      closeDuplConfigModal,
      updateDuplConfigReceiverId,
      updateDuplConfigUsage,
      updateDuplConfigPurpose,
      createDuplConfig
    },
    dispatch
  );
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(DuplConfigModal);
