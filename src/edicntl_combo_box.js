import React, { Component } from "react";

export default class EdiCntlComboBox extends Component {
  constructor(props) {
    super(props);
    let { id, description, value, restricted, options, defaultValue } = props;
    let implParams = this.getSelectedOptionParams(value) || [];

    this.state = {
      value: value,
      implParams: implParams
    };
  }

  componentWillReceiveProps(nextProps) {
    let {
      id,
      description,
      value,
      restricted,
      options,
      defaultValue
    } = nextProps;
    let implParams = this.getSelectedOptionParams(value) || [];
    this.setState({
      value: value,
      implParams: implParams
    });
  }

  getSelectedOptionParams = optionValue => {
    let optionObj = this.props.options.reduce(function(filtered, option) {
      if (option.value == optionValue) {
        filtered = option;
      }
      return filtered;
    }, {});
    return optionObj.implparams;
  };

  getElementAllParams = () => {
    let allParams = this.props.options.reduce((params, option) => {
      let paramTags = option.implparams.map(param => {
        return param.tag;
      });
      return params.concat(paramTags);
    }, []);
    let uniqueParams = allParams.filter((param, index, allParams) => {
      return allParams.indexOf(param) === index;
    });
    return uniqueParams;
  };

  onChange = event => {
    let value = event.target.value;
    let elementParams = this.getElementAllParams();
    this.props.onRemove(elementParams); //remove all params related to this element
    if (value) {
      let implParams = this.getSelectedOptionParams(value) || [];
      this.props.onChange(implParams);
    }
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <select
              name={this.state.name}
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
          </div>
          <div className="col-md-6">
            {this.state.implParams.map(param => {
              return (
                <div key={param.id}>
                  <span>{param.tag}</span>
                  <span>, {param.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
