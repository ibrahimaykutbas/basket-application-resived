import * as actionType from "../actions/actionType";
import initialState from "./initialState";

export default function changeCategoryReducer(
  state = initialState.currentCategory,
  action
) {
  switch (action.type) {
    case actionType.CHANGE_CATEGORY:
      return action.payload;

    default:
      return state;
  }
}
