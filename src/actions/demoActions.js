import * as types from '../constants/demoActionTypes';

// example of a thunk using the redux-thunk middleware
export function setCount(count) {
  return function (dispatch) {
    // thunks allow for pre-processing actions, calling APIs, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the count
    return dispatch({
      type: types.SET_COUNT,
      payload: count
    });
  };
}