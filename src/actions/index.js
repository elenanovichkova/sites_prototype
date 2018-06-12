import axios from "axios";
import _ from "lodash";
import * as types from "./action-types";
import { SubmissionError } from "redux-form";

const ROOT_URL = "external/api";

//********************** sites filter

export function filterSiteIdChanged(siteId) {
  return {
    type: types.FILTER_SITEID_CHANGED,
    payload: siteId
  };
}
export function filterSiteNameChanged(siteName) {
  return {
    type: types.FILTER_SITENAME_CHANGED,
    payload: siteName
  };
}
export function filterSiteTaxIdChanged(taxId) {
  return {
    type: types.FILTER_SITETAXID_CHANGED,
    payload: taxId
  };
}
export function filterSiteReceiverIdChanged(receiverId) {
  return {
    type: types.FILTER_SITERECEIVERID_CHANGED,
    payload: receiverId
  };
}

//************************* sites view

export function changeSitesView(view) {
  //action creator, it needs to return an action, an object with a type property
  switch (view) {
    case "site-detail":
      return {
        type: types.SITE_DETAIL_VIEW
      };
    case "site-list":
      return {
        type: types.SITE_LIST_VIEW
      };
    case "site-templates":
      return {
        type: types.SITE_TEMPLATES_VIEW
      };
    case "site-new":
      return {
        type: types.SITE_NEW_VIEW
      };
    case "site-duplicate":
      return {
        type: types.SITE_DUPL_VIEW
      };
    case "parameters-library":
      return {
        type: types.SITE_GPARAMS_LIBRARY_VIEW
      };
  }
}

export function changeConfigsView(view) {
  //action creator, it needs to return an action, an object with a type property
  switch (view) {
    case "config-detail":
      return {
        type: types.CONFIG_DETAIL_VIEW
      };
    case "config-list":
      return {
        type: types.CONFIG_LIST_VIEW
      };
    case "config-edit":
      return {
        type: types.CONFIG_EDIT_VIEW
      };
  }
}

export function selectSite(site) {
  let url = `${ROOT_URL}/siteDetail${site.siteId}.json`;
  let request = axios.get(url);
  //action creator, it needs to return an action, an object with a type property
  return {
    type: types.SITE_SELECTED,
    payload: request
  };
}

export function fetchSites(siteName, siteId, siteTaxId, siteReceiverId) {
  let url = encodeURI(`${ROOT_URL}/sites.json`);
  return function(dispatch) {
    dispatch({ type: types.REQUEST_SITES });
    axios.get(url).then(response => {
      dispatch({
        type: types.RECEIVE_SITES,
        payload: response
      });
    });
  };
}

export function getConfigDetail(config, callback) {
  let url = `${ROOT_URL}/edicntlJSIADELANTOEBIL.json`;
  return function(dispatch) {
    dispatch({ type: types.REQUEST_CONFIG_DETAIL });
    axios.get(url).then(response => {
      dispatch({
        type: types.RECEIVED_CONFIG_DETAIL,
        payload: response
      });
      callback();
    });
  };
}

export function duplicateConfig(config) {
  return {
    type: types.CONFIG_DUPLICATE,
    payload: config
  };
}

export function newConfig(config) {
  let url = `${ROOT_URL}&param.rtype=getConfig&param.config=${config.oid}`;
  let request = axios.get(url);
  return {
    type: types.CONFIG_NEW,
    payload: request
  };
}

export function fetchConfigs(siteId) {
  let url = `${ROOT_URL}/configsADELANTO.json`;
  let request = axios.get(url);
  return {
    type: types.FETCH_CONFIGS,
    payload: request
  };
}

export function selectParam(param) {
  //action creator, it needs to return an action, an object with a type property
  return {
    type: types.PARAM_SELECTED,
    payload: param
  };
}

export function getParamDetail(param) {
  let url = `${ROOT_URL}/paramDetail.json`;
  let request = axios.get(url);
  //action creator, it needs to return an action, an object with a type property
  return {
    type: types.GET_PARAM_INFO,
    payload: request
  };
}

export function openEditParamModal(param) {
  //action creator, it needs to return an action, an object with a type property
  let url = `${ROOT_URL}/paramDetail.json`;
  let request = axios.get(url);
  return {
    type: types.OPEN_EDIT_PARAM_MODAL,
    payload: request
  };
}

export function closeEditParamModal() {
  //action creator, it needs to return an action, an object with a type property
  return {
    type: types.CLOSE_EDIT_PARAM_MODAL,
    payload: ""
  };
}

export function openAddParamModal() {
  //action creator, it needs to return an action, an object with a type property
  return {
    type: types.OPEN_ADD_PARAM_MODAL,
    payload: true
  };
}

export function closeAddParamModal() {
  //action creator, it needs to return an action, an object with a type property
  return {
    type: types.CLOSE_ADD_PARAM_MODAL,
    payload: false
  };
}

function fixOptionSoting(config) {
  config.data.map(formgroup => {
    formgroup.formcontrols.map(formcontrol => {
      formcontrol.options = _.sortBy(
        formcontrol.options.map(option => {
          let value = !isNaN(option.val) ? parseInt(option.val) : option.val;
          option.val = value;
          return option;
        }),
        "val"
      );
      return formcontrol;
    });
    return formgroup;
  });
  return config;
}

function filterCurrentParams(currConfig, config) {
  config.data.map(formgroup => {
    formgroup.formcontrols = formgroup.formcontrols.filter(formcontrol => {
      let isCurrent = false;
      currConfig.data.paramsX12.map(param => {
        if (param.formcontrolName == formcontrol.name) {
          isCurrent = true;
        }
        return param;
      });
      currConfig.data.params837.map(param => {
        if (param.formcontrolName == formcontrol.name) {
          isCurrent = true;
        }
        return param;
      });
      currConfig.data.paramsatt.map(param => {
        if (param.formcontrolName == formcontrol.name) {
          isCurrent = true;
        }
        return param;
      });
      currConfig.data.params999.map(param => {
        if (param.formcontrolName == formcontrol.name) {
          isCurrent = true;
        }
        return param;
      });
      currConfig.data.params277.map(param => {
        if (param.formcontrolName == formcontrol.name) {
          isCurrent = true;
        }
        return param;
      });
      currConfig.data.params275.map(param => {
        if (param.formcontrolName == formcontrol.name) {
          isCurrent = true;
        }
        return param;
      });
      currConfig.data.params824.map(param => {
        if (param.formcontrolName == formcontrol.name) {
          isCurrent = true;
        }
        return param;
      });
      currConfig.data.params997.map(param => {
        if (param.formcontrolName == formcontrol.name) {
          isCurrent = true;
        }
        return param;
      });
      currConfig.data.paramsUndefined.map(param => {
        if (param.formcontrolName == formcontrol.name) {
          isCurrent = true;
        }
        return param;
      });
      return !isCurrent;
    });
    return formgroup;
  });
  return config;
}

export function fetchParams(config, callback) {
  //action creator, it needs to return an action, an object with a type property
  callback();
  let url = `${ROOT_URL}/params.json`;
  return function(dispatch) {
    dispatch({ type: types.REQUEST_PARAMS });
    axios.get(url).then(response => {
      response.data = fixOptionSoting(response.data);
      response.data = filterCurrentParams(config, response.data);
      dispatch({
        type: types.RECEIVE_PARAMS,
        payload: response.data.data
      });
    });
  };
}

export function updateAddParamsListFilter(filter, paramList) {
  //action creator, it needs to return an action, an object with a type property
  let paramListClone = _.cloneDeep(paramList);
  return function(dispatch) {
    dispatch({
      type: types.ADD_PARAM_MODAL_FILTER_CHANGED,
      payload: filter
    });
    if (filter.groupName || filter.formcontrolQuestion || filter.paramTag) {
      let filteredParamList = paramListClone.filter(formgroup => {
        if (filter.groupName == "" || filter.groupName == formgroup.name) {
          formgroup.formcontrols = formgroup.formcontrols.filter(
            formcontrol => {
              let isLabelMatch = false;
              if (
                filter.formcontrolQuestion == "" ||
                formcontrol.label
                  .toLowerCase()
                  .includes(filter.formcontrolQuestion.toLowerCase())
              ) {
                isLabelMatch = true;
              }
              let isParamTagMatch = false;
              if (
                filter.paramTag == "" ||
                formcontrol.options[0].param.tag
                  .toLowerCase()
                  .includes(filter.paramTag.toLowerCase())
              ) {
                isParamTagMatch = true;
              }
              if (isLabelMatch && isParamTagMatch) {
                return true;
              } else {
                return false;
              }
            }
          );
          if (formgroup.formcontrols.length > 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
      dispatch({
        type: types.UPDATE_PARAMS,
        payload: filteredParamList
      });
    } else {
      dispatch({
        type: types.UPDATE_PARAMS,
        payload: paramListClone
      });
    }
  };
}

export function changeActiveParamOption(option) {
  //action creator, it needs to return an action, an object with a type property
  return {
    type: types.CHANGE_ACTIVE_PARAM_OPTION,
    payload: option
  };
}

export function updateActiveConfig(
  initialActiveConfig,
  activeConfig,
  paramToUpdate,
  paramToAdd
) {
  //action creator, it needs to return an action, an object with a type property
  let activeConfigClone = _.cloneDeep(activeConfig);

  //get group name param belongs to
  let paramsGroupName = `params${paramToAdd.formgroupName}`;
  //try to find position of param in current configuration
  var index = activeConfigClone.data[paramsGroupName].findIndex(
    param => param.tag == paramToAdd.tag
  );

  //try to find posision of param in initial configuration
  var initialIndex = initialActiveConfig.data[paramsGroupName].findIndex(
    param => param.tag == paramToAdd.tag
  );
  /*
  console.log("************** index in current configuration", index);
  console.log("************** param to add value", paramToAdd.value);
  console.log("************** index in initial configuration", initialIndex);
  console.log("************** param to update value", paramToUpdate.value);
  */
  //if initial index equals -1 it means the param does not exist in initial configuration
  if (initialIndex === -1 && index === -1) {
    //param was not found either in initial and in active config, then push in active config and set status as new
    paramToAdd.isNew = true;
    activeConfigClone.data[paramsGroupName].push(paramToAdd);
  } else if (initialIndex === -1 && index !== -1) {
    //param was not found in initial, but exists in active config, then update param value, but status is still new
    paramToAdd.isNew = true;
    if (
      activeConfigClone.data[paramsGroupName][index].value != paramToAdd.vale
    ) {
      //update active config param if value is different
      activeConfigClone.data[paramsGroupName].splice(index, 1, paramToAdd);
    }
  } else if (initialIndex !== -1 && index === -1) {
    //param exists in initial config, but not found in active config, then push param in active config
    activeConfigClone.data[paramsGroupName].push(paramToAdd);
    if (
      initialActiveConfig.data[paramsGroupName][initialIndex].value !==
      paramToAdd.value
    ) {
      //value is not the same as in initial config then set status isChanged as true
      paramToAdd.isChanged = true;
    } else {
      // value is the same as in initial config then set status isChanged as false
      paramToAdd.isChanged = false;
    }
  } else if (initialIndex !== -1 && index !== -1) {
    //param exists in initial config and exist in active config
    if (
      initialActiveConfig.data[paramsGroupName][initialIndex].value !==
      paramToAdd.value
    ) {
      //value is not the same as in initial config then set status isChanged as true
      paramToAdd.isChanged = true;
    } else {
      // value is the same as in initial config then set status isChanged as false
      paramToAdd.isChanged = false;
    }
    activeConfigClone.data[paramsGroupName].splice(index, 1, paramToAdd);
  }

  return {
    type: types.UPDATE_ACTIVE_CONFIG,
    payload: activeConfigClone
  };
}

export function changeActiveConfigReceiverId(receiverId, activeConfig) {
  //action creator, it needs to return an action, an object with a type property
  activeConfig.data.receiverID = receiverId;
  return {
    type: types.UPDATE_ACTIVE_CONFIG,
    payload: activeConfig
  };
}

export function changeActiveConfigUsage(usage, activeConfig) {
  //action creator, it needs to return an action, an object with a type property
  activeConfig.data.usage = usage;
  return {
    type: types.UPDATE_ACTIVE_CONFIG,
    payload: activeConfig
  };
}

export function changeActiveConfigPurpose(purpose, activeConfig) {
  //action creator, it needs to return an action, an object with a type property
  activeConfig.data.purpose = purpose;
  return {
    type: types.UPDATE_ACTIVE_CONFIG,
    payload: activeConfig
  };
}

export function changeActiveConfigFldSep(fldSep, activeConfig) {
  //action creator, it needs to return an action, an object with a type property
  activeConfig.data.fldSep = fldSep;
  return {
    type: types.UPDATE_ACTIVE_CONFIG,
    payload: activeConfig
  };
}

export function updateConfig(config, callback) {
  //action creator, it needs to return an action, an object with a type property
  console.log(config);
  let url = `${ROOT_URL}/edicntlJSIADELANTOEBIL.json`;
  return function(dispatch) {
    axios.get(url).then(response => {
      dispatch({ type: types.CONFIG_LIST_VIEW });
      callback();
    });
  };
}

export function selectAddParamFormControl(formcontrol) {
  //action creator, it needs to return an action, an object with a type property
  let formControlClone = _.cloneDeep(formcontrol);
  return {
    type: types.ADDPARAM_FORMCONTROL_SELECTED,
    payload: formControlClone
  };
}

export function addParamFormControlSetValue(value, formcontrol) {
  //action creator, it needs to return an action, an object with a type property
  value = !isNaN(value) ? parseInt(value) : value;
  let selectedFormControlOption = _.find(formcontrol.options, {
    val: value
  });
  if (selectedFormControlOption) {
    formcontrol.selectedOptionValue = selectedFormControlOption.val;
    formcontrol.selectedParamValue = selectedFormControlOption.param.value;
  } else {
    formcontrol.selectedOptionValue = "";
    formcontrol.selectedParamValue = "";
  }
  let formControlClone = _.cloneDeep(formcontrol);
  return {
    type: types.ADDPARAM_SET_VALUE,
    payload: formControlClone
  };
}

export function deleteParam(initialActiveConfig, activeConfig, paramToRemove) {
  //action creator, it needs to return an action, an object with a type property
  let activeConfigClone = _.cloneDeep(activeConfig);

  //get group name param belongs to
  let paramsGroupName = `params${paramToRemove.formgroupName}`;
  //try to find position of param in current configuration
  var index = activeConfigClone.data[paramsGroupName].findIndex(
    param => param.tag == paramToRemove.tag
  );

  //try to find posision of param in initial configuration
  var initialIndex = initialActiveConfig.data[paramsGroupName].findIndex(
    param => param.tag == paramToRemove.tag
  );

  //if initial index equals -1 it means the param does not exist in initial configuration
  if (initialIndex === -1 && index === -1) {
    //param was not found either in initial and in active config, then do nothing
  } else if (initialIndex === -1 && index !== -1) {
    //param was not found in initial, but exists in active config, then just delete from active config
    activeConfigClone.data[paramsGroupName].splice(index, 1);
  } else if (initialIndex !== -1 && index === -1) {
    //param exists in initial config, but not found in active config, then push param in active config
  } else if (initialIndex !== -1 && index !== -1) {
    //param exists in initial config and exist in active config
    activeConfigClone.data[paramsGroupName][index].isDeleted = true;
  }

  return {
    type: types.UPDATE_ACTIVE_CONFIG,
    payload: activeConfigClone
  };
}

export function openConfirmationModal(text, callback) {
  //action creator, it needs to return an action, an object with a type property
  let confirmationModalData = {
    isOpen: true,
    text: text,
    callback: callback
  };
  return {
    type: types.OPEN_CONFIRMATION_MODAL,
    payload: confirmationModalData
  };
}

export function closeConfirmationModal() {
  //action creator, it needs to return an action, an object with a type property
  let confirmationModalData = {
    isOpen: false,
    text: "",
    callback: null
  };
  return {
    type: types.CLOSE_CONFIRMATION_MODAL,
    payload: confirmationModalData
  };
}

export function openNewConfigModal() {
  return {
    type: types.OPEN_NEWCONFIG_MODAL,
    payload: true
  };
}

export function closeNewConfigModal() {
  return {
    type: types.CLOSE_NEWCONFIG_MODAL,
    payload: false
  };
}
export function updateNewConfigReceiverId(value) {
  value = value.replace(/\s/g, "");
  return {
    type: types.UPDATE_NEWCONFIG_RECEIVERID,
    payload: value
  };
}
export function updateNewConfigPurpose(value) {
  return {
    type: types.UPDATE_NEWCONFIG_PURPOSE,
    payload: value
  };
}
export function updateNewConfigUsage(value) {
  return {
    type: types.UPDATE_NEWCONFIG_USAGE,
    payload: value
  };
}
export function createNewConfig(siteCodeNbr, receiverId, purpose, usage) {
  if (receiverId === "" || purpose === "" || usage === "") {
    return {
      type: types.SUBMIT_NEWCONFIG_FAILED,
      payload: "All fields are required"
    };
  }
  if (!/^[a-zA-Z0-9 _.'&",#@-]{3,64}$/.test(receiverId)) {
    return {
      type: types.SUBMIT_NEWCONFIG_FAILED,
      payload: "receiver id is not valid"
    };
  }

  return function(dispatch) {
    dispatch({ type: types.SUBMIT_NEWCONFIG });

    dispatch({
      type: types.CLOSE_NEWCONFIG_MODAL,
      payload: false
    });
    dispatch({
      type: types.NEWCONFIG_CREATED
    });
  };
}

//*********************************************************

export function openDuplConfigModal() {
  return {
    type: types.OPEN_DUPLCONFIG_MODAL,
    payload: true
  };
}

export function closeDuplConfigModal() {
  return {
    type: types.CLOSE_DUPLCONFIG_MODAL,
    payload: false
  };
}
export function updateDuplConfigReceiverId(value) {
  value = value.replace(/\s/g, "");
  return {
    type: types.UPDATE_DUPLCONFIG_RECEIVERID,
    payload: value
  };
}
export function updateDuplConfigPurpose(value) {
  return {
    type: types.UPDATE_DUPLCONFIG_PURPOSE,
    payload: value
  };
}
export function updateDuplConfigUsage(value) {
  return {
    type: types.UPDATE_DUPLCONFIG_USAGE,
    payload: value
  };
}
export function createDuplConfig(
  siteCodeNbr,
  receiverId,
  purpose,
  usage,
  edicntl
) {
  if (receiverId === "" || purpose === "" || usage === "") {
    return {
      type: types.SUBMIT_DUPLCONFIG_FAILED,
      payload: "All fields are required"
    };
  }
  if (!/^[a-zA-Z0-9 _.'&",#@-]{3,64}$/.test(receiverId)) {
    return {
      type: types.SUBMIT_DUPLCONFIG_FAILED,
      payload: "receiver id is not valid"
    };
  }

  return function(dispatch) {
    dispatch({ type: types.SUBMIT_DUPLCONFIG });

    dispatch({
      type: types.CLOSE_DUPLCONFIG_MODAL,
      payload: false
    });
    dispatch({
      type: types.DUPLCONFIG_CREATED
    });
  };
}

//***************************************************************

export function deleteConfig(config) {
  return function(dispatch) {
    dispatch({ type: types.SUBMIT_DELETE_CONFIG });
    dispatch({ type: types.CONFIG_DELETED });
    let confirmationModalData = {
      isOpen: false,
      text: "",
      callback: null
    };
    dispatch({
      type: types.CLOSE_CONFIRMATION_MODAL,
      payload: confirmationModalData
    });
  };
}

//*************************************** Site log

export function fetchSiteLog(activeSite) {
  let url = `${ROOT_URL}/site-log.json`;
  return function(dispatch) {
    dispatch({ type: types.REQUEST_SITE_LOG });
    axios.get(url).then(response => {
      if (response.data.status.result) {
        dispatch({
          type: types.RECEIVED_SITE_LOG,
          payload: response.data.data
        });
      } else {
        dispatch({
          type: types.REQUEST_SITE_LOG_FAIL,
          payload: response
        });
      }
    });
  };
}

//************************************** Site getSiteTemplates

export function getSiteTemplates() {
  let url = `external/api/site-templates.json`;
  return function(dispatch) {
    dispatch({ type: types.REQUEST_SITE_TEMPLATES });
    axios.get(url).then(response => {
      if (response.data.status.result) {
        dispatch({
          type: types.RECEIVED_SITE_TEMPLATES,
          payload: response.data.data
        });
      } else {
        dispatch({
          type: types.REQUEST_SITE_TEMPLATES_FAIL,
          payload: response
        });
      }
    });
  };
}

export function selectSiteTemplate(template) {
  let url = `external/api/${template.name}-site-template.json`;
  return function(dispatch) {
    dispatch({ type: types.REQUEST_SITE_TEMPLATE });
    axios.get(url).then(response => {
      if (response.data.status.result) {
        dispatch({
          type: types.SELECT_SITE_TEMPLATE,
          payload: response.data.data
        });
      } else {
        dispatch({
          type: types.REQUEST_SITE_TEMPLATE_FAIL,
          payload: response
        });
      }
    });
  };
}

export function deselectSiteTemplate() {
  return {
    type: types.DESELECT_SITE_TEMPLATE,
    payload: {}
  };
}

//******************************** Form CONFIG

export function getFormConfig() {
  let url = `external/api/formConfig.json`;
  return function(dispatch) {
    dispatch({ type: types.REQUEST_FORM_CONFIG });
    axios.get(url).then(response => {
      if (response.data.status.result) {
        dispatch({
          type: types.RECEIVED_FORM_CONFIG,
          payload: _.keyBy(response.data.data, "name")
        });
      } else {
        dispatch({
          type: types.REQUEST_FORM_CONFIG_FAIL,
          payload: response
        });
      }
    });
  };
}

const LOAD = "redux-form-examples/account/LOAD";
export const load = data => ({ type: LOAD, data });

//******************************* asyncValidateNewSite

export function asyncValidateNewSite(values, dispatch, props, blurredField) {
  //["receiverName", "receiverTaxId", "siteId", "receiverId"]
  let url = `external/api/invalid-taxid.json`;

  return axios.get(url).then(response => {
    console.log("response", response);
    let errors = {};
    if (response && response.data && response.data.status.result) {
      response.data.data.map(error => (errors[error.name] = error.descr));
      throw errors;
    }
  });
}

//************************************* New SITE
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export function submitNewSite(values) {
  //console.log("######################### submitting new site", values);
  return function(dispatch) {
    sleep(1000).then(() => {
      {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%", types.SITE_DETAIL_VIEW);
        dispatch({ type: types.SITE_DETAIL_VIEW });
      }
    });
  };
}

export function submitNewDuplSite(values) {
  console.log("######################### submitting new site", values);
  return sleep(1000).then(() => {
    if (values.password !== "redux-form") {
      throw new SubmissionError({
        _error: "Login failed!"
      });
    } else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    }
  });
}

//*************************************** Site Profile

export function getSiteProfile(activeSite) {
  let url = `external/api/site-profile.json`;
  return function(dispatch) {
    dispatch({ type: types.REQUEST_SITE_PROFILE });
    axios.get(url).then(response => {
      if (response.data.status.result) {
        dispatch({
          type: types.RECEIVED_SITE_PROFILE,
          payload: response.data.profile
        });
      } else {
        dispatch({
          type: types.REQUEST_SITE_PROFILE_FAIL,
          payload: response
        });
      }
    });
  };
}

export function updateSiteProfile(activeSite) {
  let url = `${ROOT_URL}&param.rtype=getSiteProfile&param.id=${activeSite.codenbr}`;
  return function(dispatch) {
    dispatch({ type: types.REQUEST_SITE_PROFILE });
    axios.get(url).then(response => {
      if (response.data.status.result) {
        dispatch({
          type: types.RECEIVED_SITE_PROFILE,
          payload: response.data.data
        });
      } else {
        dispatch({
          type: types.REQUEST_SITE_PROFILE_FAIL,
          payload: response
        });
      }
    });
  };
}

//*******************************  manage param library

export function fetchGParams() {
  let url = "external/api/gparams.json";
  return function(dispatch) {
    dispatch({ type: types.REQUEST_GPARAMS });
    axios.get(url).then(response => {
      if (response.data.status.result) {
        dispatch({
          type: types.RECEIVED_GPARAMS,
          payload: response.data.data
        });
      } else {
        dispatch({
          type: types.REQUEST_GPARAMS_FAIL,
          payload: response
        });
      }
    });
  };
}

export function fetchGParamsCategory() {
  let url = "external/api/gparamsCategories.json";
  return function(dispatch) {
    dispatch({ type: types.REQUEST_GPARAMS_CATEGORY });
    axios.get(url).then(response => {
      console.log("########## categories response", response);
      if (response.data.status.result) {
        dispatch({
          type: types.RECEIVED_GPARAMS_CATEGORY,
          payload: response.data.data
        });
      } else {
        dispatch({
          type: types.REQUEST_GPARAMS_CATEGORY_FAIL,
          payload: response
        });
      }
    });
  };
}

export function fetchGParamsGroup() {
  let url = "external/api/gparamsGroups.json";
  return function(dispatch) {
    dispatch({ type: types.REQUEST_GPARAMS_GROUP });
    axios.get(url).then(response => {
      if (response.data.status.result) {
        dispatch({
          type: types.RECEIVED_GPARAMS_GROUP,
          payload: response.data.data
        });
      } else {
        dispatch({
          type: types.REQUEST_GPARAMS_GROUP_FAIL,
          payload: response
        });
      }
    });
  };
}

export function selectGParam(param) {
  return function(dispatch) {
    dispatch({ type: types.SELECT_GPARAM, payload: param });
  };
}

export function deselectGParam(param) {
  return function(dispatch) {
    dispatch({ type: types.DESELECT_GPARAM, payload: {} });
  };
}

export function closeEditGParamModal() {
  return function(dispatch) {
    dispatch({ type: types.HIDE_EDITGPARAM_MODAL });
  };
}

export function openEditGParamModal() {
  return function(dispatch) {
    dispatch({ type: types.SHOW_EDITGPARAM_MODAL });
  };
}

export function updateGParam(values) {
  return function(dispatch) {
    dispatch({ type: types.SHOW_EDITGPARAM_MODAL });
  };
}

//************************************* toggle Print and Mail services

export function toggleEdiCntlPrintMail(edicntl, action) {
  console.log("#################### edicntl", edicntl);
  console.log("#################### event", action);
  if (action == true) {
    return function(dispatch) {
      dispatch({ type: types.TURN_ON_PRINTMAILSERVICE });
    };
  } else {
    return function(dispatch) {
      dispatch({ type: types.TURN_OFF_PRINTMAILSERVICE });
    };
  }
}

const stringifyBooleanSiteData = newSiteData => {
  for (var property in newSiteData) {
    if (newSiteData.hasOwnProperty(property)) {
      if (typeof newSiteData[property] === "boolean") {
        newSiteData[property] = String(newSiteData[property]);
      } else if (typeof newSiteData[property] === "object") {
        stringifyBooleanSiteData(newSiteData[property]);
      }
    }
  }
  return newSiteData;
};

//*********************************site FTP
export function getDefaultFtpJobs() {
  let url = `external/api/default-site-ftp-jobs.json`;
  return function(dispatch) {
    dispatch({ type: types.REQUEST_DEFAULT_FTP_JOBS });
    axios.get(url).then(response => {
      if (response.data) {
        dispatch({
          type: types.RECEIVED_DEFAULT_FTP_JOBS,
          payload: response.data
        });
      } else {
        dispatch({
          type: types.REQUEST_DEFAULT_FTP_JOBS_FAIL,
          payload: response
        });
      }
    });
  };
}

export function getDefaultFtpConfig() {
  let url = `external/api/default-site-ftp-config.json`;
  return function(dispatch) {
    dispatch({ type: types.REQUEST_DEFAULT_FTP_CONFIG });
    axios.get(url).then(response => {
      if (response.data) {
        dispatch({
          type: types.RECEIVED_DEFAULT_FTP_CONFIG,
          payload: response.data
        });
      } else {
        dispatch({
          type: types.REQUEST_DEFAULT_FTP_CONFIG_FAIL,
          payload: response
        });
      }
    });
  };
}

export function getActiveSiteJobs(site) {
  let configFile = `j_${site.codenbr}`;
  let url = "external/api/activeSiteJobs.json";
  /*let url = `${ROOT_URL}&param.rtype=getSiteJobs&param.configFile=${configFile}&param.siteCodeNbr=${
    site.codenbr
  }`;*/
  return function(dispatch) {
    dispatch({ type: types.REQUEST_ACTIVESITE_JOBS });
    axios.get(url).then(response => {
      if (
        response &&
        response.data &&
        response.data.status &&
        response.data.status.result
      ) {
        dispatch({
          type: types.RECEIVED_ACTIVESITE_JOBS,
          payload: response.data.data
        });
      } else {
        dispatch({
          type: types.REQUEST_ACTIVESITE_JOBS_FAIL,
          payload: []
        });
      }
    });
  };
}

export function validateSiteJobs() {
  let errors = {};
  return errors;
}

export function updateSiteJobs(values, dispatch, props) {
  let errors = {};
  var cloneValues = _.cloneDeep(values);
  //replace *SITE* with current site Id
  cloneValues = JSON.parse(
    JSON.stringify(cloneValues).replace(/\*SITE\*/g, props.activeSite.codenbr)
  );

  //setup schedule time
  for (var i = 0; i < cloneValues.jobs.length; i++) {
    console.log(cloneValues.jobs[i]);
    if (cloneValues.jobs[i].name != "Assembler") {
      cloneValues.jobs[i].id +=
        cloneValues.jobs[i].schedule.timer.at.hour.hour +
        cloneValues.jobs[i].schedule.timer.at.hour.minute +
        cloneValues.jobs[i].schedule.timer.at.hour.meridiem;
      cloneValues.jobs[i].schedule.timer.at.hour.hour = parseInt(
        cloneValues.jobs[i].schedule.timer.at.hour.hour
      );
      //add 12 hours if pm meridiem is picked
      if (cloneValues.jobs[i].schedule.timer.at.hour.meridiem == "PM") {
        cloneValues.jobs[i].schedule.timer.at.hour.hour =
          parseInt(cloneValues.jobs[i].schedule.timer.at.hour.hour) + 12;
      }
      //update time to be in format HH:MM
      cloneValues.jobs[i].schedule.timer.at.hour =
        cloneValues.jobs[i].schedule.timer.at.hour.hour +
        ":" +
        cloneValues.jobs[i].schedule.timer.at.hour.minute;
    } else {
      cloneValues.jobs[i].schedule.timer.at.hour = "";
    }
    //stringify boolean isActive value
    cloneValues.jobs[i].isActive = String(cloneValues.jobs[i].isActive);
  }
  console.log("jobs to server", cloneValues);
  let url = `external/api/activeSiteJobs.json&param.rtype=genSiteJobs&param.siteCodeNbr=${props
    .activeSite.codenbr}JSON=JSiteFtpJobs`;
  //let url = `${ROOT_URL}&param.rtype=newsite&JSON=JNewSite`;
  return axios.post(url, cloneValues).then(function(response) {
    if (
      response &&
      response.data &&
      response.data.status &&
      response.data.status.result
    ) {
      console.log("successfully save site");
    } else if (
      response &&
      response.data &&
      response.data.status &&
      !response.data.status.result
    ) {
      throw new SubmissionError({
        _error: response.data.status.reason
      });
    } else {
      throw new SubmissionError({
        _error: "server error, please try again later."
      });
    }
  });
}

export function validateSiteFiles() {
  let errors = {};
  return errors;
}

export function updateSiteFtpConfig(values) {
  let errors = {};
  console.log("### update ftp config values", values);
  return errors;
}
