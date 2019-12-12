/*
 * Created by jemo on 2018-3-28.
 * 用户注册
 */

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import TouchableItem from '../../../utils/TouchableItem';
import NavigationService from '../../../navigation/NavigationService';
import { GlobalConifg } from '../../../constants';

const { phoneNumberREG, passwordREG } = GlobalConifg;

import { Color } from '../../../constants';
import api from '../../../utils/api';

class Register extends Component {
  state = {
    disableCaptchaButton: true,
    disableRegisterButton: true,
    captcha: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: ''
  }

  // 导航到
  navigateTo = (screen) => {
    NavigationService.navigate(screen);
  };

  // 获取验证码
  getCaptcha = async () => {
    const phoneNumber = this.state.phoneNumber;
    try {
      await api.post('/sendVcode', { phone: phoneNumber });
      Alert.alert('发送成功, 请注意查收验证码');
    } catch(error) {
      console.log(error)
      Alert.alert('发送失败，请重试');
    }
  }

  // 验证手机号并解锁获取验证码按钮
  handlePhoneNumberChange = (text) => {
    this.setState({ phoneNumber: text });
    // 只有当用户输入达到 11 位才开始验证
    if(text.length === 11) {
      if(phoneNumberREG.test(text)) {
        return this.setState({ disableCaptchaButton: false });
      }
      Alert.alert('手机号格式错误');
    }
  }

  handlePhoneNumberEndEditing = (event) => {
    const phoneNumber = event.nativeEvent.text;
    this.setState({ phoneNumber });
    if(!phoneNumberREG.test(phoneNumber)) {
      Alert.alert('手机号格式错误');
    }
  }

  handlePasswordEndEditing = (event) => {
    const password = event.nativeEvent.text;
    this.setState({ password });
    if(!passwordREG.test(password)) {
      Alert.alert('密码不合格, 请重新输入');
    }
  }

  // 提交
  handleRegisterSubmit = async () => {
    const { phoneNumber, password, captcha } = this.state;
    try {
      await api.post('/register', { phone: phoneNumber, password, captcha });
      Alert.alert('注册成功，请登录')
    } catch(error) {
      if(error.data) {
        return Alert.alert(error.data.message)
      }
      Alert.alert('注册失败')
    }
  }

  render() {
    return(
      <View
        style={styles.container}>
        <Text
          style={styles.title}>
          用户注册
        </Text>
        <View
          style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => {
              this.handlePhoneNumberChange(text);
            }}
            onEndEditing={(event) => {
              this.handlePhoneNumberEndEditing(event);
            }}
            autoFocus
            underlineColorAndroid='transparent'
            placeholderTextColor='#a1a1a1'
            placeholder={'手机号码'}
            style={styles.input}>
          </TextInput>
          </View>
        <View
          style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => {
              this.setState({ captcha: text });
            }}
            underlineColorAndroid='transparent'
            placeholderTextColor='#a1a1a1'
            placeholder={'验证码'}
            style={styles.input}>
          </TextInput>
          <TouchableItem
            disabled={this.state.disableCaptchaButton}
            onPress={() => {
              this.getCaptcha();
            }}
            borderless
            style={styles.getCodeContainer}>
            <Text
              style={{
                padding: 5,
                color: Color.black,
                opacity: this.state.disableCaptchaButton ? 0.7 : 1,
                backgroundColor: this.state.disableCaptchaButton ? '#EEE' : '#DDD'
              }}
            >
              获取验证码
            </Text>
          </TouchableItem>
        </View>
        <View
          style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => {
              this.setState({ password: text })
            }}
            onEndEditing={(event) => {
              this.handlePasswordEndEditing(event);
            }}
            underlineColorAndroid='transparent'
            placeholderTextColor='#a1a1a1'
            placeholder={'密码 (6-16个字符，不含空格)'}
            secureTextEntry
            style={styles.input}>
          </TextInput>
        </View>
        <View
          style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => {
              this.setState({ disableRegisterButton: false });
              // 只在前后密码长度一致的情况下才比较一次,否则会每次输入一次就比较一次。从而不可用
              if(text.length === this.state.password.length) {
                return text === this.state.password ? '' : Alert.alert('两次输入的密码不一致');
              }
            }}
            onEndEditing={(event) => {
              const text = event.nativeEvent.text;
              return text === this.state.password ? '' : Alert.alert('两次输入的密码不一致')
            }}
            underlineColorAndroid='transparent'
            placeholderTextColor='#a1a1a1'
            placeholder={'再次输入密码'}
            secureTextEntry
            style={styles.input}>
          </TextInput>
        </View>
        <TouchableItem
          onPress={() => {
            this.handleRegisterSubmit();
          }}
          disabled={this.state.disableRegisterButton}
          style={{
            width: '80%',
            height: 40,
            marginTop: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: Color.primary,
            opacity: this.state.disableRegisterButton ? 0.7 : 1
          }}>
          <Text
            style={styles.buttonTitle}>
            立即注册
          </Text>
        </TouchableItem>
      </View>
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
    borderBottomColor: Color.black,
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
  },
  getCodeContainer: {
    justifyContent: 'center',
  },
  getCodeTitle: {
    color: Color.black
  },
  button: {
    width: '80%',
    height: 40,
    marginTop: 40,
    backgroundColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonTitle: {
    color: Color.bg
  }
});

export default Register;
