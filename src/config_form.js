import React, { Component } from "react";
import $ from "jquery";

import ViewSwitch from "./view_switch";
import ConfigFormAdminView from "./config_form_admin_view";
import ConfigFormSemanticView from "./config_form_semantic_view";

export default class ConfigForm extends Component {
  constructor(props) {
    super(props);
    console.log("form gets build", props);
    let { config, onSave } = props;
    this.state = {
      view: "admin",
      config: config
    };
  }

  onSave = event => {
    event.preventDefault();
    this.props.onSave();
  };

  onInputChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  onDeleteParam = param => {
    const params = [...this.state.params]; //clone array
    const paramIndex = params.indexOf(param);
    params.splice(paramIndex, 1); //removes config from array

    this.setState({ params });
  };

  render() {
    return (
      <div>
        <ViewSwitch
          view={"admin"}
          adminview={<ConfigFormAdminView config={this.state.config} />}
          semanticview={<ConfigFormSemanticView config={this.state.config} />}
        />
      </div>
    );
  }
}
