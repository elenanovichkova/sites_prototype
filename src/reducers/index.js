import { combineReducers } from "redux";
import SitesReducer from "./reducer_sites";
import ActiveSite from "./reducer_active_site";
import ConfigsReducer from "./reducer_configs";
import ActiveConfig from "./reducer_active_config";

const rootReducer = combineReducers({
  sites: SitesReducer,
  activeSite: ActiveSite,
  configs: ConfigsReducer,
  activeConfig: ActiveConfig
});

export default rootReducer;
