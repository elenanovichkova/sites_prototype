import React, { Component } from "react";
import $ from "jquery";

import ConfigForm from "./config_form";
import ConfigList from "./config_list";

export default class EdiConfigsRootComponent extends Component {
  componentWillMount() {
    console.log("Edi configurations for...", this.props.siteCodeNbr);
    this.fetchSiteConfigurations(this.props.siteCodeNbr);
  }

  constructor(props) {
    super(props);
    this.state = {
      showConfigForm: false,
      config: {},
      configList: []
    };
  }

  fetchSiteConfigurations(siteCodeNbr) {
    console.log("fetching configs for", siteCodeNbr);
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/configs${siteCodeNbr}.json`,
      success: data => {
        this.setState({ configList: data.data, showConfigForm: false });
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  }

  hideConfigForm() {
    console.log("show config form...");
    this.setState({ showConfigForm: false, config: {} });
  }

  createNewConfig() {
    console.log("show config form...");
    this.setState({ showConfigForm: true, config: {} });
  }

  handleUpdateConfigList() {
    this.fetchSiteConfigurations(this.props.siteCodeNbr);
  }

  handleEditConfig(config) {
    console.log("handle edit config", config);
    //to do ajax to get config params and then show config form with prepopulated data
    this.setState({ showConfigForm: true, config: config });
  }

  handleDuplicateConfig(config) {
    console.log("handle duplicate config", config);
    //to do ajax to get config params and then show config form with prepopulated data
    this.setState({ showConfigForm: true, config: config });
  }

  handleDeleteConfig(config) {
    console.log("handle delete config", config);
    //to do ajax to remove config and then reload the list

    //here is optimistic delete
    const configs = [...this.state.configList]; //clone array
    const configIndex = configs.indexOf(config);
    configs.splice(configIndex, 1); //removes config from array

    this.setState({ configList: configs });
  }

  updateConfigList() {
    this.fetchSiteConfigurations(this.props.siteCodeNbr);
  }

  render() {
    return (
      <div>
        {this.state.showConfigForm
          ? <div>
              <button type="button" onClick={this.hideConfigForm.bind(this)}>
                Go back to all configurations
              </button>
              <ConfigForm
                edicntl={this.state.config}
                onSave={this.updateConfigList.bind(this)}
              />
            </div>
          : <div>
              <button type="button" onClick={this.createNewConfig.bind(this)}>
                Add Configuration
              </button>
              <ConfigList
                configList={this.state.configList}
                updateList={this.updateConfigList.bind(this)}
                editConfig={this.handleEditConfig.bind(this)}
                duplicateConfig={this.handleDuplicateConfig.bind(this)}
                deleteConfig={this.handleDeleteConfig.bind(this)}
              />
            </div>}
      </div>
    );
  }
}
