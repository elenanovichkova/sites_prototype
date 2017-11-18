import React, { Component } from "react";
import $ from "jquery";

import ConfigListItem from "./config_list_item";

export default class ConfigList extends Component {
  getConfigs() {
    return this.props.configList.map(config => {
      return (
        <ConfigListItem
          config={config}
          onEditClick={this.props.onEditClick}
          onDuplicateClick={this.props.onDuplicateClick}
          onDeleteClick={this.props.onDeleteClick}
          onStateChange={this.props.onStateChange}
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
