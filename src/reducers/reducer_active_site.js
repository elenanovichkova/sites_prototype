import { SITE_SELECTED, FETCH_SITES } from "../actions/index";

export default function(state = {}, action) {
  switch (action.type) {
    case SITE_SELECTED:
      return action.payload.data.site;
    case FETCH_SITES:
      return {};
  }
  return state;
}
