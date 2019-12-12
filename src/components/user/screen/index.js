/*
 * Created by Saul at 2018/05/05
 *
 * 个人中心
 *
 * 个人中心可能需要考虑以下四块属性
 *
 * 账户属性
 *     id 和 注册时间
 *     账户名
 *     账户余额
 *     等级
 *     积分
 *     优惠券
 *     签到
 *
 * 订单属性
 *     全部订单、已支付、待支付等
 *
 * 课程相关属性
 *     我的课程
 *     我的收藏
 *     我的足迹
 *
 * 分销相关属性
 *     我的分销商
 *     我的上级
 *     我的佣金
 *     分销产品
 *     分销专题等
 *     分销订单
 *
 */

import React from 'react';
import {
  View, ScrollView, Text, StyleSheet, Alert, StatusBar, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'

import {
  Info,
  OrderEntry,
  MemberRelatedEntry,
  CourseRelatedEntry,
  DistributionRelatedEntry
} from './Entrys';
import { Layout, Color } from '../../../constants';
import api from '../../../utils/api'
import Toast from '../../common/toast'
import { storeUserInfo } from '../../../reducers/globalReducer/actions'

import NavigationService from '../../../navigation/NavigationService';


class UserScreen extends React.Component {
  componentDidMount = () => {
    // console.log('用户中心页面')
    // 获取用户信息
    this.fetchUserInfo()
  }

  navigateTo(screen) {
    const navigation = this.props.navigation
    NavigationService.navigate(screen);
  }

  // 储存用户信息
  setUserInfo = (userInfo) => {
    const dispatch = this.props.dispatch
    dispatch(
      storeUserInfo(userInfo)
    )
  }

  fetchUserInfo = async () => {
    try {
      const response = await api.get('/user/userInfo')
      const userInfo = response.data.data
      // console.log('userInfo', userInfo)
      this.setUserInfo(userInfo)
    } catch(error) {
      // console.log('error in fetch user data', error.response)
      if(error.data) {
        const data = error.data.data;
        const message = data.message
        // 直接引导用户去登录
        Toast.show('请先登录', Toast.LONG)
        // Toast.show(message, Toast.LONG)
        return this.navigateTo('Login')
      }
      return Alert.alert('网络错误')
    }
  }

  render() {
    const { userInfo } = this.props
    return(
      <ScrollView style={ styles.container } >
        <StatusBar
           backgroundColor={ Color.homeBgDark }
           barStyle="light-content"
         />
        <Info
           userInfo={userInfo}
           navigation={ this.props.navigation }
         />
        <OrderEntry />
        <MemberRelatedEntry />
        <CourseRelatedEntry />
        <DistributionRelatedEntry />
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    height: Layout.window.height,
    backgroundColor: Color.homeBgDark,
  }
})

const mapStateToProps = state => {
  const { globalState } = state
  const { userInfo = {} } = globalState
  return {
    userInfo
  }
}

export default connect(mapStateToProps)(UserScreen);
