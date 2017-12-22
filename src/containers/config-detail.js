import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchConfigs } from "../actions/index";
import { bindActionCreators } from "redux";

class ConfigDetail extends Component {
  render() {
    return (
      <div className="">
        <div className="panel-body">
          <p>
            <a
              href="#"
              onClick={() => this.props.fetchConfigs(this.props.site.codenbr)}
            >
              <span className="fa fa-chevron-circle-left" /> BACK
            </a>
          </p>
          <h5 className="text-center">
            {this.props.config.id} configuration
          </h5>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { config: state.activeConfig, site: state.activeSite };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchConfigs }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigDetail);
