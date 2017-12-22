import axios from "axios";

const ROOT_URL = "external/api";

export const SITE_SELECTED = "SITE_SELECTED";
export const FETCH_SITES = "FETCH_SITES";
export const CONFIG_EDIT = "CONFIG_EDIT";
export const CONFIG_VIEW = "CONFIG_VIEW";
export const CONFIG_DUPLICATE = "CONFIG_DUPLICATE";
export const CONFIG_DELETE = "CONFIG_DELETE";
export const FETCH_CONFIGS = "FETCH_CONFIGS";

export function selectSite(site) {
  let url = `${ROOT_URL}/siteDetail${site.siteId}.json`;
  let request = axios.get(url);
  //selectSite is an action creator, it needs to return an action, an object with a type property
  return {
    type: "SITE_SELECTED",
    payload: request
  };
}

export function fetchSites(siteName, siteId, siteTaxId, siteReceiverId) {
  let url = `${ROOT_URL}/sites.json`;
  let request = axios.get(url);
  return {
    type: FETCH_SITES,
    payload: request
  };
}

export function viewConfig(config) {
  let url = `${ROOT_URL}/edicntlJSIADELANTOEBIL.json`;
  let request = axios.get(url);
  return {
    type: CONFIG_VIEW,
    payload: request
  };
}

export function fetchConfigs(siteId) {
  let url = `${ROOT_URL}/configs${siteId}.json`;
  let request = axios.get(url);
  return {
    type: FETCH_CONFIGS,
    payload: request
  };
}

export function selectConfig(config, action) {
  let url = `${ROOT_URL}/edicntlJSIADELANTOEBIL.json`;
  let request = axios.get(url);
  switch (action) {
    case "edit":
      return {
        type: CONFIG_EDIT,
        payload: request
      };
    case "duplicate":
      return {
        type: CONFIG_DUPLICATE,
        payload: request
      };
    case "delete":
      return {
        type: CONFIG_DELETE,
        payload: request
      };
    default:
      return {
        type: CONFIG_VIEW,
        payload: request
      };
  }
}
