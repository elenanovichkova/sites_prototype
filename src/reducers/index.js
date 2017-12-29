import { combineReducers } from "redux";
import * as types from "../actions/action-types";

/*const INITIAL_STATE = {
  fileName: '',
  imageName: '',
  startDate,
  endDate,
  batches: [],
  view: 'all',
  loading: false,
};*/

const siteListReducer = (
  state = { isFetching: false, isInit: false, data: [] },
  action
) => {
  switch (action.type) {
    case types.RECEIVE_SITES:
      return {
        isFetching: false,
        isInit: true,
        data: action.payload.data.data
      };
    case types.REQUEST_SITES:
      return {
        isFetching: true,
        isInit: true,
        data: []
      };
    default:
      return state;
  }
};

const activeSiteReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SITE_SELECTED:
      return action.payload.data.site;
    case types.SITE_LIST_VIEW:
      return {};
    default:
      return state;
  }
};

const configListReducer = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_CONFIGS:
      return action.payload.data.data;
    default:
      return state;
  }
};

const activeConfigReducer = (state = { params: [] }, action) => {
  switch (action.type) {
    case types.CONFIG_VIEW:
      return action.payload.data.config;
    case types.CONFIG_EDIT:
      return action.payload.data.config;
    case types.CONFIG_DELETE:
      return action.payload.data.config;
    case types.CONFIG_DUPLICATE:
      return action.payload.data.config;
    case types.CONFIG_LIST_VIEW:
      return { params: [] };
    case types.SITE_SELECTED:
      return { params: [] };
    default:
      return state;
  }
};

const siteViewReducer = (state = "site-list", action) => {
  switch (action.type) {
    case types.SITE_DETAIL_VIEW:
      return "site-detail";
    case types.SITE_LIST_VIEW:
      return "site-list";
    default:
      return state;
  }
};

const configViewReducer = (state = "config-list", action) => {
  switch (action.type) {
    case types.CONFIG_DETAIL_VIEW:
      return "config-detail";
    case types.CONFIG_LIST_VIEW:
      return "config-list";
    case types.CONFIG_EDIT_VIEW:
      return "config-edit";
    case types.SITE_SELECTED:
      return "config-list";
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  siteView: siteViewReducer,
  configView: configViewReducer,
  siteList: siteListReducer,
  activeSite: activeSiteReducer,
  configList: configListReducer,
  activeConfig: activeConfigReducer
});

export default rootReducer;
