import { combineReducers } from "redux";
import _ from "lodash";
import { reducer as formReducer } from "redux-form";
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
    case types.SITE_NEW_VIEW:
      return "site-new";
    case types.SITE_DUPL_VIEW:
      return "site-duplicate";
    case types.SITE_GPARAMS_LIBRARY_VIEW:
      return "parameters-library";
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

const LOAD = "redux-form-examples/account/LOAD";

const defaultSiteTemplate = {
  data: {
    paramsX12: [{ px12_docrypt: "" }, { px12_dota1: "" }],
    params837: [
      { px12_allowtest: "" },
      { p837_lookupstlic: "" },
      { p837_pvdfld: "" },
      { p837_defssn: "" },
      { p837_dopaper: "" }
    ],
    paramsatt: [{ p837_imagedays: "15" }, { p837_attag: "" }, { p837_at: "" }],
    params999: [{ px12_do999: "" }],
    params277: [
      { px12_do277ca: "" },
      { patt_autorej277: "" },
      { patt_autorej: "15" },
      { patt_autowarn1: "5" },
      { patt_autowarn2: "15" },
      { patt_autowarn3: "" },
      { patt_autowarn4: "" },
      { p277_perbilling: "" },
      { p277_perpayer: "" },
      { p277_perdate: "" }
    ],
    params835: [
      { p835_ver: "" },
      { p835_perbilling: "" },
      { p835_perpayer: "" },
      { p835_perdate: "" },
      { p835_perclaimtype: "" },
      { p835_perpayee: "" },
      { p835_perzeropay: "" },
      { p835_billdcn: "" }
    ]
  }
};

const siteTemplateDataReducer = (state = defaultSiteTemplate, action) => {
  switch (action.type) {
    case types.SELECT_SITE_TEMPLATE:
      return {
        data: action.payload
      };
    case types.SITE_SELECTED:
      return {
        data: action.payload
      };
    case LOAD:
      return {
        data: action.data
      };
    default:
      return state;
  }
};

const formConfigReducer = (
  state = {
    isFetching: false,
    data: {}
  },
  action
) => {
  switch (action.type) {
    case types.REQUEST_FORM_CONFIG:
      return {
        ...state,
        isFetching: true
      };
    case types.RECEIVED_FORM_CONFIG:
      return {
        isFetching: false,
        data: action.payload
      };
    default:
      return state;
  }
};

const siteDuplicateDataReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_CONFIGS:
      return {
        configs: action.payload.data.data
      };
    default:
      return state;
  }
};

const siteProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVED_SITE_PROFILE:
      return {
        profile: action.payload
      };
    default:
      return state;
  }
};

//****************************** params library
const gParams = {
  fetching: false,
  error: "",
  data: []
};

const gFilteredParams = {
  fetching: false,
  data: []
};

const gParamsReducer = (state = gParams, action) => {
  switch (action.type) {
    case types.REQUEST_GPARAMS:
      return {
        ...state,
        error: "",
        fetching: true
      };
    case types.RECEIVED_GPARAMS:
      return {
        fetching: false,
        error: "",
        data: action.payload
      };
    case types.REQUEST_GPARAMS_FAIL:
      return {
        fetching: false,
        error: action.payload,
        data: []
      };
    default:
      return state;
  }
};

const gParamCategoryOptionsReducer = (
  state = [
    {
      id: "category0",
      value: "",
      descr: "SELECT"
    }
  ],
  action
) => {
  switch (action.type) {
    case types.RECEIVED_GPARAMS_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};

const gParamGroupOptionsReducer = (
  state = [
    {
      id: "group0",
      value: "",
      descr: "SELECT"
    }
  ],
  action
) => {
  switch (action.type) {
    case types.RECEIVED_GPARAMS_GROUP:
      return action.payload;
    default:
      return state;
  }
};

const gFilteredParamsReducer = (state = gFilteredParams, action) => {
  switch (action.type) {
    case types.RECEIVED_SITE_PROFILE:
      return {
        profile: action.payload
      };
    default:
      return state;
  }
};

const activeGParamReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SELECT_GPARAM:
      return action.payload;
    case types.DESELECT_GPARAM:
      return action.payload;
    default:
      return state;
  }
};

const isEditGParamModalOpenReducer = (state = false, action) => {
  switch (action.type) {
    case types.SHOW_EDITGPARAM_MODAL:
      return true;
    case types.HIDE_EDITGPARAM_MODAL:
      return false;
    default:
      return state;
  }
};

//********************* Site FTP */

const activeSiteJobsReducer = (state = [], action) => {
  switch (action.type) {
    case types.SITE_SELECTED:
      return [];
    case types.REQUEST_ACTIVESITE_JOBS:
      return [];
    case types.RECEIVED_ACTIVESITE_JOBS:
      return action.payload;
    default:
      return state;
  }
};

const defaultSiteFtpJobsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_DEFAULT_FTP_JOBS:
      return [];
    case types.RECEIVED_DEFAULT_FTP_JOBS:
      return action.payload;
    case types.REQUEST_DEFAULT_FTP_JOBS_FAIL:
      return [];
    default:
      return state;
  }
};

const defaultSiteFtpConfigReducer = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_DEFAULT_FTP_CONFIG:
      return [];
    case types.RECEIVED_DEFAULT_FTP_CONFIG:
      return action.payload;
    case types.REQUEST_DEFAULT_FTP_CONFIG_FAIL:
      return [];
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
  activeSiteTemplate: activeSiteTemplateReducer,
  siteTemplateData: siteTemplateDataReducer,
  siteDuplicateData: siteDuplicateDataReducer,
  form: formReducer,
  formConfig: formConfigReducer,
  siteProfile: siteProfileReducer,
  gParams: gParamsReducer,
  activeGParam: activeGParamReducer,
  gParamCategoryOptions: gParamCategoryOptionsReducer,
  gParamGroupOptions: gParamGroupOptionsReducer,
  gFilteredParams: gFilteredParamsReducer,
  isEditGParamModalOpen: isEditGParamModalOpenReducer,
  form: formReducer,
  activeSiteJobs: activeSiteJobsReducer,
  defaultSiteFtpJobs: defaultSiteFtpJobsReducer,
  defaultSiteFtpConfig: defaultSiteFtpConfigReducer
});

export default rootReducer;
