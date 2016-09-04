import { combineReducers } from 'redux';
import speedDialAppState from './speed-dial';
import numberInputAppState from './number-input';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  speedDialAppState,
  numberInputAppState,
  routing: routerReducer
});

export default rootReducer;
