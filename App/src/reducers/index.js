import {combineReducers} from 'redux';
import countReducer from './countReducer.js';
import maps from './mapsReducer'
const allReducers= combineReducers({
  count: countReducer,
  maps : maps,
});
export default allReducers;
