import React, { Component } from "react";

export default class ViewSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: props.view
    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-offset-7 col-md-5 text-right">
            {this.state.view == "semantic" ? (
              <span>
                <a
                  href="#edicntl-params-admin-view"
                  onClick={() => {
                    this.setState({ view: "admin" });
                  }}
                >
                  Admin View
                </a>
                <span> / Semantic View</span>
              </span>
            ) : (
              <span>
                <span>Admin View</span>
                <a
                  href="#edicntl-params-semantic-view"
                  onClick={() => {
                    this.setState({ view: "semantic" });
                  }}
                >
                  <span> / Semantic View</span>
                </a>
              </span>
            )}
          </div>
        </div>
        {this.state.view == "semantic" ? (
          <div className="row">
            <div className="col-md-12">{this.props.semanticview}</div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12">{this.props.adminview}</div>
          </div>
        )}
      </div>
    );
  }
}
