import React, { Component } from "react";
import $ from "jquery";

import ConfigListItem from "./config_list_item";

export default class ConfigList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  getConfigs() {
    return this.props.configList.map(config => {
      return (
        <ConfigListItem
          config={config}
          onEdit={this.props.editConfig}
          onDuplicate={this.props.duplicateConfig}
          onDelete={this.props.deleteConfig}
          onStateChange={this.props.changeConfigState}
          key={config.oid}
        />
      );
    });
  }

  render() {
    let configs = this.getConfigs();
    return (
      <div>
        Config List
        <div>
          <div className="row">
            <div className="col-md-2">
              <p>Submitter ID</p>
            </div>
            <div className="col-md-2">
	            <p>ID</p>
            </div>            
            <div className="col-md-2">
              <p>Status</p>
            </div>
            <div className="col-md-2">
              <p>Status</p>
            </div>
            <div className="col-md-2">
              <p>Usage</p>
            </div>
            <div className="col-md-2">Actions</div>
          </div>
        </div>
        {configs}
      </div>
    );
  }
}
