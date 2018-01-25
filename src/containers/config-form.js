import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EditParamModal from "./edit-param-modal";
import AddParamModal from "./add-param-modal";
import ConfirmationModal from "./confirmation-modal";
import ParamListItem from "./param-list-item";
import {
  changeConfigsView,
  selectParam,
  getParamDetail,
  openEditParamModal,
  openAddParamModal,
  fetchParams,
  changeActiveConfigReceiverId,
  changeActiveConfigUsage,
  changeActiveConfigPurpose,
  changeActiveConfigFldSep,
  updateConfig,
  openConfirmationModal,
  deleteParam
} from "../actions/index";

class ConfigForm extends Component {
  renderX12paramsTitle() {
    if (this.props.activeConfig.data.paramsX12.length > 0) {
      return (
        <tr className="config-param-title config-param-title-x12">
          <td colSpan="5">
            <strong>X12</strong>
          </td>
        </tr>
      );
    }
  }

  render837paramsTitle() {
    if (this.props.activeConfig.data.params837.length > 0) {
      return (
        <tr className="config-param-title config-param-title-837">
          <td colSpan="5">
            <strong>837</strong>
          </td>
        </tr>
      );
    }
  }

  renderAttparamsTitle() {
    if (this.props.activeConfig.data.paramsatt.length > 0) {
      return (
        <tr className="config-param-title config-param-title-att">
          <td colSpan="5">
            <strong>Attachments</strong>
          </td>
        </tr>
      );
    }
  }

  render999paramsTitle() {
    if (this.props.activeConfig.data.params999.length > 0) {
      return (
        <tr className="config-param-title config-param-title-999">
          <td colSpan="5">
            <strong>999 Acknowledgement</strong>
          </td>
        </tr>
      );
    }
  }

  render277paramsTitle() {
    if (this.props.activeConfig.data.params277.length > 0) {
      return (
        <tr className="config-param-title config-param-title-277">
          <td colSpan="5">
            <strong>277 Claim status</strong>
          </td>
        </tr>
      );
    }
  }

  render835paramsTitle() {
    if (this.props.activeConfig.data.params835.length > 0) {
      return (
        <tr className="config-param-title config-param-title-835">
          <td colSpan="5">
            <strong>835 EOB</strong>
          </td>
        </tr>
      );
    }
  }

  render275paramsTitle() {
    if (this.props.activeConfig.data.params275.length > 0) {
      return (
        <tr className="config-param-title config-param-title-275">
          <td colSpan="5">
            <strong>275 Patient Information Transaction Set</strong>
          </td>
        </tr>
      );
    }
  }

  render997paramsTitle() {
    if (this.props.activeConfig.data.params997.length > 0) {
      return (
        <tr className="config-param-title config-param-title-997">
          <td colSpan="5">
            <strong>997 Functional Acknowledgment</strong>
          </td>
        </tr>
      );
    }
  }

  render824paramsTitle() {
    if (this.props.activeConfig.data.params824.length > 0) {
      return (
        <tr className="config-param-title config-param-title-824">
          <td colSpan="5">
            <strong>824 Application Advice</strong>
          </td>
        </tr>
      );
    }
  }

  renderUndefinedparamsTitle() {
    if (this.props.activeConfig.data.paramsUndefined.length > 0) {
      return (
        <tr className="config-param-title config-param-title-undefined">
          <td colSpan="5">
            <strong>Undefined params</strong>
          </td>
        </tr>
      );
    }
  }

  selectParam(param) {
    if (this.props.activeParam != "" && this.props.activeParam == param) {
      //if param is already selected
      this.props.selectParam("");
    } else {
      //new param selected
      this.props.selectParam(param);
    }
  }

  render() {
    if (this.props.activeConfig.isFetching) {
      return <div>...loading</div>;
    }
    return (
      <div className="panel-body">
        <p>
          <a
            href="#"
            onClick={() => {
              this.props.changeConfigsView("config-list");
            }}
          >
            <span className="fa fa-chevron-circle-left" /> BACK
          </a>
        </p>
        <div className="title text-center page-header">
          <h3>
            {this.props.activeConfig.data.ID}
          </h3>
        </div>
        <form className="form form-horizontal">
          <div className="form-group">
            <label className="control-label col-sm-5" htmlFor="receiverId">
              Receiver Id:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                id="receiverId"
                name="receiverId"
                placeholder="Enter receiver/submitter Id"
                value={this.props.activeConfig.data.receiverID}
                onChange={event => {
                  let target = event.target;
                  let value = target.value;
                  this.props.changeActiveConfigReceiverId(
                    value,
                    this.props.activeConfig
                  );
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-5" htmlFor="usage">
              Usage:
            </label>
            <div className="col-sm-7">
              <select
                className="form-control"
                id="usage"
                name="usage"
                value={this.props.activeConfig.data.usage}
                onChange={event => {
                  let target = event.target;
                  let value = target.value;
                  this.props.changeActiveConfigUsage(
                    value,
                    this.props.activeConfig
                  );
                }}
              >
                <option value="">SELECT</option>
                <option value="P">Production</option>
                <option value="T">Test</option>
              </select>
            </div>
          </div>
          {/*<div className="form-group">
            <label className="control-label col-sm-5" htmlFor="purpose">
              Purpose
            </label>
            <div className="col-sm-7">
              <select
                className="form-control"
                id="purpose"
                name="purpose"
                value={this.props.activeConfig.data.purpose}
                onChange={event => {
                  let target = event.target;
                  let value = target.value;
                  this.props.changeActiveConfigPurpose(
                    value,
                    this.props.activeConfig
                  );
                }}
              >
                <option value="">SELECT</option>
                <option value="EBIL">EBIL</option>
                <option value="EBRV">EBRV</option>
                <option value="PPO">PPO</option>
                <option value="EDI3">EDI3</option>
                <option value="PNOT">PNOT</option>
                <option value="DISB">DISB</option>
                <option value="SRCA">SRCA</option>
                <option value="UNKN">UNKN</option>
              </select>
            </div>
          </div>*/}
          <div className="form-group">
            <label className="control-label col-sm-5" htmlFor="fldsep">
              Which delimiter will be used with X12 transactions?
            </label>
            <div className="col-sm-7">
              <select
                className="form-control"
                id="fldsep"
                name="fldsep"
                value={this.props.activeConfig.data.fldSep}
                onChange={event => {
                  let target = event.target;
                  let value = target.value;
                  this.props.changeActiveConfigFldSep(
                    value,
                    this.props.activeConfig
                  );
                }}
              >
                <option value="">SELECT</option>
                <option value="*">Asterisk(*)</option>
                <option value="~">Tilde(~)</option>
                <option value=":">Colon(:)</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title title">EDI Control parameters</h3>
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-10">
                      <table className="table edicntl-param-table editable-edicntl-param-table">
                        <thead>
                          <tr>
                            <th />
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Tag</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.renderX12paramsTitle()}
                          {this.props.activeConfig.data.paramsX12.map(param => {
                            return (
                              <ParamListItem param={param} key={param.id} />
                            );
                          })}
                          {this.render837paramsTitle()}
                          {this.props.activeConfig.data.params837.map(param => {
                            return (
                              <ParamListItem param={param} key={param.id} />
                            );
                          })}
                          {this.renderAttparamsTitle()}
                          {this.props.activeConfig.data.paramsatt.map(param => {
                            return (
                              <ParamListItem param={param} key={param.id} />
                            );
                          })}
                          {this.render999paramsTitle()}
                          {this.props.activeConfig.data.params999.map(param => {
                            return (
                              <ParamListItem param={param} key={param.id} />
                            );
                          })}
                          {this.render277paramsTitle()}
                          {this.props.activeConfig.data.params277.map(param => {
                            return (
                              <ParamListItem param={param} key={param.id} />
                            );
                          })}
                          {this.render835paramsTitle()}
                          {this.props.activeConfig.data.params835.map(param => {
                            return (
                              <ParamListItem param={param} key={param.id} />
                            );
                          })}
                          {this.render275paramsTitle()}
                          {this.props.activeConfig.data.params275.map(param => {
                            return (
                              <ParamListItem param={param} key={param.id} />
                            );
                          })}
                          {this.render997paramsTitle()}
                          {this.props.activeConfig.data.params997.map(param => {
                            return (
                              <ParamListItem param={param} key={param.id} />
                            );
                          })}
                          {this.render824paramsTitle()}
                          {this.props.activeConfig.data.params824.map(param => {
                            return (
                              <ParamListItem param={param} key={param.id} />
                            );
                          })}
                          {this.renderUndefinedparamsTitle()}
                          {this.props.activeConfig.data.paramsUndefined.map(
                            param => {
                              return (
                                <ParamListItem param={param} key={param.id} />
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-2 text-right">
                      <div className="form-group">
                        <div className="col-md-12">
                          <input
                            type="button"
                            className="btn btn-default full-width"
                            value="ADD..."
                            onClick={() => {
                              this.props.fetchParams(
                                this.props.activeConfig,
                                () => this.props.openAddParamModal()
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <input
                            type="button"
                            className="btn btn-default full-width"
                            disabled={
                              this.props.activeParam === "" ||
                              this.props.activeParam.formgroupName ===
                                "Undefined"
                            }
                            onClick={() => {
                              this.props.openEditParamModal(
                                this.props.activeParam
                              );
                            }}
                            value="EDIT..."
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <input
                            type="button"
                            className="btn btn-default full-width"
                            disabled={this.props.activeParam === ""}
                            onClick={() => {
                              this.props.openConfirmationModal(
                                `Are you sure you want to delete parameter ${this
                                  .props.activeParam.tag}`,
                                () =>
                                  this.props.deleteParam(
                                    this.props.initialActiveConfig,
                                    this.props.activeConfig,
                                    this.props.activeParam
                                  )
                              );
                            }}
                            value="REMOVE"
                          />
                        </div>
                      </div>
                      <br />
                      <div className="form-group">
                        <div className="col-md-12">
                          <input
                            type="button"
                            className="btn btn-default full-width"
                            value="CREATE NEW..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <input
                type="button"
                value="CANCEL"
                className="btn btn-default  full-width"
                onClick={() => {
                  this.props.changeConfigsView("config-list");
                }}
              />
            </div>
            <div className="col-md-2">
              <input
                type="button"
                value="SAVE"
                className="btn btn-primary  full-width"
                onClick={() => {
                  this.props.updateConfig(this.props.activeConfig.data, () =>
                    this.props.fetchConfigs(
                      this.props.activeConfig.data.receiverCodeNbr
                    )
                  );
                }}
              />
            </div>
          </div>
        </form>
        <EditParamModal />
        <AddParamModal />
        <ConfirmationModal />
      </div>
    );
  }
}

function mapStateToProps({
  initialActiveConfig,
  activeConfig,
  activeParam,
  activeParamView,
  activeParamDetail,
  activeConfigReceiverId,
  activeConfigUsage,
  activeConfigPurpose,
  activeConfigFldSep
}) {
  // whatever is returned will show up as a props
  return {
    initialActiveConfig,
    activeConfig,
    activeParam,
    activeParamView,
    activeParamDetail,
    activeConfigReceiverId,
    activeConfigUsage,
    activeConfigPurpose,
    activeConfigFldSep
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeConfigsView,
      selectParam,
      getParamDetail,
      openEditParamModal,
      openAddParamModal,
      fetchParams,
      changeActiveConfigReceiverId,
      changeActiveConfigUsage,
      changeActiveConfigPurpose,
      changeActiveConfigFldSep,
      updateConfig,
      openConfirmationModal,
      deleteParam
    },
    dispatch
  );
}

//promote component to a container
export default connect(mapStateToProps, mapDispatchToProps)(ConfigForm);
