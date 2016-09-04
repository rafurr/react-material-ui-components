import * as types from '../constants/speedDialActionTypes';

const initialState = {
  open: false
};

export default function speedDialAppState(state = initialState, action) {
  switch (action.type) {

    case types.SET_OPEN:
    {
      return {
        ...state,
        open: action.payload
      };
    }

    default:
      return state;
  }
}
