import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class SiteLog extends Component {
  render() {
    console.log("site-log", this.props.siteLog);
    return (
      <div className="panel-body">
        <br />

        {this.props.siteLog.message
          ? <div className="alert alert-danger">
              {this.props.siteLog.message}
            </div>
          : ""}
        {this.props.siteLog.isFetching
          ? <div>Loading...</div>
          : <div id="site-log">
              <div className="row nav-tabs">
                <div className="col-md-1">
                  <p>
                    <strong>Category</strong>
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Result</strong>
                  </p>
                </div>
                <div className="col-md-5">
                  <p>
                    <strong>Description</strong>
                  </p>
                </div>
                <div className="col-md-1">
                  <p>
                    <strong>When</strong>
                  </p>
                </div>
                <div className="col-md-3">
                  <p>
                    <strong>User</strong>
                  </p>
                </div>
              </div>
              {this.props.siteLog.data.map(log => {
                return (
                  <div key={log.id} className="row nav-tabs">
                    <div className="col-md-1">
                      {log.category}
                    </div>
                    <div className="col-md-2">
                      {log.result}
                    </div>
                    <div className="col-md-5">
                      {log.descr}
                    </div>
                    <div className="col-md-1">
                      {log.when}
                    </div>
                    <div className="col-md-3">
                      {log.user}
                    </div>
                  </div>
                );
              })}
            </div>}
      </div>
    );
  }
}

function mapStateToProps({ siteLog }) {
  // whatever is returned will show up as a props
  return { siteLog };
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps)(SiteLog);
