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

const initialActiveConfig = {
  purpose: "",
  usage: "",
  receiverID: "",
  fldSep: "",
  paramsX12: [],
  params837: [],
  paramsatt: [],
  params999: [],
  params277: [],
  params835: [],
  params275: [],
  params997: [],
  params824: [],
  paramsUndefined: []
};

const activeConfigReducer = (
  state = {
    isFetching: false,
    data: initialActiveConfig
  },
  action
) => {
  switch (action.type) {
    case types.REQUEST_CONFIG_DETAIL:
      return {
        isFetching: true,
        data: initialActiveConfig
      };
    case types.RECEIVED_CONFIG_DETAIL:
      return {
        isFetching: false,
        data: action.payload.data.config
      };
    case types.UPDATE_ACTIVE_CONFIG:
      return {
        isFetching: false,
        data: action.payload.data
      };
    default:
      return state;
  }
};

const initialActiveConfigReducer = (
  state = {
    isFetching: false,
    data: initialActiveConfig
  },
  action
) => {
  switch (action.type) {
    case types.REQUEST_CONFIG_DETAIL:
      return {
        isFetching: true,
        data: initialActiveConfig
      };
    case types.RECEIVED_CONFIG_DETAIL:
      return {
        isFetching: false,
        data: action.payload.data.config
      };
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
    case types.SITE_TEMPLATES_VIEW:
      return "site-templates";
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
      //fix sorting for numeric options
      action.payload.data.paramformcontrol.options = _.sortBy(
        action.payload.data.paramformcontrol.options.map(option => {
          let value = !isNaN(option.val) ? parseInt(option.val) : option.val;
          option.val = value;
          return option;
        }),
        "val"
      );
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

const addParamModalIsOpenReducer = (state = false, action) => {
  switch (action.type) {
    case types.OPEN_ADD_PARAM_MODAL:
      return action.payload;
    case types.CLOSE_ADD_PARAM_MODAL:
      return action.payload;
    default:
      return state;
  }
};

const defaultAddParamListFilter = {
  groupName: "",
  formcontrolQuestion: "",
  paramTag: ""
};

const addParamListFilterReducer = (
  state = defaultAddParamListFilter,
  action
) => {
  switch (action.type) {
    case types.OPEN_ADD_PARAM_MODAL:
      return defaultAddParamListFilter;
    case types.CLOSE_ADD_PARAM_MODAL:
      return defaultAddParamListFilter;
    case types.ADD_PARAM_MODAL_FILTER_CHANGED:
      return action.payload;
    default:
      return state;
  }
};

const paramListReducer = (state = [], action) => {
  switch (action.type) {
    case types.REQUEST_PARAMS:
      return [];
    case types.RECEIVE_PARAMS:
      return action.payload;
    default:
      return state;
  }
};

const filteredParamListReducer = (state = [], action) => {
  switch (action.type) {
    case types.REQUEST_PARAMS:
      return [];
    case types.RECEIVE_PARAMS:
      return action.payload;
    case types.UPDATE_PARAMS:
      return action.payload;
    default:
      return state;
  }
};

const addParamFormControlReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADDPARAM_FORMCONTROL_SELECTED:
      return action.payload;
    case types.ADDPARAM_SET_VALUE:
      return action.payload;
    case types.CLOSE_ADD_PARAM_MODAL:
      return {};
    default:
      return state;
  }
};

const confirmationModalDataReducer = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case types.OPEN_CONFIRMATION_MODAL:
      return action.payload;
    case types.CLOSE_CONFIRMATION_MODAL:
      return action.payload;
    default:
      return state;
  }
};

const isNewConfigModalOpenReducer = (state = false, action) => {
  switch (action.type) {
    case types.OPEN_NEWCONFIG_MODAL:
      return action.payload;
    case types.CLOSE_NEWCONFIG_MODAL:
      return action.payload;
    default:
      return state;
  }
};

const initialNewConfig = {
  isSubmitting: false,
  message: "",
  siteId: "",
  receiverId: "",
  purpose: "",
  usage: ""
};

const newConfigReducer = (
  state = {
    isSubmitting: false,
    message: "",
    siteId: "",
    receiverId: "",
    purpose: "",
    usage: ""
  },
  action
) => {
  switch (action.type) {
    case types.OPEN_NEWCONFIG_MODAL:
      return initialNewConfig;
    case types.UPDATE_NEWCONFIG_RECEIVERID:
      return { ...state, message: "", receiverId: action.payload };
    case types.UPDATE_NEWCONFIG_PURPOSE:
      return { ...state, message: "", purpose: action.payload };
    case types.UPDATE_NEWCONFIG_USAGE:
      return { ...state, message: "", usage: action.payload };
    case types.SUBMIT_NEWCONFIG:
      return { ...state, message: "", isSubmitting: true };
    case types.SUBMIT_NEWCONFIG_FAILED:
      return { ...state, isSubmitting: false, message: action.payload };
    case types.NEWCONFIG_CREATED:
      return {
        ...state,
        message: "successfully created new config",
        isSubmitting: false
      };
    default:
      return state;
  }
};

//**************************************************************

const isDuplConfigModalOpenReducer = (state = false, action) => {
  switch (action.type) {
    case types.OPEN_DUPLCONFIG_MODAL:
      return action.payload;
    case types.CLOSE_DUPLCONFIG_MODAL:
      return action.payload;
    default:
      return state;
  }
};

const configToDuplicateReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CONFIG_DUPLICATE:
      return action.payload;
    case types.CLOSE_DUPLCONFIG_MODAL:
      return {};
    default:
      return state;
  }
};

const initialDuplConfig = {
  isSubmitting: false,
  message: "",
  siteId: "",
  receiverId: "",
  purpose: "",
  usage: ""
};

const duplConfigReducer = (
  state = {
    isSubmitting: false,
    message: "",
    siteId: "",
    receiverId: "",
    purpose: "",
    usage: ""
  },
  action
) => {
  switch (action.type) {
    case types.OPEN_DUPLCONFIG_MODAL:
      return initialNewConfig;
    case types.UPDATE_DUPLCONFIG_RECEIVERID:
      return { ...state, message: "", receiverId: action.payload };
    case types.UPDATE_DUPLCONFIG_PURPOSE:
      return { ...state, message: "", purpose: action.payload };
    case types.UPDATE_DUPLCONFIG_USAGE:
      return { ...state, message: "", usage: action.payload };
    case types.SUBMIT_DUPLCONFIG:
      return { ...state, message: "", isSubmitting: true };
    case types.SUBMIT_DUPLCONFIG_FAILED:
      return { ...state, isSubmitting: false, message: action.payload };
    case types.DUPLCONFIG_CREATED:
      return {
        ...state,
        message: "successfully duplicate new config",
        isSubmitting: false
      };
    default:
      return state;
  }
};

//************************ Site Log

const defaultSiteLog = {
  isFetching: false,
  message: "",
  data: []
};

const siteLogReducer = (state = defaultSiteLog, action) => {
  switch (action.type) {
    case types.REQUEST_SITE_LOG:
      return { ...state, isFetching: true };
    case types.RECEIVED_SITE_LOG:
      return {
        isFetching: false,
        message: "",
        data: action.payload
      };
    case types.REQUEST_SITE_LOG_FAIL:
      return {
        ...state,
        isFetching: false,
        message: action.payload
      };
    default:
      return state;
  }
};

//***************************************** Site templates
const defaultSiteTemplateList = {
  isFetching: false,
  message: "",
  data: []
};

const siteTemplateListReducer = (state = defaultSiteTemplateList, action) => {
  switch (action.type) {
    case types.REQUEST_SITE_TEMPLATES:
      return { ...state, isFetching: true };
    case types.RECEIVED_SITE_TEMPLATES:
      return {
        isFetching: false,
        message: "",
        data: action.payload
      };
    case types.REQUEST_SITE_TEMPLATES_FAIL:
      return {
        ...state,
        isFetching: false,
        message: action.payload
      };
    default:
      return state;
  }
};

const activeSiteTemplateReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SELECT_SITE_TEMPLATE:
      return action.payload;
    case types.DESELECT_SITE_TEMPLATE:
      return {};
    default:
      return state;
  }
};

//************************** Site filter
const defaultFilter = {
  siteId: "",
  siteName: "",
  taxId: "",
  receiverId: ""
};

const sitesFilterReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FILTER_SITEID_CHANGED:
      return { ...state, siteId: action.payload };
    case types.FILTER_SITENAME_CHANGED:
      return { ...state, siteName: action.payload };
    case types.FILTER_SITETAXID_CHANGED:
      return { ...state, taxId: action.payload };
    case types.FILTER_SITERECEIVERID_CHANGED:
      return { ...state, receiverId: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  siteView: siteViewReducer,
  sitesFilter: sitesFilterReducer,
  configView: configViewReducer,
  siteList: siteListReducer,
  activeSite: activeSiteReducer,
  configList: configListReducer,
  initialActiveConfig: initialActiveConfigReducer,
  activeConfig: activeConfigReducer,
  activeParam: activeParamReducer,
  activeParamDetail: activeParamDetailReducer,
  activeParamSelectedOption: activeParamSelectedOptionReducer,
  editParamModalIsOpen: editParamModalIsOpenReducer,
  addParamModalIsOpen: addParamModalIsOpenReducer,
  addParamListFilter: addParamListFilterReducer,
  paramList: paramListReducer,
  filteredParamList: filteredParamListReducer,
  addParamFormControl: addParamFormControlReducer,
  confirmationModalData: confirmationModalDataReducer,
  isNewConfigModalOpen: isNewConfigModalOpenReducer,
  newConfig: newConfigReducer,
  isDuplConfigModalOpen: isDuplConfigModalOpenReducer,
  duplConfig: duplConfigReducer,
  configToDuplicate: configToDuplicateReducer,
  siteLog: siteLogReducer,
  siteTemplateList: siteTemplateListReducer,
  activeSiteTemplate: activeSiteTemplateReducer
});

export default rootReducer;
