import React, { Component } from "react";
import $ from "jquery";

import SiteDetail from "./site_detail";
import SitesList from "./sites_list";
import NewSite from "./new_site";
import SitesFilter from "./sites_filter";

export default class SitesRootComponent extends Component {
  constructor() {
    super();
    this.state = {
      view: "sites",
      loading: false,
      filter: {
        siteName: "",
        siteId: "",
        taxId: "",
        submitterId: ""
      },
      newSiteId: "",
      selectedSiteId: "",
      sites: []
    };
  }

  onSiteSelect = siteId => {
    this.setState({
      view: "siteDetail",
      selectedSiteId: siteId
    });
  };

  onNewSiteSave = siteId => {
    this.setState({
      view: "siteDetail",
      selectedSiteId: siteId
    });
  };

  setView = view => {
    this.setState({ view: view });
  };

  onGoBackClick = () => {
    this.fetchSites(this.state.filter);
  };

  updateFilter = (name, value) => {
    const filter = Object.assign({}, this.state.filter, { [name]: value });
    this.setState({ filter: filter });
  };

  onSearch = () => {
    this.fetchSites(this.state.filter);
  };

  fetchSites = () => {
    let {
      siteName = "",
      siteId = "",
      taxId = "",
      submitterId = ""
    } = this.state.filter;
    this.setState({ view: "loading" });
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/sites.json`,
      //url: `${sid}/ajax.do?req.objectID=${reqObjID}&flow=f_sitesJ&param.rtype=searchSites&param.id=${siteId}&param.name=${siteName}&param.taxid=${taxId}&param.submitterid=${submitterId}`,
      success: response => {
        this.setState({ sites: response.data, loading: false, view: "sites" });
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  };

  getView = view => {
    let content;
    switch (view) {
      case "loading":
        content = (
          <div>
            <SitesFilter
              filter={this.state.filter}
              onSearch={this.onSearch}
              updateFilter={this.updateFilter}
            />
            <div>Loading...</div>
          </div>
        );
        break;
      case "sites":
        content = (
          <div>
            <SitesFilter
              filter={this.state.filter}
              onSearch={this.onSearch}
              updateFilter={this.updateFilter}
            />
            <SitesList
              sites={this.state.sites}
              onSiteSelect={this.onSiteSelect}
            />
          </div>
        );
        break;
      case "siteDetail":
        content = (
          <SiteDetail
            siteId={this.state.selectedSiteId}
            onGoBackClick={this.onGoBackClick}
          />
        );
        break;
      case "newSite":
        content = <NewSite onSave={this.onNewSiteSave} />;
        break;
      default:
        content = <div>Unknown View</div>;
        break;
    }
    return content;
  };

  render() {
    let view = this.getView(this.state.view);
    return <div>{view}</div>;
  }
}
