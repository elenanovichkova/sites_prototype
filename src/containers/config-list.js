import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getConfigDetail,
  duplicateConfig,
  deleteConfig,
  changeConfigsView,
  openNewConfigModal,
  openDuplConfigModal,
  openConfirmationModal,
  toggleEdiCntlPrintMail
} from "../actions/index";
import { bindActionCreators } from "redux";
import NewConfigModal from "./newconfig-modal";
import DuplConfigModal from "./duplconfig-modal";
import ConfirmationModal from "./confirmation-modal";
import Switch from "./switch";

class ConfigList extends Component {
  renderList() {
    //console.log(privs);
    return this.props.configList.map(config => {
      return (
        <tr key={config.ID}>
          <td>
            {config.receiverID}
          </td>
          <td>
            {config.ID}
          </td>
          <td>
            <Switch
              isChecked={config.isActive}
              onChange={event =>
                this.props.toggleEdiCntlPrintMail(config, event)}
            />
          </td>
          <td>
            {config.purpose}
          </td>
          <td>
            {config.usage}
          </td>
          <td>
            <a href="#">
              <span
                className="fa fa-eye"
                onClick={() => {
                  this.props.getConfigDetail(config, () =>
                    this.props.changeConfigsView("config-detail")
                  );
                }}
              />
            </a>
          </td>
          <td>
            <a href="#">
              <span
                className="fa fa-pencil"
                onClick={() => {
                  this.props.getConfigDetail(config, () =>
                    this.props.changeConfigsView("config-edit")
                  );
                }}
              />
            </a>
          </td>
          <td>
            <a href="#">
              <span
                className="fa fa-files-o"
                onClick={() => {
                  this.props.duplicateConfig(config, "duplicate");
                  this.props.openDuplConfigModal();
                }}
              />
            </a>
          </td>
          <td>
            <a href="#">
              <span
                className="fa fa-trash"
                onClick={() => {
                  this.props.openConfirmationModal(
                    `Are you sure you want to delete configuration ${config.ID}`,
                    () => this.props.deleteConfig(config)
                  );
                }}
              />
            </a>
          </td>
        </tr>
      );
    });
  }

  render() {
    if (this.props.activeConfig.isFetching) {
      return (
        <div className="text-center">
          <h3>Loading ...</h3>
        </div>
      );
    }
    return (
      <div className="panel-body">
        <div className="row">
          <div className="col-md-12 text-right">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.props.openNewConfigModal()}
            >
              Add New
            </button>
          </div>
        </div>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>Receiver ID</th>
              <th>ID</th>
              <th>Print&Mail</th>
              <th>Purpose</th>
              <th>Usage</th>
              <th colSpan="4">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>
        <NewConfigModal />
        <DuplConfigModal />
        <ConfirmationModal />
      </div>
    );
  }
}

function mapStateToProps({ configList, activeConfig }) {
  // whatever is returned will show up as a props
  return { configList, activeConfig };
}

function mapDispatchToProps(dispatch) {
  //whenever function called, the result should be passed to all our reducers
  return bindActionCreators(
    {
      getConfigDetail,
      duplicateConfig,
      deleteConfig,
      changeConfigsView,
      openNewConfigModal,
      openDuplConfigModal,
      openConfirmationModal,
      toggleEdiCntlPrintMail
    },
    dispatch
  );
}

//promote component to a container -  it needs to know about dispatch methods. Make them available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);
