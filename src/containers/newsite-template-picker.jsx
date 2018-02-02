import React, { Component } from "react";
import { connect } from "react-redux";
import { selectSiteTemplate } from "../actions/index";
import { bindActionCreators } from "redux";

class NewSiteTemplatePicker extends Component {
  render() {
    let length;
    return (
      <div>
        <div className="title text-center">
          <h3>NEW SITE</h3>
        </div>
        <br />
        <div className="row">
          <div className="col-md-offset-3 col-md-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Blank</h3>
              </div>
              <div className="panel-body">
                <div>
                  <p>
                    <strong>Description: </strong>is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book.
                  </p>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary full-width"
                    type="button"
                    onClick={() =>
                      this.props.showNewSiteInitialForm(this.state.blankSite)}
                  >
                    CREATE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">ECW Retail Site</h3>
              </div>
              <div className="panel-body">
                <div>
                  <p>
                    <strong>Description: </strong>is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book.
                  </p>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary full-width" type="button">
                    CREATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ siteTemplateList }) {
  return { siteTemplateList };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectSiteTemplate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  NewSiteTemplatePicker
);
