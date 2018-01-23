import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { closeConfirmationModal } from "../actions/index";
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
        isOpen={this.props.confirmationModalData.isOpen}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        contentLabel="Edit Param Modal"
      >
        <div className="title text-center page-header">
          <h3>
            {this.props.confirmationModalData.text} ?
          </h3>
        </div>
        <div className="row">
          <div className="col-xs-4">
            <button
              type="button"
              className="btn btn-default full-width"
              onClick={() => this.props.closeConfirmationModal()}
            >
              Cancel
            </button>
          </div>
          <div className="col-xs-4">
            <button
              type="button"
              className="btn btn-primary full-width"
              onClick={() => {
                this.props.closeConfirmationModal();
                this.props.confirmationModalData.callback();
              }}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps({ confirmationModalData }) {
  // whatever is returned will show up as a props
  return {
    confirmationModalData
  };
}

//enything return from this function will end up as props
function mapDispatchToProps(dispatch) {
  //whenever select is call, the result should be passed to all reducers
  return bindActionCreators(
    {
      closeConfirmationModal
    },
    dispatch
  );
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(EditParamModal);
