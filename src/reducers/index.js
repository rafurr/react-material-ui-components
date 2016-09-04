import { combineReducers } from 'redux';
import demoAppState from './demo';
import speedDialAppState from './speed-dial';
import numberInputAppState from './number-input';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  demoAppState,
  speedDialAppState,
  numberInputAppState,
  routing: routerReducer
});

export default rootReducer;
