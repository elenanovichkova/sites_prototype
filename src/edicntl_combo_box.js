import React, { Component } from "react";

export default class EdiCntlComboBox extends Component {
  constructor(props) {
    super(props);
    let { id, description, value, restricted, options, defaultValue } = props;
    let implParams = this.getImplParams(defaultValue) || [];
    this.state = {
      value: defaultValue,
      implParams: implParams
    };
  }

  getImplParams = optionValue => {
    let optionObj = this.props.options.reduce(function(filtered, option) {
      if (option.value == optionValue) {
        filtered = option;
      }
      return filtered;
    }, {});
    return optionObj.implparams;
  };

  onChange = event => {
    let value = event.target.value;
    let implParams = this.getImplParams(value) || [];
    this.setState({ value, implParams });
  };

  render() {
    console.log("state", this.state);
    return (
      <div>
        <select
          className="form-control"
          onChange={this.onChange}
          value={this.state.value}
        >
          <option value="">SELECT</option>
          {this.props.options.map(option => {
            return (
              <option value={option.value} key={option.id}>
                {option.description}
              </option>
            );
          })}
        </select>
        <div>
          {this.state.implParams.map(param => {
            return (
              <div key={param.id}>
                <span>{param.tag}</span>
                <span>, {param.val}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
