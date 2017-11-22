import React, { Component } from "react";
import $ from "jquery";

import EdiCntlComboBox from "./edicntl_combo_box";
import EdiCntlTextBox from "./edicntl_text_box";

export default class ConfigFormSemanticView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formConfig: {},
      config: props.config
    };
  }

  componentWillMount() {
    this.fetchAdminFormConfiguration();
  }

  fetchAdminFormConfiguration = () => {
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/edicntlAdminFormConfig.json`,
      success: response => {
        //replace all site specific params with current siteid
        var old = JSON.stringify(response).replace(
          /%SITE%/g,
          this.props.siteId
        );
        var newResponse = JSON.parse(old);
        this.setState({ formConfig: newResponse.formConfig });
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  };

  getValue = (options, params) => {
    let value = "";
    for (let i = 0; i < params.length; i++) {
      for (let j = 0; j < options.length; j++) {
        let implparams = options[j].implparams;
        for (let k = 0; k < implparams.length; k++) {
          if (
            implparams[k].tag == params[i].tag &&
            implparams[k].value == params[i].value
          ) {
            value = options[j].value;
          }
        }
      }
    }
    return value;
  };

  buildFormControl = formgroup => {
    let formcontrol;
    switch (formgroup.controltype) {
      case "text":
        formcontrol = (
          <EdiCntlTextBox
            type="text"
            onChange={this.props.onChange}
            {...formgroup}
          />
        );
        break;
      case "combo":
        let value = this.getValue(formgroup.options, this.props.config.params);
        formcontrol = (
          <EdiCntlComboBox
            siteId={this.props.siteId}
            value={value}
            {...formgroup}
            onChange={this.props.onChange}
            onRemove={this.props.onRemove}
          />
        );
        break;
      case "number":
        formcontrol = <EdiCntlTextBox type="number" {...formgroup} />;
        break;
      default:
        formcontrol = <EdiCntlTextBox type="text" {...formgroup} />;
        break;
    }
    return <div>{formcontrol}</div>;
  };

  buildForm = () => {
    return this.state.formConfig.sections.map(section => {
      return (
        <div key={section.id}>
          <div>{section.description}</div>
          {section.formgroups.map(formgroup => {
            return (
              <div key={formgroup.id}>
                <div className="form-group">
                  <label className="control-label col-md-3">
                    {formgroup.description}
                  </label>
                  <div className="col-md-9">
                    {formgroup.view === "admin"
                      ? this.buildFormControl(formgroup)
                      : ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  render() {
    if (!this.state.formConfig.sections) return <div>Loading...</div>;
    let formgroups = this.buildForm();
    return <div className="form-horizontal">{formgroups}</div>;
  }
}
