import React, { Component } from "react";
import { connect } from "react-redux";
import { selectSite, fetchConfigs, changeSitesView } from "../actions/index";
import { bindActionCreators } from "redux";

class SiteList extends Component {
  renderList() {
    if (this.props.siteList.isFetching) {
      return "";
    } else {
      return this.props.siteList.data.map(site => {
        return (
          <div className="site-list-item" key={site.id}>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-md-10">
                    {site.name}
                  </div>
                  <div className="col-md-2 text-right">
                    {site.active}
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="title">
                          <h3>
                            {site.siteId}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <p>
                          <span className="site-list-item-label site-list-item-label-taxid">
                            Tax Id:{" "}
                          </span>
                          <span className="site-list-item-taxid">
                            {site.taxid}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <p>
                          <span className="site-list-item-label site-list-item-label-receiverids">
                            Receiver Id(s):{" "}
                          </span>
                          <span className="site-list-item-taxid">
                            {site.receiverIds}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <button
                            className="btn btn-default full-width"
                            type="button"
                            onClick={() => {
                              this.props.changeSitesView("site-duplicate");
                              this.props.fetchConfigs(site.codenbr);
                            }}
                          >
                            DUPLICATE
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-default full-width"
                          type="button"
                          onClick={() => {
                            this.props.changeSitesView("site-detail");
                            this.props.selectSite(site);
                            this.props.fetchConfigs(site.codenbr);
                          }}
                        >
                          SELECT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <div id="site-list">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ siteList }) {
  // whatever is returned will show up as a props
  return { siteList };
}

//enything return from this function will end up as props
function mapDispatchToProps(dispatch) {
  //whenever select is call, the result should be passed to all reducers
  return bindActionCreators(
    { selectSite, fetchConfigs, changeSitesView },
    dispatch
  );
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(SiteList);
