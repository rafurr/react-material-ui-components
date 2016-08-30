import * as types from '../constants/actionTypes';

const initialState = {
  value: 3
};

export default function numberInputAppState(state = initialState, action) {
  switch (action.type) {

    case types.SET_VALUE:
    {
      return {
        ...state,
        value: action.payload
      };
    }

    default:
      return state;
  }
}
