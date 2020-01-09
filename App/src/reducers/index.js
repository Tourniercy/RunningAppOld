import {combineReducers} from 'redux';
import coordinate from './mapreducer.js';
const allReducers= combineReducers({
  coordinate : coordinate
});
export default allReducers;
