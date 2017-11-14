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
      oid: "",
      id: "",
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
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/edicntl${this.props.edicntl.id.replace(
        /:/gi,
        ""
      )}.json`,
      success: response => {
        let {
          oid,
          id,
          name,
          purpose,
          usage,
          fldsep,
          otherfldsep,
          descr,
          params
        } = response.data;

        this.setState({
          oid,
          id,
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
          <div>
            {JSON.stringify(this.state)}
          </div>
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
                handleDeleteParam={this.handleDeleteParam}
                params={this.state.params}
              />
            : <EDICntlParamsSemanticView
                configFormState={this.state.configFormState}
                params={this.state.params}
              />}
          <button onClick={this.handleSave}>SAVE</button>
        </form>
      </div>
    );
  }
}
