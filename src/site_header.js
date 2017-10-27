import React, { Component } from "react";

export default class SiteHeader extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h3>
          Name: {this.props.site.name}
        </h3>
        <p>
          Codenbr: {this.props.site.codenbr}
        </p>
        <p>
          Address: {this.props.site.address}
        </p>
        <p>
          Phone: {this.props.site.phone}
        </p>
      </div>
    );
  }
}
