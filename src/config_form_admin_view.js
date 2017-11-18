import React, { Component } from "react";
import $ from "jquery";

import EdiCntlComboBox from "./edicntl_combo_box";
import EdiCntlTextBox from "./edicntl_text_box";

const TextBox = props => {
  return <input className="form-control" type={props.type} />;
};

export default class ConfigFormAdminView extends Component {
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
        this.setState({ formConfig: response.formConfig });
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  };

  buildFormControl = formgroup => {
    console.log("in");
    let formcontrol;
    switch (formgroup.type) {
      case "text":
        formcontrol = <EdiCntlTextBox type="text" {...formgroup} />;
        break;
      case "combo":
        formcontrol = <EdiCntlComboBox {...formgroup} />;
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
    console.log(this.state.formConfig);
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
                    {this.buildFormControl(formgroup)}
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
