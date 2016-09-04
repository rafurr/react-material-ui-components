import * as types from '../constants/demoActionTypes';

const initialState = {
  count: 0
};

export default function demoAppState(state = initialState, action) {
  switch (action.type) {

    case types.SET_COUNT:
    {
      return {
        ...state,
        count: action.payload
      };
    }

    default:
      return state;
  }
}
