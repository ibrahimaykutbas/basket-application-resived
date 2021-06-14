import * as actionType from "../actions/actionType";
import initialState from "./initialState";

export default function productListReducer(
  state = initialState.products,
  action
) {
  switch (action.type) {
    case actionType.GET_PRODUCTS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
