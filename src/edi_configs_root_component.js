import React, { Component } from "react";
import $ from "jquery";

import ConfigForm from "./config_form";
import ConfigList from "./config_list";

export default class EdiConfigsRootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
      configList: [],
      view: "list", // list, form
      action: "" // saveNew,
    };
  }

  componentWillMount() {
    this.fetchSiteConfigurations();
  }

  fetchSiteConfigurations() {
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/configs${this.props.siteId}.json`,
      //url: `${sid}/ajax.do?req.objectID=${reqObjID}&flow=f_sitesJ&param.rtype=getSiteConfigs&param.id=${this
      //   .props.siteId}`,
      success: data => {
        this.setState({ configList: data.data });
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  }

  updateConfigState = (config, state, callback) => {
    let status = state ? "ACTV" : "IGNR";
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/configsUpdated${this.props.siteId}.json`,
      //url: `${sid}/ajax.do?req.objectID=${reqObjID}&flow=f_sitesJ&param.rtype=updConfigState&param.config=${config.oid}&param.receiverID=${config.receiverID}&param.configstatus=${status}`,
      success: response => {
        if (response.status.result) {
          callback();
        }
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  };

  fetchConfigDetail = (config, callback) => {
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/edicntlJSIADELANTOEBIL.json`,
      //url: `${sid}/ajax.do?req.objectID=${reqObjID}&flow=f_sitesJ&param.rtype=getConfig&param.config=${config.oid}`,
      success: response => {
        if (response.status.result) {
          this.setState({ config: response.config });
          callback();
        }
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  };

  hideConfigForm = event => {
    event.preventDefault();
    this.setState({
      view: "list",
      config: {}
    });
  };

  createNewConfig = () => {
    this.setState({
      view: "form",
      config: {}
    });
  };

  showConfigForm = event => {
    this.setState({
      view: "form"
    });
  };

  handleOnEditClick = config => {
    this.fetchConfigDetail(config, this.showConfigForm);
  };

  handleOnDuplicateClick = config => {
    //to do ajax to get config params and then show config form with prepopulated data
    this.setState({
      view: "list"
    });
  };

  handleOnDeleteClick = config => {
    //to do ajax to remove config and then reload the list

    //here is optimistic delete
    const configs = [...this.state.configList]; //clone array
    const configIndex = configs.indexOf(config);
    configs.splice(configIndex, 1); //removes config from array

    this.setState({ configList: configs });
  };

  handleOnStateChange = (config, state) => {
    this.updateConfigState(config, state, this.fetchSiteConfigurations);
  };

  render() {
    return (
      <div>
        {this.state.view == "form" ? (
          <div>
            <div className="row">
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.hideConfigForm}
                >
                  Go back
                </button>
              </div>
            </div>
            <ConfigForm
              config={this.state.config}
              onSave={this.onSave}
              siteId={this.props.siteId}
            />
          </div>
        ) : (
          <div>
            <button type="button" onClick={this.showConfigForm}>
              Add Configuration
            </button>
            <ConfigList
              configList={this.state.configList}
              onEditClick={this.handleOnEditClick}
              onDuplicateClick={this.handleOnDuplicateClick}
              onDeleteClick={this.handleOnDeleteClick}
              onStateChange={this.handleOnStateChange}
            />
          </div>
        )}
      </div>
    );
  }
}
