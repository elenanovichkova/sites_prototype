import {
  CONFIG_VIEW,
  CONFIG_EDIT,
  CONFIG_DELETE,
  CONFIG_DUPLICATE,
  SITE_SELECTED,
  FETCH_SITES,
  FETCH_CONFIGS
} from "../actions/index";

export default function(state = {}, action) {
  switch (action.type) {
    case CONFIG_VIEW:
      action.payload.data.config.view = "view";
      return action.payload.data.config;
    case CONFIG_EDIT:
      action.payload.data.config.view = "edit";
      return action.payload.data.config;
    case CONFIG_DELETE:
      action.payload.data.config.view = "delete";
      return action.payload.data.config;
    case CONFIG_DUPLICATE:
      action.payload.data.config.view = "duplicate";
      return action.payload.data.config;
    case SITE_SELECTED:
      return {};
    case FETCH_SITES:
      return {};
    case FETCH_CONFIGS:
      return {};
  }
  return state;
}
