import React, { Component } from 'react';
import allReducers from './reducers/index.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Home from '../view/Home';
const store = createStore(allReducers);

export default class App extends Component{
  render(){
    return(
      <Provider store= {store}>
     <Home />
     </Provider>
    );
  }
}
