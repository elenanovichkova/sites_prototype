import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchSites,
  filterSiteNameChanged,
  filterSiteIdChanged,
  filterSiteTaxIdChanged,
  filterSiteReceiverIdChanged
} from "../actions/index";

class SiteFilter extends Component {
  onChange(event) {
    console.log(event.target.value, event.target.name);
    let value = event.target.value;
    let name = event.target.name;
    switch (name) {
      case "siteName":
        this.props.filterSiteNameChanged(value);
        break;
      case "siteId":
        this.props.filterSiteIdChanged(value);
        break;
      case "siteTaxId":
        this.props.filterSiteTaxIdChanged(value);
        break;
      case "siteReceiverId":
        this.props.filterSiteReceiverIdChanged(value);
        break;
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (!this.props.siteList.isFetching) {
      this.props.fetchSites(
        this.props.sitesFilter.siteName,
        this.props.sitesFilter.siteId,
        this.props.sitesFilter.taxId,
        this.props.sitesFilter.receiverId
      );
    }
  }

  render() {
    return (
      <div className="well">
        <form
          className="form-horizontal"
          onSubmit={event => this.onFormSubmit(event)}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="control-label col-sm-5">Name</label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="siteName"
                        className="form-control wildcard"
                        title="Use leading and/or trailing % for wildcard search, case sensitive"
                        value={this.props.sitesFilter.siteName}
                        onChange={event => this.onChange(event)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="control-label col-sm-5">ID</label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="siteId"
                        className="form-control wildcard"
                        title="Use leading and/or trailing % for wildcard search, case sensitive"
                        value={this.props.sitesFilter.siteId}
                        onChange={event => this.onChange(event)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="control-label col-sm-5">Tax ID</label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="siteTaxId"
                        className="form-control"
                        value={this.props.sitesFilter.taxId}
                        onChange={event => this.onChange(event)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="control-label col-sm-5">
                      Receiver ID
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="siteReceiverId"
                        className="form-control"
                        value={this.props.sitesFilter.receiverId}
                        onChange={event => this.onChange(event)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group text-right">
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ siteList, sitesFilter }) {
  // whatever is returned will show up as a props
  return { siteList, sitesFilter };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchSites,
      filterSiteNameChanged,
      filterSiteIdChanged,
      filterSiteTaxIdChanged,
      filterSiteReceiverIdChanged
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteFilter);
