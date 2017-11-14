import React, { Component } from "react";

export default class SitesFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: props.filter.siteName,
      siteId: props.filter.siteId,
      taxId: props.filter.taxId,
      submitterId: props.filter.submitterId
    };
  }

  handleSearchClick = event => {
    event.preventDefault();
    this.props.onSearch(this.state);
  };

  handleChange = event => {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({ [name]: value });
    this.props.updateFilter(name, value);
  };

  render() {
    return (
      <div>
        <form className="form-horizontal">
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label className="control-label col-sm-4">Site Name</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="siteName"
                    placeholder="Enter site name"
                    name="siteName"
                    value={this.state.siteName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label className="control-label col-sm-4">Site ID</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="siteId"
                    placeholder="Enter site id"
                    name="siteId"
                    value={this.state.siteId}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label className="control-label col-sm-4">Site Tax ID</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="taxId"
                    placeholder="Enter tax id"
                    name="taxId"
                    value={this.state.taxId}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label className="control-label col-sm-4">Submitter ID</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="submitterId"
                    placeholder="Enter submitter id"
                    name="submitterId"
                    value={this.state.submitterId}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 text-right">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleSearchClick}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
