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
    this.fetchSiteConfigurations(this.props.siteCodeNbr);
  }

  fetchSiteConfigurations(siteCodeNbr) {
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

  handleEditConfig = config => {
    //to do ajax to get config params and then show config form with prepopulated data
    this.setState({
      showConfigForm: true,
      configFormState: "edit",
      config: config
    });
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
    this.fetchSiteConfigurations(this.props.siteCodeNbr + "R");
  };

  render() {
    return (
      <div>
        {this.state.showConfigForm
          ? <div>
              <button type="button" onClick={this.hideConfigForm}>
                Go back to all configurations
              </button>
              <ConfigForm
                configFormState={this.state.configFormState}
                edicntl={this.state.config}
                onSave={this.handleUpdateConfigList}
              />
            </div>
          : <div>
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
            </div>}
      </div>
    );
  }
}
