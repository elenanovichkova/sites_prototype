import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchConfigs, changeConfigsView } from "../actions/index";
import { bindActionCreators } from "redux";

class ConfigDetail extends Component {
  render() {
    return (
      <div className="">
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
          <div>
            <div>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="title text-center">
                        <h3>
                          {this.props.activeConfig.ID}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title title">EDICntl properties</h3>
                    </div>
                    <ul className="list-group">
                      <li className="list-group-item">
                        Admin: <strong>{this.props.activeConfig.admin}</strong>
                      </li>
                      <li className="list-group-item">
                        Sender:{" "}
                        <strong>{this.props.activeConfig.sender}</strong>
                      </li>
                      <li className="list-group-item">
                        Sender ID:{" "}
                        <strong>{this.props.activeConfig.senderID}</strong>
                      </li>
                      <li className="list-group-item">
                        Sender email:{" "}
                        <strong>{this.props.activeConfig.senderEmail}</strong>
                      </li>
                      <li className="list-group-item">
                        Sender name:{" "}
                        <strong>{this.props.activeConfig.senderName}</strong>
                      </li>
                      <li className="list-group-item">
                        Receiver ID:{" "}
                        <strong>{this.props.activeConfig.receiverID}</strong>
                      </li>
                      <li className="list-group-item">
                        Binary mode:{" "}
                        <strong>{this.props.activeConfig.binaryMode}</strong>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title title">
                            ISA sample with EDICntl properties applied
                          </h3>
                        </div>
                        <table className="table table-no-padding">
                          <thead>
                            <tr>
                              <th>
                                <p title="Authorization Information Qualifier">
                                  01
                                </p>
                              </th>
                              <th />
                              <th>
                                <p title="Authorization Information">02</p>
                              </th>
                              <th />
                              <th>
                                <p title="Security Information Qualifier">03</p>
                              </th>
                              <th />
                              <th>
                                <p title="Security Information">04</p>
                              </th>
                              <th />
                              <th>
                                <p title="Interchange ID Qualifier">05</p>
                              </th>
                              <th />
                              <th>
                                <p title="Interchange Sender ID">06</p>
                              </th>
                              <th />
                              <th>
                                <p title="Interchange ID Qualifier">07</p>
                              </th>
                              <th />
                              <th>
                                <p title="Interchange Receiver ID">08</p>
                              </th>
                              <th />
                              <th>
                                <p title="Interchange Date">09</p>
                              </th>
                              <th />
                              <th>
                                <p title="Interchange Time">10</p>
                              </th>
                              <th />
                              <th>
                                <p title="Interchange Control Standards ID">
                                  11
                                </p>
                              </th>
                              <th />
                              <th>
                                <p title="Interchange Control Version Number">
                                  12
                                </p>
                              </th>
                              <th />
                              <th>
                                <p title="Interchange Control Number">13</p>
                              </th>
                              <th />
                              <th>
                                <p title="Acknowledgement Requested">14</p>
                              </th>
                              <th />
                              <th>
                                <p title="Test Indicator">15</p>
                              </th>
                              <th />
                              <th>
                                <p title="Subelement Separator">16</p>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {this.props.activeConfig.authQual}
                              </td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.authInfo}
                              </td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.secQual}
                              </td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.secInfo}
                              </td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.senderQual}
                              </td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.senderID}
                              </td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.receiverQual}
                              </td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.receiverID}
                              </td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>YYMMDD</td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>HHMM</td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.reptSep}
                              </td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.version}
                              </td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>ICN(up to 9 digits)</td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.needTA1}
                              </td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.usage}
                              </td>
                              <td>
                                {this.props.activeConfig.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.compSep}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title title">
                            EDI Control params
                          </h3>
                        </div>
                        <table className="table">
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
                                <tr key={param.id}>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ activeConfig, activeSite }) {
  return { activeConfig, activeSite };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchConfigs, changeConfigsView }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigDetail);
