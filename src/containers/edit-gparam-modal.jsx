import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { closeEditGParamModal } from "../actions/index";
import { bindActionCreators } from "redux";
import Modal from "react-modal";

import EditGParamForm from "./edit-gparam-form.jsx";

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

class EditGParamModal extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Modal
        isOpen={this.props.isEditGParamModalOpen}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        contentLabel="Edit GParam Modal"
      >
        <div className="row">
          <div className="col-xs-12 text-right">
            <a href="#">
              <span
                className="fa fa-times"
                onClick={() => this.props.closeEditGParamModal()}
              />
            </a>
          </div>
        </div>
        <div className="title text-center page-header">
          <h3>
            {`EDIT ${this.props.activeGParam.name} PARAMETER`}
          </h3>
        </div>
        <div className="edit-gparameter-form">
          <EditGParamForm />
        </div>
      </Modal>
    );
  }
}

function mapStateToProps({ activeGParam, isEditGParamModalOpen }) {
  // whatever is returned will show up as a props
  return {
    activeGParam,
    isEditGParamModalOpen
  };
}

//enything return from this function will end up as props
function mapDispatchToProps(dispatch) {
  //whenever select is call, the result should be passed to all reducers
  return bindActionCreators(
    {
      closeEditGParamModal
    },
    dispatch
  );
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(EditGParamModal);
