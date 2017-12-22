import React, { Component } from "react";
import { connect } from "react-redux";
import { selectConfig, viewConfig } from "../actions/index";
import { bindActionCreators } from "redux";

class ConfigList extends Component {
  renderList() {
    return this.props.configs.map(config => {
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
                onClick={() => this.props.viewConfig(config)}
              />
            </a>
          </td>
          <td>
            <a href="#">
              <span
                className="fa fa-pencil"
                onClick={() => this.props.selectConfig(config, "edit")}
              />
            </a>
          </td>
          <td>
            <a href="#">
              <span
                className="fa fa-clone"
                onClick={() => this.props.selectConfig(config, "duplicate")}
              />
            </a>
          </td>
          <td>
            <a href="#">
              <span
                className="fa fa-trash"
                onClick={() => this.props.selectConfig(config, "delete")}
              />
            </a>
          </td>
        </tr>
      );
    });
  }

  render() {
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

function mapStateToProps(state) {
  // whatever is returned will show up as a props inside of BookList
  return { configs: state.configs };
}

//enything return from this function will end up as props on the SiteList container
function mapDispatchToProps(dispatch) {
  //whenever select is call, he result should be passed to all our reducers
  return bindActionCreators({ selectConfig, viewConfig }, dispatch);
}

//promote SiteList from a component to a container -  it needs to kow about this new dispatch method, selectSite. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);
