import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";

class SiteDetail extends Component {
  onTabClick(event) {
    event.preventDefault();
    $(".site-detail-tab-content .tab-pane").removeClass("active");
    $(".site-detail-nav-tabs li").removeClass("active");
    var index = event.target.href.indexOf("#");
    var tabId = event.target.href.substring(index);
    $(tabId).addClass("active");
    $(event.target).parent().addClass("active");
    console.log(tabId);
  }

  render() {
    {
      if (!this.props.site.name) {
        return (
          <div className="panel panel-default">
            <div className="panel-heading">Search a site to get started</div>
          </div>
        );
      } else {
        return (
          <div className="panel panel-default">
            <div className="panel-heading">
              {this.props.site.name}
            </div>
            <div className="panel-body">
              <p>
                <span className="fa fa-folder" /> {this.props.site.codenbr}
              </p>
              <p>
                <span className="fa fa-address-card-o" />{" "}
                {this.props.site.address}
              </p>
              <p>
                <span className="fa fa-phone" /> {this.props.site.phone}
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
              </ul>
              <div className="site-detail-tab-content tab-content">
                <div
                  id="site-config"
                  role="tabpanel"
                  className="site-detail-tab-pane tab-pane active"
                >
                  Site configs
                </div>
                <div
                  id="site-profile"
                  role="tabpanel"
                  className="site-detail-tab-pane tab-pane"
                >
                  Site profile
                </div>
                <div
                  id="site-ftp"
                  role="tabpanel"
                  className="site-detail-tab-pane tab-pane"
                >
                  Site ftp
                </div>
                <div
                  id="site-users"
                  role="tabpanel"
                  className="site-detail-tab-pane tab-pane"
                >
                  Site users
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    site: state.activeSite
  };
}

export default connect(mapStateToProps)(SiteDetail);
