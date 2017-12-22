import { FETCH_CONFIGS } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CONFIGS:
      return action.payload.data.data;
  }
  return state;
}
