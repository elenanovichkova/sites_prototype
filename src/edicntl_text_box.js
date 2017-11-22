import React, { Component } from "react";

export default class EdiCntlTextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  onChange = event => {
    let value = event.target.value;
    this.setState({ value });
    this.props.onChange(this.props.type, value, []);
  };

  render() {
    return (
      <div>
        <input
          className="form-control"
          type={this.props.type}
          onChange={this.onChange}
          value={this.state.value}
        />
      </div>
    );
  }
}
