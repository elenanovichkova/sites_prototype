import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SiteFilesForm from "./site-files-form";
import SiteJobsForm from "./site-jobs-form";

class SiteFtp extends Component {
  render() {
    console.log("### active site jobs", this.props.activeSiteJobs);
    return (
      <div className="site-detail-ftp">
        <br />
        <div className="site-detail-files">
          <div className="site-detail-jobs-header">
            <div className="panel-body">Site Jobs</div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="panel-body">
                <div className="site-detail-current-jobs">
                  <h4>Current Site Jobs</h4>
                  <div className="panel-body">
                    {this.props.activeSiteJobs.map((job, index) =>
                      <div key={job.ID} id={job.sID}>
                        <div className="row">
                          <div className="col-md-12">
                            <p className="text-left">
                              {job.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="panel-body">
                <h4>
                  Update/Generate Site Jobs{" "}
                  <small>
                    (Attention: This process cannot be reverted back and it will
                    overwrite <strong>ALL</strong> current jobs)
                  </small>
                </h4>
                <div className="panel-body">
                  <div className="site-detail-jobs-form-wrapper">
                    <SiteJobsForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="site-detail-files">
          <div className="site-detail-files-header">
            <div className="panel-body">File Name Convention</div>
          </div>
          <div className="site-detail-files-form-wrapper">
            <SiteFilesForm />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ activeSite, activeSiteJobs }) {
  return {
    activeSite,
    activeSiteJobs
  };
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps)(SiteFtp);
