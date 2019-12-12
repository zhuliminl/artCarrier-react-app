/*
 * Created by Saul at 2018/05/16
 *
 * 首次打开的欢迎页面
 *
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Color, GlobalStyle } from '../../../../constants';
import Welcome from '../Welcome';

class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.navigateTo = this.navigateTo.bind(this);
  }

  navigateTo(screen) {
    const navigation = this.props.navigation;
    navigation.navigate(screen);
  }

  render() {
    return(
      <Welcome />
    )
  }
}

export default WelcomeScreen;
