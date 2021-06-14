import * as actionType from "../actions/actionType";
import initialState from "./initialState";

export default function saveProductReducer(
  state = initialState.savedProduct,
  action
) {
  switch (action.type) {
    case actionType.UPDATE_PRODUCT_SUCCESS:
      return action.payload;

    case actionType.CREATE_PRODUCT_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
