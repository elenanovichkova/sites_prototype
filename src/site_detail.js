import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import $ from "jquery";

import SiteHeader from "./site_header";
import EdiConfigsRootComponent from "./edi_configs_root_component";

export default class SiteDetail extends Component {
  componentWillMount() {
    console.log("Site Detail..." + this.props.siteCodeNbr);
    this.fetchSiteDetail(this.props.siteCodeNbr);
  }

  constructor() {
    super();
    this.state = {
      tabIndex: 0,
      site: {}
    };
  }

  fetchSiteDetail(siteCodeNbr) {
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/siteDetail${siteCodeNbr}.json`,
      success: data => {
        this.setState({ site: data.site });
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  }

  render() {
    console.log("render site detail...", this.state.site);
    return (
      <div>
        <button onClick={this.props.goBack}>Back to All sites</button>
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
            <EdiConfigsRootComponent siteCodeNbr={this.props.siteCodeNbr} />
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
