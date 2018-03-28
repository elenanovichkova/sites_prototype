import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectGParam, openEditGParamModal } from "../actions/index";

class ParameterList extends Component {
  render() {
    return (
      <div className="parameters-library-list">
        <p>Parameters list</p>
        <div className="row">
          {this.props.gParams.data.length != 0
            ? this.props.gParams.data.map(param =>
                <div
                  key={param.id}
                  className="col-md-12"
                  id={`param-library-item-${param.id}`}
                >
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <div className="row">
                        <div className="col-xs-11">
                          {param.tag}
                        </div>
                        <div className="col-xs-1 text-right">
                          <a href="#">
                            <span
                              className="fa fa-pencil"
                              onClick={() => {
                                this.props.openEditGParamModal();
                                this.props.selectGParam(param);
                              }}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="panel-body">
                      <div className="param-library-item-category">
                        Category: {param.category}
                      </div>
                      <div className="param-library-item-group">
                        Group: {param.group}
                      </div>
                      <div className="param-library-item-question">
                        Question: {param.question}
                      </div>
                      <div className="param-library-item-options">
                        Options:{" "}
                        <ul>
                          {param.options.map(option =>
                            <li
                              key={option.id}
                              id={`param-library-item-${param.id}-option-${option.id}`}
                            >
                              <span className="param-library-item-option-descripttion">
                                {option.descr}
                              </span>{" "}
                              <span className="param-library-item-option-value">
                                (value: {option.val})
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
            : ""}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ gParams, gFiteredParams }) {
  // whatever is returned will show up as a props
  return { gParams, gFiteredParams };
}

function mapDispatchToProps(dispatch) {
  //whenever function called, the result should be passed to all our reducers
  return bindActionCreators(
    {
      selectGParam,
      openEditGParamModal
    },
    dispatch
  );
}

//promote component to a container -  it needs to know about dispatch methods. Make them available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(ParameterList);
