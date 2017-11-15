import React, { Component } from "react";
import $ from "jquery";

import ConfigForm from "./config_form";
import ConfigList from "./config_list";

export default class EdiConfigsRootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfigForm: false,
      config: {},
      configList: [],
      configFormState: "new"
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
        this.setState({ configList: data.data, showConfigForm: false });
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  }

  updateConfigState = (config, state) => {
    let status = state ? "ACTV" : "IGNR";
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/configsUpdated${this.props.siteId}.json`,
      //url: `${sid}/ajax.do?req.objectID=${reqObjID}&flow=f_sitesJ&param.rtype=updConfigState&param.config=${config.oid}&param.receiverID=${config.receiverID}&param.configstatus=${status}`,
      success: response => {
        if (response.status.result) {
          this.fetchSiteConfigurations();
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
          callback(response.config);
        }
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  };

  hideConfigForm = () => {
    this.setState({ showConfigForm: false, config: {} });
  };

  createNewConfig = () => {
    this.setState({
      showConfigForm: true,
      configFormState: "new",
      config: {}
    });
  };

  handleUpdateConfigList = () => {
    this.fetchSiteConfigurations(this.props.siteCodeNbr);
  };

  showEditForm = config => {
    this.setState({
      showConfigForm: true,
      configFormState: "edit",
      config: config
    });
  };

  handleEditConfig = config => {
    this.fetchConfigDetail(config, this.showEditForm);
  };

  handleDuplicateConfig = config => {
    //to do ajax to get config params and then show config form with prepopulated data
    this.setState({
      showConfigForm: true,
      configFormState: "dupl",
      config: config
    });
  };

  handleDeleteConfig = config => {
    //to do ajax to remove config and then reload the list

    //here is optimistic delete
    const configs = [...this.state.configList]; //clone array
    const configIndex = configs.indexOf(config);
    configs.splice(configIndex, 1); //removes config from array

    this.setState({ configList: configs });
  };

  handleUpdateConfigList = () => {
    this.fetchSiteConfigurations(this.props.siteCodeNbr);
  };

  handleChangeConfigState = (config, state) => {
    this.updateConfigState(config, state);
  };

  render() {
    return (
      <div>
        {this.state.showConfigForm ? (
          <div>
            <button type="button" onClick={this.hideConfigForm}>
              Go back to all configurations
            </button>
            <ConfigForm
              configFormState={this.state.configFormState}
              edicntl={this.state.config}
              onSave={this.handleUpdateConfigList}
            />
          </div>
        ) : (
          <div>
            <button type="button" onClick={this.createNewConfig}>
              Add Configuration
            </button>
            <ConfigList
              configList={this.state.configList}
              updateList={this.handleUpdateConfigList}
              editConfig={this.handleEditConfig}
              duplicateConfig={this.handleDuplicateConfig}
              deleteConfig={this.handleDeleteConfig}
              changeConfigState={this.handleChangeConfigState}
            />
          </div>
        )}
      </div>
    );
  }
}
