import { combineReducers } from "redux";
import _ from "lodash";
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
    case types.UPDATE_ACTIVE_CONFIG:
      return action.payload;
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

const activeParamReducer = (state = "", action) => {
  switch (action.type) {
    case types.CONFIG_EDIT_VIEW:
      return "";
    case types.PARAM_SELECTED:
      return action.payload;
    case types.GET_PARAM_INFO:
      return state;
    case types.UPDATE_ACTIVE_CONFIG:
      return state;
    default:
      return state;
  }
};

const activeParamDetailReducer = (state = { options: [] }, action) => {
  switch (action.type) {
    case types.OPEN_EDIT_PARAM_MODAL:
      return action.payload.data.paramformcontrol;
    case types.CLOSE_EDIT_PARAM_MODAL:
      return { options: [] };
    case types.UPDATE_ACTIVE_CONFIG:
      return { options: [] };
    default:
      return state;
  }
};

const editParamModalIsOpenReducer = (state = false, action) => {
  switch (action.type) {
    case types.OPEN_EDIT_PARAM_MODAL:
      return true;
    case types.CLOSE_EDIT_PARAM_MODAL:
      return false;
    case types.UPDATE_ACTIVE_CONFIG:
      return false;
    default:
      return state;
  }
};

const activeParamSelectedOptionReducer = (state = { param: {} }, action) => {
  switch (action.type) {
    case types.OPEN_EDIT_PARAM_MODAL:
      return _.find(action.payload.data.paramformcontrol.options, function(
        option
      ) {
        return option.selected;
      });
    case types.CHANGE_ACTIVE_PARAM_OPTION:
      return action.payload;
    case types.UPDATE_ACTIVE_CONFIG:
      return { param: {} };
    case types.CLOSE_EDIT_PARAM_MODAL:
      return { param: {} };
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
  activeConfig: activeConfigReducer,
  activeParam: activeParamReducer,
  activeParamDetail: activeParamDetailReducer,
  activeParamSelectedOption: activeParamSelectedOptionReducer,
  editParamModalIsOpen: editParamModalIsOpenReducer
});

export default rootReducer;
