import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectParam } from "../actions/index";

class ParamListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      param: this.props.param
    };
  }

  selectParam(param) {
    if (this.props.activeParam != "" && this.props.activeParam == param) {
      //if param is already selected
      this.props.selectParam("");
    } else {
      //new param selected
      this.props.selectParam(param);
    }
  }

  render() {
    return (
      <tr
        key={this.props.param.id}
        className={`${this.props.activeParam == this.props.param
          ? "selected"
          : ""} ${this.props.param.isChanged ? "changed" : ""} ${this.props
          .param.isNew
          ? "new"
          : ""} ${this.props.param.isDeleted ? "deleted" : ""}`}
        onClick={() => {
          this.selectParam(this.props.param);
        }}
      >
        <td> </td>
        <td>
          {this.props.param.formcontrolLabel}
        </td>
        <td>
          {this.props.param.formcontrolOptionDescr}
        </td>
        <td>
          {this.props.param.tag}
        </td>
        <td>
          {this.props.param.value}
        </td>
      </tr>
    );
  }
}

function mapStateToProps({ activeParam }) {
  // whatever is returned will show up as a props
  return {
    activeParam
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectParam
    },
    dispatch
  );
}

//promote SiteList from a component to a container -  it needs to kow about this new dispatch method, selectSite. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(ParamListItem);
