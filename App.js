/*
 * Created by jemo on 2018-3-19.
 * App
 */

import React from 'react';
import { StyleSheet, View, Text, YellowBox } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/createStore'
import SplashScreen from 'react-native-splash-screen'


// 忽略部分非致命性的警告
YellowBox.ignoreWarnings(
  [
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Remote debugger',
  'Class RCTCxxModule',
  'Module RCTAlipay',
  'react-native-render-html',
  "Warning: Cant't call setState",
  'Module RCTWeChat requires main queue setup since it'
  ]
);

export default class App extends React.Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }

  render() {
    return (
      <View
        style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00050C'
  },
});
