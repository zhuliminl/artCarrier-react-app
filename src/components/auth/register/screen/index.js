/*
 * Created by Saul at 2018/05/19
 *
 * 注册页面
 *
 */

import React from 'react';
import { View, Text, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Register from '../Register';


class RegisterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: '注册',
        headerStyle: {
        },
    }
  }
  render() {
    return(
      <Register />
    )
  }
}

export default RegisterScreen;
