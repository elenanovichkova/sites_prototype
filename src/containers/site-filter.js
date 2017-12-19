import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSites } from "../actions/index";

class SiteFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: "",
      siteId: "",
      siteTaxId: "",
      siteReceiverId: ""
    };
  }

  onChange(event) {
    console.log(event.target.value, event.target.name);
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchSites(
      this.state.siteName,
      this.state.siteId,
      this.state.siteTaxId,
      this.state.siteReceiverId
    );
  }

  render() {
    return (
      <div className="well">
        <form
          className="form-horizontal"
          onSubmit={event => this.onFormSubmit(event)}
        >
          <div className="row">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="control-label col-sm-5">Name</label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="siteName"
                        className="form-control"
                        value={this.state.siteName}
                        onChange={event => this.onChange(event)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="control-label col-sm-5">ID</label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="siteId"
                        className="form-control"
                        value={this.state.siteId}
                        onChange={event => this.onChange(event)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="control-label col-sm-5">Tax ID</label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="siteTaxId"
                        className="form-control"
                        value={this.state.siteTaxId}
                        onChange={event => this.onChange(event)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="control-label col-sm-5">
                      Submitter ID
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="siteReceiverId"
                        className="form-control"
                        value={this.state.siteReceiverId}
                        onChange={event => this.onChange(event)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group text-right">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-default">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSites }, dispatch);
}

export default connect(null, mapDispatchToProps)(SiteFilter);
