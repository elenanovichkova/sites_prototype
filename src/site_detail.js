import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import $ from "jquery";

import SiteHeader from "./site_header";
import EdiConfigsRootComponent from "./edi_configs_root_component";

export default class SiteDetail extends Component {
  componentWillMount() {
    this.fetchSiteDetail();
  }

  constructor() {
    super();
    this.state = {
      tabIndex: 0,
      siteId: "",
      site: {}
    };
  }

  fetchSiteDetail(siteId) {
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/siteDetail${this.props.siteId}.json`,
      //url: `${sid}/ajax.do?req.objectID=${reqObjID}&flow=f_sitesJ&param.rtype=siteDetail&param.id=${this.props.siteId}`,
      success: data => {
        this.setState({ site: data.site });
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  }

  handleGoBackClick = () => {
    this.props.onGoBackClick();
  };

  render() {
    return (
      <div>
        <button onClick={this.handleGoBackClick}>Back to All sites</button>
        <h3>Site Detail</h3>
        <SiteHeader site={this.state.site} />
        <Tabs
          onSelect={tabIndex => {
            this.setState({ tabIndex });
          }}
        >
          <TabList>
            <Tab>EDI Configs</Tab>
            <Tab>Bills Questionnaire</Tab>
            <Tab>Attachments Questionnaire</Tab>
            <Tab>FTP/sFTP</Tab>
            <Tab>Site Profile</Tab>
            <Tab>Contacts</Tab>
            <Tab>Test Files</Tab>
          </TabList>

          <TabPanel>
            <EdiConfigsRootComponent siteId={this.props.siteId} />
          </TabPanel>
          <TabPanel>
            <h2>Bills Questionnaire content </h2>
          </TabPanel>
          <TabPanel>
            <h2>Attachments Questionnaire content</h2>
          </TabPanel>
          <TabPanel>
            <h2>FTP/sFTP content</h2>
          </TabPanel>
          <TabPanel>
            <h2>Site Profile content</h2>
          </TabPanel>
          <TabPanel>
            <h2>Contact content</h2>
          </TabPanel>
          <TabPanel>
            <h2>Test Files content</h2>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
