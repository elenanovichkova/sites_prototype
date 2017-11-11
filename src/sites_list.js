import React, { Component } from "react";
import $ from "jquery";

import SiteListItem from "./site_list_item";
import SitesFilter from "./sites_filter";

export default class SitesList extends Component {
  componentWillMount() {
    this.fetchSites();
  }

  constructor() {
    super();
    this.state = {
      loading: true,
      sites: []
    };
  }

  fetchSites = ({ ...filter } = {}) => {
    console.log(filter);
    let { sitename = "", siteid = "", taxid = "", submitterid = "" } = filter;
    this.setState({ loading: true });
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/sites.json`,
      //url: `${sid}/ajax.do?req.objectID=${reqObjID}&flow=f_sitesJ&param.rtype=searchSites&param.id=${siteid}&param.name=${sitename}&param.taxid=${taxid}&param.submitterid=${submitterid}`,
      success: response => {
        this.setState({ sites: response.data, loading: false });
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  };

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
        <SitesFilter onSearch={this.fetchSites} />
        <div>{!this.state.loading ? sites : <div>Loading...</div>}</div>
      </div>
    );
  }
}
