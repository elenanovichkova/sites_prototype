import React, { Component } from "react";
import SiteHeader from "./site_header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import siteDetailBERKLEYSIG from "./api/siteDetailBerkley";
import siteDetailEHSC from "./api/siteDetailEhsc";
import siteDetailNCLM from "./api/siteDetailNclm";
import siteDetailADELANTO from "./api/siteDetailAdelanto";
import siteDetailAMERICASINO from "./api/siteDetailAmericasino";

export default class SiteDetail extends Component {
  componentWillMount() {
    console.log("Site Detail..." + this.props.siteCodeNbr);
    this.fetchSiteDetail(this.props.siteCodeNbr);
  }

  constructor() {
    super();
    this.state = {
      site: {
        tabIndex: 0
      }
    };
  }

  fetchSiteDetail(siteCodeNbr) {
    var site;
    switch (siteCodeNbr) {
      case "BERKLEYSIG":
        this.setState({ site: siteDetailBERKLEYSIG.site });
        break;
      case "EHSC":
        this.setState({ site: siteDetailEHSC.site });
        break;
      case "NCLM":
        this.setState({ site: siteDetailNCLM.site });
        break;
      case "ADELANTO":
        this.setState({ site: siteDetailADELANTO.site });
        break;
      case "AMERICASINO":
        this.setState({ site: siteDetailAMERICASINO.site });
        break;
    }
    console.log();
    /*
    replace with this when put on server
    $.ajax({
      method: "GET",
      dataType: "json",
      mimeType: "application/json",
      url: `external/api/site${site.codenbr}.json`,
      success: data => {
        this.setState({ sites: data.sites });
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });*/
  }

  render() {
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
            <h2>EDI configs</h2>
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
