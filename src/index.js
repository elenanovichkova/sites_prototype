import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";

import SitesComponent from "./components/sites_component";
import reducers from "./reducers";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "left"
};

const createStoreWithMiddleWare = applyMiddleware(ReduxPromise)(createStore);

const App = () =>
  <Provider store={createStoreWithMiddleWare(reducers)}>
    <div style={styles}>
      <div className="container">
        <SitesComponent />
      </div>
    </div>
  </Provider>;

render(<App />, document.getElementById("root"));
