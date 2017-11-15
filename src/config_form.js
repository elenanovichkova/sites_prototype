import React, { Component } from "react";
import $ from "jquery";

import EDICntlTitle from "./edicntl_title";
import EDICntlFormGroups from "./edicntl_form_groups";
import EDICntlParamsTitle from "./edicntl_params_title";
import EDICntlParamsAdminView from "./edicntl_params_admin_view";
import EDICntlParamsSemanticView from "./edicntl_params_semantic_view";

export default class ConfigForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      view: "admin",
      configFormState: this.props.configFormState,
      edicntl: props.edicntl
    };
  }

  handleSave = event => {
    event.preventDefault();
    this.props.onSave();
  };

  handleEdiCntlFormGroupsChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  handleDeleteParam = param => {
    const params = [...this.state.params]; //clone array
    const paramIndex = params.indexOf(param);
    params.splice(paramIndex, 1); //removes config from array

    this.setState({ params });
  };

  render() {
    return (
      <div>
        <form>
          <div>{JSON.stringify(this.state)}</div>
          <EDICntlTitle configFormState={this.state.configFormState} />
          <EDICntlFormGroups
            configFormState={this.state.edicntl.configFormState}
            name={this.state.edicntl.name}
            id={this.state.edicntl.id}
            purpose={this.state.edicntl.purpose}
            usage={this.state.edicntl.usage}
            fldsep={this.state.edicntl.fldsep}
            descr={this.state.edicntl.descr}
            otherfldsep={this.state.edicntl.otherfldsep}
            onChange={this.handleEdiCntlFormGroupsChange}
          />
          <EDICntlParamsTitle
            configFormState={this.state.configFormState}
            showAdminView={this.state.showAdminView}
            onShowAdminViewClick={() => {
              this.setState({ view: "admin" });
            }}
            onShowSemanticViewClick={() => {
              this.setState({ view: "semantic" });
            }}
          />
          {this.state.view == "admin" ? (
            <EDICntlParamsAdminView
              configFormState={this.state.configFormState}
              handleDeleteParam={this.handleDeleteParam}
              params={this.state.edicntl.params}
            />
          ) : (
            <EDICntlParamsSemanticView
              configFormState={this.state.configFormState}
              params={this.state.edicntl.params}
            />
          )}
          <button onClick={this.handleSave}>SAVE</button>
        </form>
      </div>
    );
  }
}
