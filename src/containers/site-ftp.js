import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SiteFilesForm from "./site-files-form";
import SiteJobsForm from "./site-jobs-form";
import SiteFtpNotifyForm from "./site-ftpnotify-form";

class SiteFtp extends Component {
  render() {
    console.log("### active site jobs", this.props.activeSiteJobs);
    return (
      <div className="site-detail-ftp">
        <br />
        <div className="site-detail-jobs">
          <div className="site-detail-jobs-header">
            <div className="panel-body">Site Jobs</div>
          </div>
          <div className="panel-body">
            <div className="site-detail-current-jobs">
              <div className="row">
                <div className="col-md-12">
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
            <div className="site-detail-update-generate-jobs">
              <div className="row">
                <div className="col-md-12">
                  <h4>
                    Update/Generate Site Jobs{" "}
                    <small>
                      (Attention: This process cannot be reverted back and it
                      will overwrite <strong>ALL</strong> current jobs)
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
        </div>
        <br />
        <div className="site-detail-inbound-files">
          <div className="site-detail-inbound-files-header">
            <div className="panel-body">Site Inbound Files</div>
          </div>
          <div className="panel-body">
            <div className="site-detail-current-inbound-files">
              <div className="row">
                <div className="col-md-12">
                  <h4>Current Site Inbound Files</h4>
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-md-2 text-right">
                        <p>
                          <strong>
                            <span className="site-inbound-file-id-header">
                              File Id
                            </span>
                          </strong>
                        </p>
                      </div>
                      <div className="col-md-2 text-left">
                        <p>
                          <strong>
                            <span className="site-inbound-file-match-header">
                              File Regex
                            </span>
                          </strong>
                        </p>
                      </div>
                    </div>
                    {this.props.activeSiteInboundFiles.map((file, index) =>
                      <div key={file.ID} id={file.ID}>
                        <div className="row">
                          <div className="col-md-2 text-right">
                            <span className="site-inbound-file-id">
                              {file.ID}
                            </span>
                          </div>
                          <div className="col-md-2 text-left">
                            <span className="site-inbound-file-match">
                              {file.match}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="site-detail-update-generate-inbound-files">
              <h4>Update/Generate Site FTP Configuration For Incoming Files</h4>
              <div className="site-detail-incoming-files-form-wrapper">
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-6">
                      <SiteFilesForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="site-detail-ftp-notify">
          <div className="site-detail-ftp-notify-header">
            <div className="panel-body">Site FTP Notification</div>
          </div>
          <div className="panel-body">
            <div className="site-detail-current-ftp-notify">
              <div className="row">
                <div className="col-md-12">
                  <h4>Current Site FTP Notification</h4>
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-md-12">
                        <p>To do...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="site-detail-update-generate-ftp-notify">
              <div className="row">
                <div className="col-md-12">
                  <h4>Setup FTP Notification</h4>
                  <div className="site-detail-incoming-files-form-wrapper">
                    <div className="panel-body">
                      <div className="row">
                        <div className="col-md-6">
                          <SiteFtpNotifyForm />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({
  activeSite,
  activeSiteJobs,
  activeSiteInboundFiles
}) {
  return {
    activeSite,
    activeSiteJobs,
    activeSiteInboundFiles
  };
}

//component to a container -  it needs to kow about this new dispatch method. Make it available as a prop
export default connect(mapStateToProps)(SiteFtp);
