import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  changeSitesView,
  fetchSiteLog,
  getSiteProfile,
  getActiveSiteJobs
} from "../actions/index";
import $ from "jquery";

import ConfigList from "./config-list";
import ConfigDetail from "./config-detail";
import ConfigForm from "./config-form";
import SiteLog from "./site-log";
import SiteProfileForm from "./site-profile-form";
import SiteFtp from "./site-ftp";

class SiteDetail extends Component {
  onTabClick(event) {
    event.preventDefault();
    $(".site-detail-tab-content .tab-pane").removeClass("active");
    $(".site-detail-nav-tabs li").removeClass("active");
    var index = event.target.href.indexOf("#");
    var tabId = event.target.href.substring(index);
    $(tabId).addClass("active");
    $(event.target).parent().addClass("active");
  }

  renderConfigs() {
    let configView = this.props.configView;
    switch (configView) {
      case "config-edit":
        return <ConfigForm />;
      case "config-detail":
        return <ConfigDetail />;
      case "config-duplicate":
        return "duplicate";
      case "config-delete":
        return "delete";
      case "config-list":
        return <ConfigList />;
      default:
        return <ConfigList />;
    }
  }

  render() {
    {
      return (
        <div>
          <p>
            <a href="#" onClick={() => this.props.changeSitesView("site-list")}>
              <span className="fa fa-chevron-circle-left" /> BACK
            </a>
          </p>
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="row">
                <div className="col-md-10">
                  {this.props.activeSite.name}
                </div>
                <div className="col-md-2 text-right">
                  {this.props.activeSite.status}
                </div>
              </div>
            </div>
            <div className="panel-body">
              <p>
                <span className="fa fa-folder" />{" "}
                {this.props.activeSite.codenbr}
              </p>
              <p>
                <span className="fa fa-home" /> {this.props.activeSite.address}
              </p>
              <p>
                <span className="fa fa-phone" /> {this.props.activeSite.phone}
              </p>
              <p>
                <span>Tax ID: </span>
                <span>
                  {this.props.activeSite.taxid}
                </span>
              </p>
              <ul className="nav nav-tabs site-detail-nav-tabs">
                <li className="active">
                  <a
                    href="#site-config"
                    onClick={event => {
                      this.onTabClick(event);
                    }}
                  >
                    Configurations
                  </a>
                </li>
                <li>
                  <a
                    href="#site-profile"
                    onClick={event => {
                      this.props.getSiteProfile(this.props.activeSite);
                      this.onTabClick(event);
                    }}
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#site-ftp"
                    onClick={event => {
                      this.props.getActiveSiteJobs(this.props.activeSite);
                      this.onTabClick(event);
                    }}
                  >
                    FTP
                  </a>
                </li>
                <li>
                  <a
                    href="#site-users"
                    onClick={event => {
                      this.onTabClick(event);
                    }}
                  >
                    Users
                  </a>
                </li>
                <li>
                  <a
                    href="#site-log"
                    onClick={event => {
                      this.props.fetchSiteLog(this.props.activeSite);
                      this.onTabClick(event);
                    }}
                  >
                    Log
                  </a>
                </li>
              </ul>
              <div className="site-detail-tab-content tab-content">
                <div
                  id="site-config"
                  role="tabpanel"
                  className="site-detail-tab-pane tab-pane active"
                >
                  {this.renderConfigs()}
                </div>
                <div
                  id="site-profile"
                  role="tabpanel"
                  className="site-detail-tab-pane tab-pane"
                >
                  <SiteProfileForm />
                </div>
                <div
                  id="site-ftp"
                  role="tabpanel"
                  className="site-detail-tab-pane tab-pane"
                >
                  <SiteFtp />
                </div>
                <div
                  id="site-users"
                  role="tabpanel"
                  className="site-detail-tab-pane tab-pane"
                >
                  Site users
                </div>
                <div
                  id="site-log"
                  role="tabpanel"
                  className="site-detail-tab-pane tab-pane"
                >
                  <SiteLog />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ activeSite, activeConfig, configView, siteLog }) {
  return {
    activeSite,
    activeConfig,
    configView,
    siteLog
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { changeSitesView, fetchSiteLog, getSiteProfile, getActiveSiteJobs },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteDetail);
