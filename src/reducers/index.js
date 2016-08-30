import { combineReducers } from 'redux';
import numberInputAppState from './number-input';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  numberInputAppState,
  routing: routerReducer
});

export default rootReducer;
