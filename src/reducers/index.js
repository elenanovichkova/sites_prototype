import { combineReducers } from "redux";
import SitesReducer from "./reducer_sites";
import ActiveSite from "./reducer_active_site";

const rootReducer = combineReducers({
  sites: SitesReducer,
  activeSite: ActiveSite
});

export default rootReducer;
