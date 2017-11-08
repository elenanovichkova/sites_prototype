import React, { Component } from "react";

export default class Switch extends Component {
  constructor(props) {
    super(props);
  }

  handleOnChange = event => {
    const target = event.target;
    const value = target.checked;
    this.props.onChange(value);
  };

  render() {
    return (
      <div>
        <label className="switch">
          <input
            type="checkbox"
            checked={this.props.isChecked}
            onChange={this.handleOnChange}
          />
          <span className="switchslider round" />
        </label>
      </div>
    );
  }
}
