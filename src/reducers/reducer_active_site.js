import { SITE_SELECTED } from "../actions/index";

export default function(state = {}, action) {
  switch (action.type) {
    case SITE_SELECTED:
      console.log("++++++", action.payload.data.site);
      return action.payload.data.site;
  }
  return state;
}
