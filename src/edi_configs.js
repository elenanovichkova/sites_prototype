import React, { Component } from "react";

import ConfigListItem from "./config_list_item";

import configList from "./api/config_list.json";

export default class EdiConfigs extends Component {
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
    this.setState({ configList: configList.data });
    //to do ajax
  }

  getConfigList() {
    return this.state.configList.map(config => {
      return <ConfigListItem config={config} key={config.id} />;
    });
  }

  addNewConfiguration() {
    console.log("about to add new configuration...");
  }

  render() {
    let configs = this.getConfigList();
    return (
      <div>
        <button type="button" onClick={this.addNewConfiguration}>
          Add Configuration
        </button>
        <div>
          <div className="row">
            <div className="col-md-3">
              <p>Name</p>
            </div>
            <div className="col-md-3">
              <p>ID</p>
            </div>
            <div className="col-md-2">
              <p>purpose</p>
            </div>
            <div className="col-md-2">
              <p>Usage</p>
            </div>
            <div className="col-md-2">Actions</div>
          </div>
          <hr />
          {configs}
        </div>
      </div>
    );
  }
}
