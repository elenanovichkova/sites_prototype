import React, { Component } from "react";

import ConfigForm from "./config_form";
import ConfigList from "./config_list";

import configList from "./api/config_list.json";

export default class EdiConfigsRootComponent extends Component {
  componentWillMount() {
    console.log("Edi configurations for..." + this.props.site.codenbr);
    this.fetchSiteConfigurations(this.props.site.codenbr);
  }

  constructor() {
    super();
    this.state = {
      showConfigForm: false,
      config: {},
      configList: []
    };
  }

  fetchSiteConfigurations(siteCodeNbr) {
    this.setState({ configList: configList.data, showConfigForm: false });
    //to do ajax
  }

  hideConfigForm() {
    console.log("show config form...");
    this.setState({ showConfigForm: false });
  }

  showConfigForm() {
    console.log("show config form...");
    this.setState({ showConfigForm: true });
  }

  handleUpdateConfigList() {
    //to do ajax and then update state with new configList
    this.setState({ configList: configList.data });
  }

  handleEditConfig(config) {
    console.log("handle edit config", config);
    //to do ajax to get config params and then show config form with prepopulated data
    this.setState({ showConfigForm: true });
  }

  handleDuplicateConfig(config) {
    console.log("handle duplicate config", config);
    //to do ajax to get config params and then show config form with prepopulated data
    this.setState({ showConfigForm: true });
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

  render() {
    return (
      <div>
        {this.state.showConfigForm
          ? <div>
              <button type="button" onClick={this.hideConfigForm.bind(this)}>
                Go back to all configurations
              </button>
              <ConfigForm />
            </div>
          : <div>
              <button type="button" onClick={this.showConfigForm.bind(this)}>
                Add Configuration
              </button>
              <ConfigList
                configList={this.state.configList}
                updateList={this.handleUpdateConfigList}
                editConfig={this.handleEditConfig.bind(this)}
                duplicateConfig={this.handleDuplicateConfig.bind(this)}
                deleteConfig={this.handleDeleteConfig.bind(this)}
              />
            </div>}
      </div>
    );
  }
}
