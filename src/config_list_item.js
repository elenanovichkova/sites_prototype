import React, { Component } from "react";
import Switch from "./switch";

export default class ConfigListItem extends Component {
  onEditClick = event => {
    event.preventDefault();
    console.log("edit");
    this.props.onEditClick(this.props.config);
  };

  onDuplicateClick = () => {
    this.props.onDuplicateClick(this.props.config);
  };

  onDeleteClick = () => {
    this.props.onDeleteClick(this.props.config);
  };

  onStateChange = state => {
    this.props.onStateChange(this.props.config, state);
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <p>{this.props.config.receiverID}</p>
          </div>
          <div className="col-md-2">
            <p>{this.props.config.ID}</p>
          </div>
          <div className="col-md-2">
            <Switch
              isChecked={this.props.config.isActive}
              onChange={this.onStateChange}
            />
          </div>
          <div className="col-md-2">
            <p>{this.props.config.purpose}</p>
          </div>
          <div className="col-md-2">
            <p>{this.props.config.usage}</p>
          </div>
          <div className="col-md-2">
            <span className="fa fa-pencil" onClick={this.onEditClick} />
            <span className="fa fa-files-o" onClick={this.onDuplicateClick} />
            <span className="fa fa-trash" onClick={this.onDeleteClick} />
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
