import React, { Component } from "react";

export default class SiteListItem extends Component {
  constructor() {
    super();
  }

  selectSite = () => {
    this.props.onSelect(this.props.siteId);
  };

  render() {
    return (
      <div>
        <h2>{this.props.codenbr}</h2>
        <p>Name: {this.props.name}</p>
        <p>Tax ID: {this.props.taxid}</p>
        <button type="button" onClick={this.selectSite}>
          Select
        </button>
        <hr />
      </div>
    );
  }
}
