import * as types from '../constants/speedDialActionTypes';

// example of a thunk using the redux-thunk middleware
export function setOpen(open) {
  return function (dispatch) {
    // thunks allow for pre-processing actions, calling APIs, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the open state
    return dispatch({
      type: types.SET_OPEN,
      payload: open
    });
  };
}