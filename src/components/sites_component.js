import React, { Component } from "react";
import SiteList from "../containers/site-list";
import SiteDetail from "../containers/site-detail";
import SiteFilter from "../containers/site-filter";

export default class SitesRootComponent extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <SiteFilter />
        </div>
        <div className="col-sm-4">
          <SiteList />
        </div>
        <div className="col-sm-8">
          <SiteDetail />
        </div>
      </div>
    );
  }
}
