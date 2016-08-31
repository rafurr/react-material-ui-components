import * as types from '../constants/actionTypes';

// example of a thunk using the redux-thunk middleware
export function setValue(value) {
  return function (dispatch) {
    // thunks allow for pre-processing actions, calling APIs, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the value
    return dispatch({
      type: types.SET_VALUE,
      payload: value
    });
  };
}