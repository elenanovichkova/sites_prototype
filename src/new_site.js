import React, { Component } from "react";

import SiteProfile from "./site_profile";

export default class NewSite extends Component {
  handleOnSave = siteId => {
    this.props.onSave(siteId);
  };

  render() {
    return (
      <div>
        new Site
        <SiteProfile
          siteId={this.props.siteId}
          isNew={this.props.isNew}
          onSave={this.handleOnSave}
        />
      </div>
    );
  }
}
