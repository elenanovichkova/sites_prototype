import React, { Component } from "react";
import SiteListItem from "./site_list_item";

import sites from "./api/sites.json";

export default class SitesList extends Component {
  componentWillMount() {
    console.log("Update site list...");
    this.fetchSites();
  }

  constructor() {
    super();
    this.state = {
      sites: []
    };
  }

  fetchSites(site) {
    this.setState({ sites: sites.sites });
    console.log();
    /*
    replace with this when put on server
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/site${site.codenbr}.json`,
      success: data => {
        this.setState({ sites: data.sites });
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });*/
  }

  getSites() {
    return this.state.sites.map(site => {
      return (
        <SiteListItem
          name={site.name}
          codenbr={site.codenbr}
          selectSite={this.props.selectSite}
          key={site.id}
        />
      );
    });
  }

  render() {
    let sites = this.getSites();
    return (
      <div>
        <h3>Site List</h3>
        <div>
          {sites}
        </div>
      </div>
    );
  }
}
