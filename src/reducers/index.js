import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import numberInputAppState from './number-input';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  numberInputAppState,
  routing: routerReducer
});

export default rootReducer;
