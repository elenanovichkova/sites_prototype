import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeSitesView, getSiteTemplates } from "../actions/index";
import _ from "lodash";

import SiteFilter from "./site-filter";
import SiteDetail from "./site-detail";
import SiteList from "./site-list";
import Spinner from "./spinner";
import NewSiteTemplatePicker from "./newsite-template-picker.jsx";

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
                            onClick={() => {
                              this.props.getSiteTemplates();
                              this.props.changeSitesView("site-new");
                            }}
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
                <p>
                  <a
                    href="#"
                    onClick={() => this.props.changeSitesView("site-list")}
                  >
                    <span className="fa fa-chevron-circle-left" /> BACK TO SITES
                  </a>
                </p>
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
  return bindActionCreators({ changeSitesView, getSiteTemplates }, dispatch);
}

//promote SitesRootComponent from a component to a container
export default connect(mapStateToProps, mapDispatchToProps)(SitesContainer);
