import axios from "axios";
import _ from "lodash";
import * as types from "./action-types";

const ROOT_URL = "external/api";

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
  let url = `${ROOT_URL}/edicntlJSIADELANTOEBIL.json`;
  let request = axios.get(url);
  return {
    type: types.CONFIG_DUPLICATE,
    payload: request
  };
}

export function deleteConfig(config) {
  let url = `${ROOT_URL}&param.rtype=getConfig&param.config=${config.oid}`;
  let request = axios.get(url);
  return {
    type: types.CONFIG_DELETE,
    payload: request
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

export function fetchParams(config, callback) {
  //action creator, it needs to return an action, an object with a type property
  callback();
  let url = `${ROOT_URL}/params.json`;
  return function(dispatch) {
    dispatch({ type: types.REQUEST_PARAMS });
    axios.get(url).then(response => {
      dispatch({
        type: types.RECEIVE_PARAMS,
        payload: response
      });
    });
  };
}

export function updateParamList(event, formcontrol, paramList) {
  //action creator, it needs to return an action, an object with a type property
  let value = !isNaN(event.target.value)
    ? parseInt(event.target.value)
    : event.target.value;

  paramList.map(formgroup => {
    let stagedFormControl = _.find(formgroup.formcontrols, {
      id: formcontrol.id
    });
    if (stagedFormControl) {
      let stagedFormControlOption = _.find(stagedFormControl.options, {
        val: value
      });
      if (stagedFormControlOption) {
        stagedFormControl.selectedOptionValue = value;
        stagedFormControl.selectedParamValue =
          stagedFormControlOption.param.value;
        stagedFormControl.staged = value ? true : false;
      } else {
        stagedFormControl.selectedOptionValue = "";
        stagedFormControl.selectedParamValue = "";
        stagedFormControl.staged = false;
      }
    }
    return formgroup;
  });
  //need to clone to forse rerender on react component
  var cloneParamList = _.cloneDeep(paramList);
  return {
    type: types.UPDATE_PARAMS,
    payload: cloneParamList
  };
}

export function changeActiveParamOption(option) {
  //action creator, it needs to return an action, an object with a type property
  return {
    type: types.CHANGE_ACTIVE_PARAM_OPTION,
    payload: option
  };
}

export function updateActiveConfig(activeConfig, paramToRemove, paramToAdd) {
  //action creator, it needs to return an action, an object with a type property
  let paramsGroupName = `params${paramToRemove.formgroupName}`;
  var index = activeConfig.data[paramsGroupName].findIndex(
    param => param.id == paramToRemove.id
  );
  activeConfig.data[paramsGroupName].splice(index, 1, paramToAdd);
  return {
    type: types.UPDATE_ACTIVE_CONFIG,
    payload: activeConfig
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
  return {
    type: types.ADDPARAM_FORMCONTROL_SELECTED,
    payload: formcontrol
  };
}
