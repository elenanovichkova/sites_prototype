import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchConfigs, changeConfigsView } from "../actions/index";
import { bindActionCreators } from "redux";

class ConfigDetail extends Component {
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

  render() {
    console.log("this.props.activeConfig", this.props.activeConfig);
    if (this.props.activeConfig.isFetching) {
      return <div>...loading</div>;
    }
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
                          {this.props.activeConfig.data.ID}
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
                        Receiver ID:{" "}
                        <strong>
                          {this.props.activeConfig.data.receiverID}
                        </strong>
                      </li>
                      <li className="list-group-item">
                        Usage:{" "}
                        <strong>{this.props.activeConfig.data.usage}</strong>
                      </li>
                      <li className="list-group-item">
                        Purpose:{" "}
                        <strong>{this.props.activeConfig.data.purpose}</strong>
                      </li>
                      <li className="list-group-item">
                        X12 transactions delimiter :{" "}
                        <strong>{this.props.activeConfig.data.fldSep}</strong>
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
                                {this.props.activeConfig.data.authQual}
                              </td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.data.authInfo}
                              </td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.data.secQual}
                              </td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.data.secInfo}
                              </td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.data.senderQual}
                              </td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.data.senderID}
                              </td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.data.receiverQual}
                              </td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.data.receiverID}
                              </td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>YYMMDD</td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>HHMM</td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.data.reptSep}
                              </td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.data.version}
                              </td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>ICN(up to 9 digits)</td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.data.needTA1}
                              </td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.data.usage}
                              </td>
                              <td>
                                {this.props.activeConfig.data.fldSep}
                              </td>
                              <td>
                                {this.props.activeConfig.data.compSep}
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
                        <table className="table edicntl-param-table">
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
                            {this.props.activeConfig.data.paramsX12.map(
                              param => {
                                return (
                                  <tr key={param.id}>
                                    <td> </td>
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
                              }
                            )}
                            {this.render837paramsTitle()}
                            {this.props.activeConfig.data.params837.map(
                              param => {
                                return (
                                  <tr key={param.id}>
                                    <td> </td>
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
                              }
                            )}
                            {this.renderAttparamsTitle()}
                            {this.props.activeConfig.data.paramsatt.map(
                              param => {
                                return (
                                  <tr key={param.id}>
                                    <td> </td>
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
                              }
                            )}
                            {this.render999paramsTitle()}
                            {this.props.activeConfig.data.params999.map(
                              param => {
                                return (
                                  <tr key={param.id}>
                                    <td> </td>
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
                              }
                            )}
                            {this.render277paramsTitle()}
                            {this.props.activeConfig.data.params277.map(
                              param => {
                                return (
                                  <tr key={param.id}>
                                    <td> </td>
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
                              }
                            )}
                            {this.render835paramsTitle()}
                            {this.props.activeConfig.data.params835.map(
                              param => {
                                return (
                                  <tr key={param.id}>
                                    <td> </td>
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
                              }
                            )}
                            {this.render275paramsTitle()}
                            {this.props.activeConfig.data.params275.map(
                              param => {
                                return (
                                  <tr key={param.id}>
                                    <td> </td>
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
                              }
                            )}
                            {this.render997paramsTitle()}
                            {this.props.activeConfig.data.params997.map(
                              param => {
                                return (
                                  <tr key={param.id}>
                                    <td> </td>
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
                              }
                            )}
                            {this.render824paramsTitle()}
                            {this.props.activeConfig.data.params824.map(
                              param => {
                                return (
                                  <tr key={param.id}>
                                    <td> </td>
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
                              }
                            )}
                            {this.renderUndefinedparamsTitle()}
                            {this.props.activeConfig.data.paramsUndefined.map(
                              param => {
                                return (
                                  <tr key={param.id}>
                                    <td> </td>
                                    <td />
                                    <td />
                                    <td>
                                      {param.tag}
                                    </td>
                                    <td>
                                      {param.value}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
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
