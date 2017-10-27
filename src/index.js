import React from "react";
import { render } from "react-dom";
import SitesRootComponent from "./sites_root_component";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "left"
};

const App = () =>
  <div style={styles}>
    <SitesRootComponent />
  </div>;

render(<App />, document.getElementById("root"));
