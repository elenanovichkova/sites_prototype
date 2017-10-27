import React, { Component } from "react";

import SiteDetail from "./site_detail";
import SitesList from "./sites_list";

export default class SitesRootComponent extends Component {
  constructor() {
    super();
    this.state = {
      isSiteSelected: false,
      selectedSiteCodenbr: "",
      sites: []
    };
  }

  render() {
    return (
      <div>
        <h1>Hello Sites Root component</h1>
        {this.state.isSiteSelected
          ? <SiteDetail
              siteCodeNbr={this.state.selectedSiteCodenbr}
              goBack={() => {
                this.setState({ isSiteSelected: false });
              }}
            />
          : <SitesList
              selectSite={siteCodeNbr => {
                this.setState({
                  isSiteSelected: true,
                  selectedSiteCodenbr: siteCodeNbr
                });
              }}
            />}
      </div>
    );
  }
}
