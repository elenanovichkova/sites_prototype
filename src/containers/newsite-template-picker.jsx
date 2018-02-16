import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { selectSiteTemplate, changeSitesView } from "../actions/index";
import { bindActionCreators } from "redux";

class NewSiteTemplatePicker extends Component {
  render() {
    return (
      <div>
        <div className="title text-center">
          <h3>NEW</h3>
        </div>
        <br />
        {_.chunk(this.props.siteTemplateList.data, 4).map((row, rowIndex) => {
          return (
            <div className="row" key={`templateRow${rowIndex}`}>
              {row.map(template => {
                return (
                  <div className="col-md-3" key={template.id}>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3 className="panel-title">
                          {template.title}
                        </h3>
                      </div>
                      <div className="panel-body">
                        <div>
                          <p>
                            <strong>Description: </strong>
                            {template.descr}
                          </p>
                        </div>
                        <div className="text-center">
                          <button
                            className="btn btn-primary full-width"
                            type="button"
                            onClick={() => {
                              this.props.selectSiteTemplate(template);
                              this.props.changeSitesView("site-new");
                            }}
                          >
                            CREATE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps({ siteTemplateList }) {
  return { siteTemplateList };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectSiteTemplate, changeSitesView }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  NewSiteTemplatePicker
);
