import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchConfigs, changeConfigsView } from "../actions/index";
import { bindActionCreators } from "redux";

class NewSiteTemplatePicker extends Component {
  render() {
    return <div>New Site Template Picker</div>;
  }
}

function mapStateToProps({ activeConfig, activeSite }) {
  return { activeConfig, activeSite };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchConfigs, changeConfigsView }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  NewSiteTemplatePicker
);
