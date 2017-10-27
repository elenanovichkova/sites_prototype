import React, { Component } from "react";

export default class SiteItem extends Component {
  constructor() {
    super();
  }

  selectSite() {
    this.props.selectSite(this.props.codenbr);
  }

  render() {
    return (
      <div>
        <h2>
          {this.props.codenbr}, {this.props.name}
        </h2>
        <button type="button" onClick={this.selectSite.bind(this)}>
          Select
        </button>
        <hr />
      </div>
    );
  }
}
