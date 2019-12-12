/*
 * Created by jemo on 2018-3-27.
 * 用户登录
 */

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import TouchableItem from '../../../utils/TouchableItem';
import { connect } from 'react-redux';
import api from '../../../utils/api';
import { setToken } from '../../../reducers/globalReducer/actions';
import NavigationService from '../../../navigation/NavigationService';
import { GlobalConifg } from '../../../constants';
import Toast from '../../common/toast'
import { AndroidBackHandler } from '../../../utils/BackHandler.android'

// 手机号验证正则
const { phoneNumberREG } = GlobalConifg;

class Login extends Component {
  state = {
    password: '',
    phoneNumber: ''
  };

  // 导航到
  navigateTo = (screen) => {
    NavigationService.navigate(screen);
  };

  handleLoginSubmit = async () => {
    if(this.validateFields()) {
      const { phoneNumber, password } = this.state;
      try {
        const response = await api.post('/login', {phone: phoneNumber, password});
        const token = response.data.token;
        const expiration = response.data.expiresAt;
        const dispatch = this.props.dispatch;
        console.log('登录的toekn', token)
        // 储存认证信息
        dispatch(
          setToken( token, expiration)
        );

        // 提示成功并跳转
        Toast.show('登录成功')
        return this.navigateTo('我的');
      } catch(error) {
        console.log('login error: ', error);
        // 如果带有数据则代表是业务错误
        if(error.data) {
          // 登录失败
          console.log('login fail')
          return Alert.alert('账号和密码错误!!!请重试');
        }
        console.log('login post error', error);
        Alert.alert('请求错误');
      }
    }
  };

  // 验证字段
  validateFields = () => {
    const { phoneNumber, password } = this.state;
    if(!phoneNumber.trim()) {
      return Alert.alert('手机号输入错误', '手机号不能为空！！！');
    }
    if(!password.trim()) {
      return Alert.alert('密码输入错误', '密码不能为空！！！');
    }
    if(phoneNumber.match(phoneNumberREG) === null) {
      return Alert.alert('手机号输入错误', '请输入正确的手机号码');
    }
    return true;
  };

  handleBackPress = () => {
    let notLogined = true
    if(notLogined) {
      this.navigateTo('Login');
    }
    return true
  }

  render() {
    return(
      <AndroidBackHandler
        onBackPress={() => {
          this.handleBackPress()
        }}
      >
        <View
          style={styles.container}>
          <Text
            style={styles.title}>
            用户登录
          </Text>
          <View
            style={styles.inputContainer}>
            <TextInput
              onChangeText={(text) => { this.setState({ phoneNumber: text }) }}
              underlineColorAndroid='transparent'
              placeholderTextColor='#a1a1a1'
              placeholder={'手机号'}
              style={styles.input}>
            </TextInput>
            </View>
          <View
            style={styles.inputContainer}>
            <TextInput
              onChangeText={(text) => { this.setState({ password: text }) }}
              underlineColorAndroid='transparent'
              placeholderTextColor='#a1a1a1'
              placeholder={'密码'}
              secureTextEntry
              style={styles.input}>
            </TextInput>
          </View>
          <TouchableItem
            onPress={() => {
              this.handleLoginSubmit();
            }}
            style={styles.button} >
            <Text
              style={styles.buttonTitle}>
              登录
            </Text>
          </TouchableItem>
        </View>
      </AndroidBackHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: 25,
    marginBottom: 25,
  },
  inputContainer: {
    width: '80%',
    height: 60,
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.3,
  },
  input: {
    flex: 1,
  },
  button: {
    width: '80%',
    height: 40,
    marginTop: 40,
    backgroundColor: '#00cd66',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonTitle: {
    color: 'white',
  }
});

export default connect(null)(Login);
