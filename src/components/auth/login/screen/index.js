/*
 * Created by Saul at 2018/05/19
 *
 * 登录页面
 *
 */

import React from 'react';
import { View, Text, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import LoginHeaderRight from './LoginHeaderRight';
import Login from '../Login';

class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: '登录',
        headerStyle: {
        },
        headerRight: <LoginHeaderRight navigation={ navigation } />,
    }
  }
  render() {
    return(
      <Login />
    )
  }
}

export default LoginScreen;
