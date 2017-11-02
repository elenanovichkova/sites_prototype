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
    this.state = {
      showAdminView: false,
      configFormState: this.props.configFormState,
      name: "",
      purpose: "",
      usage: "",
      fldsep: "",
      otherfldsep: "",
      descr: "",
      params: []
    };
  }

  componentWillMount() {
    if (this.props.configFormState != "new") {
      this.fetchEDICntl(this.props.edicntl.oid);
    }
  }

  fetchEDICntl = () => {
    console.log(this.props.edicntl.id.replace(/:/gi, ""));
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/edicntl${this.props.edicntl.id.replace(
        /:/gi,
        ""
      )}.json`,
      success: response => {
        console.log(response);
        let {
          name,
          purpose,
          usage,
          fldsep,
          otherfldsep,
          descr,
          params
        } = response.data;
        this.setState({
          name,
          purpose,
          usage,
          fldsep,
          otherfldsep,
          descr,
          params
        });
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  };

  handleSave(event) {
    event.preventDefault();
    console.log(this.props);
    console.log("Form Data on Save", this.state.formData);
    this.props.onSave();
  }

  handleEdiCntlFormGroupsChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    console.log("Config form data", this.state);
    return (
      <div>
        <form>
          <EDICntlTitle configFormState={this.state.configFormState} />
          <EDICntlFormGroups
            configFormState={this.state.configFormState}
            name={this.state.name}
            purpose={this.state.purpose}
            usage={this.state.usage}
            fldsep={this.state.fldsep}
            descr={this.state.descr}
            otherfldsep={this.state.otherfldsep}
            onChange={this.handleEdiCntlFormGroupsChange}
          />
          <EDICntlParamsTitle
            configFormState={this.state.configFormState}
            showAdminView={this.state.showAdminView}
            onShowAdminViewClick={() => {
              this.setState({ showAdminView: true });
            }}
            onShowSemanticViewClick={() => {
              this.setState({ showAdminView: false });
            }}
          />
          {this.state.showAdminView
            ? <EDICntlParamsAdminView
                configFormState={this.state.configFormState}
              />
            : <EDICntlParamsSemanticView
                configFormState={this.state.configFormState}
              />}
          <button onClick={this.handleSave.bind(this)}>SAVE</button>
        </form>
      </div>
    );
  }
}
