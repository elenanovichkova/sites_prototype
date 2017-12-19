import axios from "axios";

const ROOT_URL = "external/api/";

export const SITE_SELECTED = "SITE_SELECTED";
export const FETCH_SITES = "FETCH_SITES";

export function selectSite(site) {
  let url = `${ROOT_URL}siteDetail${site.siteId}.json`;
  let request = axios.get(url);
  //selectBook is an action creator, it needs to return an action, an object with a type property
  return {
    type: "SITE_SELECTED",
    payload: request
  };
}

export function fetchSites(siteName, siteId, siteTaxId, siteReceiverId) {
  let url = `${ROOT_URL}sites.json`;
  let request = axios.get(url);
  return {
    type: FETCH_SITES,
    payload: request
  };
}
