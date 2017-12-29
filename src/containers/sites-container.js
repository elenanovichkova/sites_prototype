import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SiteFilter from "./site-filter";
import SiteDetail from "./site-detail";
import SiteList from "./site-list";
import Spinner from "./spinner";

class SitesContainer extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-md-12">
              <div className="title page-header">
                <h3>SITES</h3>
              </div>
            </div>
          </div>
          {this.props.siteView == "site-list"
            ? <div>
                <div className="row">
                  <div className="col-md-12">
                    <SiteFilter />
                  </div>
                </div>
                <Spinner />
                <div className="row">
                  <div className="col-md-12">
                    <div id="site-list-section">
                      <SiteList />
                    </div>
                  </div>
                </div>
              </div>
            : <div className="row">
                <div className="col-md-12">
                  <div className="site-detail">
                    <SiteDetail />
                  </div>
                </div>
              </div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ siteView }) {
  // whatever is returned will show up as a props inside of SitesRootComponent
  return { siteView };
}

//promote SitesRootComponent from a component to a container
export default connect(mapStateToProps)(SitesContainer);
