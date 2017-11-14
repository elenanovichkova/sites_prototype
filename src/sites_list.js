import React, { Component } from "react";

import SiteListItem from "./site_list_item";

export default class SitesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sites: this.props.sites
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ sites: nextProps.sites });
  }

  getSites() {
    return this.state.sites.map(site => {
      return (
        <SiteListItem
          name={site.name}
          codenbr={site.codenbr}
          taxid={site.taxid}
          receiveroid={site.receiveroid}
          onSelect={this.props.onSiteSelect}
          siteId={site.siteId}
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
        <div>{!this.state.loading ? sites : <div>Loading...</div>}</div>
      </div>
    );
  }
}
