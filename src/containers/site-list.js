import React, { Component } from "react";
import { connect } from "react-redux";
import { selectSite } from "../actions/index";
import { bindActionCreators } from "redux";

class SiteList extends Component {
  renderList() {
    return this.props.sites.map(site => {
      return (
        <li
          key={site.id}
          className="list-group-item"
          onClick={() => this.props.selectSite(site)}
        >
          {site.siteId}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Site List</div>
        <ul className="list-group">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ sites }) {
  // whatever is returned will show up as a props inside of BookList
  return { sites };
}

//enything return from this function will end up as props on the SiteList container
function mapDispatchToProps(dispatch) {
  //whenever select is call, he result should be passed to all our reducers
  return bindActionCreators({ selectSite: selectSite }, dispatch);
}

//promote SiteList from a component to a container -  it needs to kow about this new dispatch method, selectSite. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(SiteList);
