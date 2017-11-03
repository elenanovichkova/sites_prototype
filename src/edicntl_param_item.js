import React, { Component } from "react";

export default class EdiCntlParamItem extends Component {
  constructor() {
    super();
  }

  handleDelete = () => {
    this.props.onDelete(this.props.param);
  };

  render() {
    return (
      <tr>
        <td>
          {this.props.param.tag}
        </td>
        <td>
          {this.props.param.value}
        </td>
        <td>
          <span className="fa fa-times" onClick={this.handleDelete} />
        </td>
      </tr>
    );
  }
}
