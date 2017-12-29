import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import thunk from "redux-thunk";
import { logger } from "redux-logger";

import SitesContainer from "./containers/sites-container";
import reducers from "./reducers";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "left"
};

const middleware = [thunk, ReduxPromise, logger];

const createStoreWithMiddleWare = applyMiddleware(...middleware)(createStore);

const App = () =>
  <Provider store={createStoreWithMiddleWare(reducers)}>
    <div style={styles}>
      <div className="container">
        <SitesContainer />
      </div>
    </div>
  </Provider>;

render(<App />, document.getElementById("root"));
