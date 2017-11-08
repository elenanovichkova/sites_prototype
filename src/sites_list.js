import React, { Component } from "react";
import $ from "jquery";

import SiteListItem from "./site_list_item";

export default class SitesList extends Component {
  componentWillMount() {
    this.fetchSites();
  }

  constructor() {
    super();
    this.state = {
      sites: []
    };
  }

  fetchSites(site) {
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/sites.json`,
      //url: `${sid}/ajax.do?req.objectID=${reqObjID}&flow=f_sitesJ&param.rtype=searchSites`,
      success: response => {
        this.setState({ sites: response.data });
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  }

  getSites() {
    return this.state.sites.map(site => {
      return (
        <SiteListItem
          name={site.name}
          codenbr={site.codenbr}
          taxid={site.taxid}
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
