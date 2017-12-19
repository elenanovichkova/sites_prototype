import { FETCH_SITES } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SITES:
      return action.payload.data.data;
  }
  return state;
}
