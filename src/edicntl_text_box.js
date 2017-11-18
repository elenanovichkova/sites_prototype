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
  };

  render() {
    console.log("state", this.state);
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
