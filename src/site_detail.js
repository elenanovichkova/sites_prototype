import React, { Component } from "react";

export default class SiteDetail extends Component {
  componentWillMount() {
    console.log("Site Detail..." + this.props.siteCodeNbr);
  }

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <button onClick={this.props.goBack}>Go Back</button>
        <h3>Site Detail</h3>
      </div>
    );
  }
}
