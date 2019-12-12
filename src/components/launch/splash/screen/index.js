/*
 * Created by Saul at 2018/05/16
 *
 * 启动页
 *
 */

import React from 'react';
import { View, Text } from 'react-native';
import Splash from '../Splash';

class SplashScreen extends React.Component {
  render() {
    return(
      <Splash navigation={ this.props.navigation } />
    )
  }
}

export default SplashScreen;

