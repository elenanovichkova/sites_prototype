import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getConfigDetail,
  duplicateConfig,
  deleteConfig,
  changeConfigsView
} from "../actions/index";
import { bindActionCreators } from "redux";

class ConfigList extends Component {
  renderList() {
    //console.log(privs);
    return this.props.configList.map(config => {
      return (
        <tr key={config.ID}>
          <td>
            {config.receiverID}
          </td>
          <td>
            {config.ID}
          </td>
          <td />
          <td>
            {config.purpose}
          </td>
          <td>
            {config.usage}
          </td>
          <td>
            <a href="#">
              <span
                className="fa fa-eye"
                onClick={() => {
                  this.props.getConfigDetail(config, () =>
                    this.props.changeConfigsView("config-detail")
                  );
                }}
              />
            </a>
          </td>
          <td>
            <a href="#">
              <span
                className="fa fa-pencil"
                onClick={() => {
                  this.props.getConfigDetail(config, () =>
                    this.props.changeConfigsView("config-edit")
                  );
                }}
              />
            </a>
          </td>
          <td>
            <a href="#">
              <span
                className="fa fa-files-o"
                onClick={() => this.props.duplicateConfig(config, "duplicate")}
              />
            </a>
          </td>
          <td>
            <a href="#">
              <span
                className="fa fa-trash"
                onClick={() => this.props.deleteConfig(config, "delete")}
              />
            </a>
          </td>
        </tr>
      );
    });
  }

  render() {
    if (this.props.activeConfig.isFetching) {
      return (
        <div className="text-center">
          <h3>Loading ...</h3>
        </div>
      );
    }
    return (
      <div className="panel-body">
        <div className="row">
          <div className="col-md-12 text-right">
            <button type="button" className="btn btn-primary">
              Add New
            </button>
          </div>
        </div>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>Receiver ID</th>
              <th>ID</th>
              <th>Status</th>
              <th>Purpose</th>
              <th>Usage</th>
              <th colSpan="4">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ configList, activeConfig }) {
  // whatever is returned will show up as a props
  return { configList, activeConfig };
}

function mapDispatchToProps(dispatch) {
  //whenever function called, the result should be passed to all our reducers
  return bindActionCreators(
    {
      getConfigDetail,
      duplicateConfig,
      deleteConfig,
      changeConfigsView
    },
    dispatch
  );
}

//promote component to a container -  it needs to know about dispatch methods. Make them available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);
