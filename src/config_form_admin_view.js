import React, { Component } from "react";
import $ from "jquery";

export default class ConfigFormAdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formConfig: {},
      config: props.config
    };
  }

  render() {
    console.log("Admin View", this.props.config);
    return (
      <div className="form-horizontal">
        {this.props.config.params.map(param => {
          return (
            <div key={param.id}>
              <div>
                <span>{param.tag}</span>
                <span>, {param.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
