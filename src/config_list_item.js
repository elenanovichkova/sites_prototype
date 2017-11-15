import React, { Component } from "react";
import Switch from "./switch";

export default class ConfigListItem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleEdit = (event) => {
	event.preventDefault();
	console.log('edit');
    this.props.onEdit(this.props.config);
  };

  handleDuplicate = () => {
    this.props.onDuplicate(this.props.config);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.config);
  };

  handleStateChange = state => {
    this.props.onStateChange(this.props.config, state);
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <p>
              {this.props.config.receiverID}
            </p>
          </div>
          <div className="col-md-2">
	          <p>
	            {this.props.config.ID}
	          </p>
          </div>          
          <div className="col-md-2">
            <Switch
              isChecked={this.props.config.isActive}
              onChange={this.handleStateChange}
            />
          </div>
          <div className="col-md-2">
            <p>
              {this.props.config.purpose}
            </p>
          </div>
          <div className="col-md-2">
            <p>
              {this.props.config.usage}
            </p>
          </div>
          <div className="col-md-2">
            <span className="fa fa-pencil" onClick={this.handleEdit} />
            <span className="fa fa-files-o" onClick={this.handleDuplicate} />
            <span className="fa fa-trash" onClick={this.handleDelete} />
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
