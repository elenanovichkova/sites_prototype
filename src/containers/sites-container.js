import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeSitesView } from "../actions/index";
import _ from "lodash";

import SiteFilter from "./site-filter";
import SiteDetail from "./site-detail";
import SiteList from "./site-list";
import Spinner from "./spinner";
import NewSiteTemplatePicker from "./newsite-template-picker";

class SitesContainer extends Component {
  render() {
    let privs = ["ssRead", "ssNew", "ssEdit"];
    return (
      <div className="row">
        <div className="col-sm-12">
          <div>
            <div className="title page-header">
              <div>
                <div className="row">
                  <div className="col-md-2">
                    <h3>SITES</h3>
                  </div>
                  {_.includes(privs, "ssNew") &&
                  this.props.siteView == "site-list"
                    ? <div className="col-md-offset-8 col-md-2">
                        <h3>
                          <button
                            className="btn btn-primary  full-width"
                            onClick={() =>
                              this.props.changeSitesView("site-new")}
                          >
                            Create New Site
                          </button>
                        </h3>
                      </div>
                    : ""}
                </div>
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
            : ""}
          {this.props.siteView == "site-detail"
            ? <div className="row">
                <div className="col-md-12">
                  <div className="site-detail">
                    <SiteDetail />
                  </div>
                </div>
              </div>
            : ""}
          {this.props.siteView == "site-new"
            ? <div>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={() => this.props.changeSitesView("site-list")}
                >
                  back
                </button>
                <div>
                  <NewSiteTemplatePicker />
                </div>
              </div>
            : ""}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ siteView }) {
  // whatever is returned will show up as a props inside of SitesRootComponent
  return { siteView };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSitesView }, dispatch);
}

//promote SitesRootComponent from a component to a container
export default connect(mapStateToProps, mapDispatchToProps)(SitesContainer);
