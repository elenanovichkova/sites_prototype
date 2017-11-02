import React, { Component } from "react";

export default class ConfigListItem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleEdit() {
    this.props.onEdit(this.props.config);
  }

  handleDuplicate() {
    this.props.onDuplicate(this.props.config);
  }

  handleDelete() {
    this.props.onDelete(this.props.config);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <p>
              {this.props.config.name}
            </p>
          </div>
          <div className="col-md-2">
            <p>
              {this.props.config.id}
            </p>
          </div>
          <div className="col-md-2">
            <p>
              {this.props.config.purpose}
            </p>
          </div>
          <div className="col-md-2">
            <p>Template Used</p>
          </div>
          <div className="col-md-2">
            <p>
              {this.props.config.usage}
            </p>
          </div>
          <div className="col-md-2">
            <span
              className="fa fa-pencil"
              onClick={this.handleEdit.bind(this)}
            />
            <span
              className="fa fa-files-o"
              onClick={this.handleDuplicate.bind(this)}
            />
            <span
              className="fa fa-trash"
              onClick={this.handleDelete.bind(this)}
            />
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
