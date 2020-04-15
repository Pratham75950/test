/**
 * @format
 */
import React, {Component} from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from "react-redux";
import configureStore from './src/store'
const store = configureStore()

class MyCounterApp extends Component {
  render() {
    return(
      // <Provider> allows us to access the store for dispatching actions and receiving data from
      // the state in it's children i.e. <App/>
      <Provider>
        <App/>
      </Provider>
    )
  }
}
AppRegistry.registerComponent(appName, () => App);
