import React, { Component } from "react";
import $ from "jquery";

import ConfigFormAdminView from "./config_form_admin_view";
import ConfigFormSemanticView from "./config_form_semantic_view";

export default class ConfigForm extends Component {
  constructor(props) {
    console.log("in constructor", props);
    super(props);
    let clone = JSON.parse(JSON.stringify(props));
    this.state = {
      view: "admin",
      config: clone.config
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log("received new props");
  }

  onChange = newParams => {
    let configParams = [...this.state.config.params];
    let isNew = true;
    for (var i = 0; i < newParams.length; i++) {
      for (var j = 0; j < configParams.length; j++) {
        if (newParams[i].tag == configParams[j].tag) {
          isNew = false;
          configParams[j].value = newParams[i].value;
        }
      }
    }
    if (isNew) {
      configParams = configParams.concat(newParams);
    }
    let newConfig = this.state.config;
    newConfig.params = configParams;
    this.setState({ config: newConfig });
  };

  onRemove = paramsToRemove => {
    let currentParams = [...this.state.config.params];
    let updatedParams = currentParams.filter(param => {
      return paramsToRemove.indexOf(param.tag) == -1;
    });
    let newConfig = this.state.config;
    newConfig.params = updatedParams;
    this.setState({ config: newConfig });
  };

  reset = event => {
    console.log("in reset", this.props.config);
    event.preventDefault();
    let clone = JSON.parse(JSON.stringify(this.props));
    this.setState({ config: clone.config });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-offset-10 col-md-2 text-right">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.reset}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3>Semantic View</h3>
            <ConfigFormSemanticView
              config={this.state.config}
              siteId={this.props.siteId}
              onChange={this.onChange}
              onRemove={this.onRemove}
            />
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-md-12">
              <h3>Admin View</h3>
            </div>
            <div className="col-md-offset-3 col-md-9">
              <div className="row">
                <div className="col-md-6">
                  <div className="panel panel-default">
                    <div className="panel-heading">EDI Control params</div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Tag</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.config.params.map(param => {
                          return (
                            <tr key={param.id}>
                              <td>{param.tag}</td>
                              <td>{param.value}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
