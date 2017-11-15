import React, { Component } from "react";

export default class EDICntlFormGroups extends Component {
  constructor(props) {
    super(props);
    let name = props.configFormState === "dupl" ? "" : this.props.name;
    this.state = {
      name: name,
      id: this.props.id,
      purpose: this.props.purpose,
      usage: this.props.usage,
      fldsep: this.props.fldsep,
      otherfldsep: this.props.otherfldsep,
      descr: this.props.descr
    };
  }

  componentWillReceiveProps(nextProps) {
    //need to update state to get preset values in a form when ajax request from parent form is finished
    let { purpose, usage, fldsep, otherfldsep, descr } = nextProps;
    let name = nextProps.configFormState === "dupl" ? "" : nextProps.name;
    this.setState({
      name,
      purpose,
      usage,
      fldsep,
      otherfldsep,
      descr
    });
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    //update parent form on change
    this.props.onChange(name, value);
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <div>
            <div className="form-group">
              <label htmlFor="edicntl-name">Name *</label>
              <input
                name="name"
                id="edicntl-name"
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="edicntl-name">ID *</label>
              <input
                name="id"
                id="edicntl-id"
                type="text"
                value={this.state.id}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="edicntl-purpose">Purpose *</label>
              <select
                name="purpose"
                id="edicntl-purpose"
                className="form-control"
                value={this.state.purpose}
                onChange={this.handleInputChange}
              >
                <option value="">SELECT</option>
                <option value="EBIL">EBIL</option>
                <option value="EBRV">EBRV</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="edicntl-usage">Usage *</label>
              <select
                name="usage"
                id="edicntl-usage"
                className="form-control"
                value={this.state.usage}
                onChange={this.handleInputChange}
              >
                <option value="">SELECT</option>
                <option value="T">TEST</option>
                <option value="P">PRODUCTION</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="edicntl-fldsep">Field Separator</label>
              <select
                name="fldsep"
                id="edicntl-fldsep"
                className="form-control"
                value={this.state.fldsep}
                onChange={this.handleInputChange}
              >
                <option value="">Select</option>
                <option value="*">* asterisk</option>
                <option value="~">~ tilde</option>
                <option value=":">: colon</option>
                <option value="|">| vertical bar</option>
                <option value="other">other</option>
              </select>
            </div>
            {this.state.fldsep === "other" ? (
              <div className="form-group">
                <label htmlFor="edicntl-fldsep-other">Specify separator</label>
                <input
                  name="otherfldsep"
                  id="edicntl-otherfldsep"
                  type="text"
                  className="form-control"
                  value={this.state.otherfldsep}
                  onChange={this.handleInputChange}
                />
              </div>
            ) : (
              ""
            )}
            <div className="form-group">
              <label htmlFor="edicntl-descr">Description</label>
              <input
                name="descr"
                id="edicntl-descr"
                type="text"
                className="form-control"
                value={this.state.descr}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
