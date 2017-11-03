import React, { Component } from "react";
import EdiCntlParamItem from "./edicntl_param_item";

export default class EDICntlParamsAdminView extends Component {
  handleDeleteParam = param => {
    this.props.handleDeleteParam(param);
  };

  getParams = () => {
    return this.props.params.map(param => {
      return (
        <EdiCntlParamItem
          param={param}
          key={param.id}
          onDelete={this.handleDeleteParam}
        />
      );
    });
  };

  render() {
    let params = this.getParams();
    return (
      <div>
        <div>
          {JSON.stringify(this.props.params)}
        </div>
        <div id="edicntl-params-admin-view">Admin View</div>
        <table>
          <thead>
            <tr>
              <th>tag</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            {params}
          </tbody>
        </table>
      </div>
    );
  }
}
