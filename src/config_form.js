import React, { Component } from "react";

import EDICntlTitle from "./edicntl_title";
import EDICntlForm from "./edicntl_form";
import EDICntlParamsTitle from "./edicntl_params_title";
import EDICntlParamsAdminView from "./edicntl_params_admin_view";
import EDICntlParamsSemanticView from "./edicntl_params_semantic_view";

export default class ConfigForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdminView: false,
      edicntl: props.edicntl
    };
    console.log("Current EDICntl ", props.edicntl);
  }

  handleSave(event) {
    event.preventDefault();
    console.log(this.props);
    this.props.onSave();
  }

  render() {
    return (
      <div>
        <form>
          <EDICntlTitle />
          <div className="row">
            <div className="col-md-6">
              <EDICntlForm />
            </div>
          </div>
          <EDICntlParamsTitle
            showAdminView={this.state.showAdminView}
            onShowAdminViewClick={() => {
              this.setState({ showAdminView: true });
            }}
            onShowSemanticViewClick={() => {
              this.setState({ showAdminView: false });
            }}
          />
          {this.state.showAdminView
            ? <EDICntlParamsAdminView />
            : <EDICntlParamsSemanticView />}
          <button onClick={this.handleSave.bind(this)}>SAVE</button>
        </form>
      </div>
    );
  }
}
