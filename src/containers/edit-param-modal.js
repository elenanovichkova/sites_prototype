import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  closeEditParamModal,
  changeActiveParamOption,
  updateActiveConfig,
  selectParam
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
        isOpen={this.props.editParamModalIsOpen}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        contentLabel="Edit Param Modal"
      >
        <div className="title page-header text-center">
          <h3>Edit Parameter</h3>
        </div>
        <form className="form form-horizontal">
          <div className="form-group">
            <label className="control-label col-sm-6" htmlFor="fldsep">
              {this.props.activeParamDetail.formcontrolLabel}
            </label>
            <div className="col-sm-6">
              <select
                className="form-control"
                id={this.props.activeParamDetail.formcontrolName}
                name={this.props.activeParamDetail.formcontrolName}
                defaultValue={this.props.activeParamSelectedOption.value}
                onChange={event => {
                  let target = event.target;
                  let optionValue = target.value;
                  let selectedOption = _.find(
                    this.props.activeParamDetail.options,
                    function(option) {
                      option.selected = false;
                      return option.value == optionValue;
                    }
                  );
                  selectedOption.selected = true;
                  this.props.changeActiveParamOption(selectedOption);
                }}
              >
                {this.props.activeParamDetail.options.map(option => {
                  return (
                    <option value={option.value} key={option.id}>
                      {option.answer}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-6">Parameter tag</label>
            <div className="col-sm-6">
              <p className="form-control-static">
                {this.props.activeParamSelectedOption.param.tag}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-6">Parameter value</label>
            <div className="col-sm-6">
              <p className="form-control-static">
                {this.props.activeParamSelectedOption.param.value}
              </p>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-offset-3 col-xs-3">
              <button
                type="button"
                className="btn btn-default full-width"
                onClick={() => this.props.closeEditParamModal()}
              >
                CANCEL
              </button>
            </div>
            <div className="col-xs-3">
              <button
                type="button"
                className="btn btn-primary full-width"
                onClick={() => {
                  this.props.selectParam(
                    this.props.activeParamSelectedOption.param
                  );
                  this.props.updateActiveConfig(
                    this.props.activeConfig,
                    this.props.activeParam,
                    this.props.activeParamSelectedOption.param
                  );
                }}
              >
                OK
              </button>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}

function mapStateToProps({
  editParamModalIsOpen,
  activeParamDetail,
  activeParamSelectedOption,
  activeConfig,
  activeParam
}) {
  // whatever is returned will show up as a props
  return {
    editParamModalIsOpen,
    activeParamDetail,
    activeParamSelectedOption,
    activeConfig,
    activeParam
  };
}

//enything return from this function will end up as props
function mapDispatchToProps(dispatch) {
  //whenever select is call, the result should be passed to all reducers
  return bindActionCreators(
    {
      closeEditParamModal,
      changeActiveParamOption,
      updateActiveConfig,
      selectParam
    },
    dispatch
  );
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(EditParamModal);
