import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeConfigsView, selectParam } from "../actions/index";

class ConfigForm extends Component {
  render() {
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
            {this.props.activeConfig.ID}
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
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-5" htmlFor="usage">
              Usage:
            </label>
            <div className="col-sm-7">
              <select className="form-control" id="usage" name="usage">
                <option value="">SELECT</option>
                <option value="P">Production</option>
                <option value="T">Test</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-5" htmlFor="purpose">
              Purpose
            </label>
            <div className="col-sm-7">
              <select className="form-control" id="purpose" name="purpose">
                <option value="">SELECT</option>
                <option value="EBIL">EBIL</option>
                <option value="EBRV">EBRV</option>
                <option value="PPO">PPO</option>
                <option value="EDI3">EDI3</option>
                <option value="PPO">PPO</option>
                <option value="PNOT">PNOT</option>
                <option value="DISB">DISB</option>
                <option value="SRCA">SRCA</option>
                <option value="UNKN">UNKN</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-5" htmlFor="fldsep">
              Which delimiter will be used with X12 transactions?
            </label>
            <div className="col-sm-7">
              <select className="form-control" id="fldsep" name="fldsep">
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
                      <table className="table edicntl-param-table">
                        <thead>
                          <tr>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Tag</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.activeConfig.params.map(param => {
                            return (
                              <tr
                                key={param.id}
                                className={
                                  this.props.activeParam == param
                                    ? "selected"
                                    : ""
                                }
                                onClick={() => {
                                  if (
                                    this.props.activeParam != "" &&
                                    this.props.activeParam == param
                                  ) {
                                    this.props.selectParam("");
                                  } else {
                                    this.props.selectParam(param);
                                  }
                                }}
                              >
                                <td>
                                  {param.formcontrolLabel}
                                </td>
                                <td>
                                  {param.formcontrolOptionDescr}
                                </td>
                                <td>
                                  {param.tag}
                                </td>
                                <td>
                                  {param.value}
                                </td>
                              </tr>
                            );
                          })}
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
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <input
                            type="button"
                            className="btn btn-default full-width"
                            disabled={this.props.activeParam === ""}
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
              />
            </div>
            <div className="col-md-2">
              <input
                type="button"
                value="SAVE"
                className="btn btn-primary  full-width"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ activeConfig, activeParam }) {
  // whatever is returned will show up as a props
  return { activeConfig, activeParam };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeConfigsView, selectParam }, dispatch);
}

//promote component to a container
export default connect(mapStateToProps, mapDispatchToProps)(ConfigForm);
