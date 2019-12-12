/*
 * Created by Saul at 2018/05/16
 *
 * 启动页组件
 *
 */

import React from 'react';
import { View, Text, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import api from '../../../utils/api';
import { Color } from '../../../constants'

import { setToken, getToken, recordFirstLaunch } from '../../../reducers/globalReducer/actions';

const QuickEntry = ({title, handleOnPress}) => {
  return (
    <TouchableOpacity
      onPress={() => { handleOnPress() }}
      style={{
        height: 100,
        width: 100,
        backgroundColor: Color.homeBgDark,
      }}
    >
      <Text
        style={{
          color: 'red',
          paddingTop: 30,
        }}
      >
        { title }
      </Text>
    </TouchableOpacity>
  )
}

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.navigateTo = this.navigateTo.bind(this);

    const dispatch = this.props.dispatch;
    const isFirstLaunch = this.props.isFirstLaunch;
    const token = this.props.token;

    // 欢迎页只在首次启动时展现
    if(isFirstLaunch) {
      this.navigateTo('Welcome');
      console.log('enjoy our welcome page')

      dispatch(recordFirstLaunch());
    } else {
      // 开发时暂停登录功能，直接进入用户中心
      // this.navigateTo(token ? '我的' : 'Login');
      // this.navigateTo('购物车');
      // this.navigateTo('首页');
      // this.navigateTo('我的');
      this.navigateTo('分类');
      // this.navigateTo('购物车');
    }
  }

  componentDidMount = () => {
  }

  navigateTo(screen) {
    const navigation = this.props.navigation;
    navigation.navigate(screen);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: Color.homeBgDark,
          width: '100%',
          height: '100%'
        }}
      >
      </View>
    )

    return(
      <View style={{
        backgroundColor: '#000'
      }}>
        <Text>
          Splash Page
        </Text>

        <QuickEntry
          title="去用户中心"
          handleOnPress={() => {
            this.navigateTo('我的');
          }}
        />

        <QuickEntry
          title="去欢迎页"
          handleOnPress={() => {
            this.navigateTo('Welcome');
          }}
        />

        <QuickEntry
          title="测试api 封装"
          handleOnPress={() => {
            api.post('/login',
              {phone: '13111111111', password: '111111'}
            ).then(data => {
              console.log('new api data', data)
            }).catch(err => {
              if(!err.data) {
                // 网络请求错误
                return console.log('net error')
              }
              // 业务请求错误
              console.log('fail error')
            })

          }}
        />
      </View>

    )
  }
}

const mapStateToProps = (state) => {
  const globalState = state.globalState;
  const auth = globalState.auth;
  return {
    isFirstLaunch: globalState.isFirstLaunch,
    token: auth.token,
    expiration: auth.expiration
  }
}

const SplashConnected = connect(mapStateToProps)(Splash);
export default SplashConnected;
