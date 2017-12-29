import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Spinner extends Component {
  renderSpinner() {
    if (this.props.siteList.isFetching) {
      return (
        <div>
          <span className="fa fa-spinner fa-spin" />
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    return (
      <div className="spinner-container">
        <div className="spinner">
          {this.renderSpinner()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ siteList }) {
  // whatever is returned will show up as a props inside of SiteList
  return { siteList };
}

//promote SiteList from a component to a container -  it needs to kow about this new dispatch method, selectSite. Make it available as a prop
export default connect(mapStateToProps)(Spinner);
