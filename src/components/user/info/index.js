/*
 * Created by Saul at 2018/05/05
 *
 * 个性信息简介
 *
 */

import React from 'react';
import { connect } from 'react-redux'
import {
  View, FlatList, Text, Image, StyleSheet, ImageBackground, TouchableOpacity
} from 'react-native';
// import TouchableItem from '../../../utils/TouchableItem';
import {
  Layout, Color, Font, Space
} from '../../../constants';

// import { userInfo } from '../__test__';

import { withNavigation } from 'react-navigation';
import NavigationService from '../../../navigation/NavigationService';
import api from '../../../utils/api'

const bgUrl = require('.././../../assets/image/bg_info.png');

class Info extends React.Component {

  render() {
    const { userInfo } = this.props
    const weixinNickname = userInfo['weixin_nickname']
    const weixinAvatar = userInfo['weixin_headimgurl']
    const sex = userInfo['sex'] || ''
    const registerTime = userInfo['created_at'] || ''
    // 男性还是女性
    const defaultAvatar = sex === 2 ?
        require('../../../assets/icon/user/avatar_male.png')
      : require('../../../assets/icon/user/avatar_famale.png')

    // 是否登录。这个判断太简陋了
    const isLogined = this.props.token !== ""
    return(
      <View>
        {/* 未登录的提示信息 */}
        {
          !isLogined &&
            <View
              style={{
                height: 30,
                backgroundColor: 'yellow'
              }}
            >
              <Text style={{ textAlign: 'center' }}>检测到您尚未登录，请点击登录菜单登录!</Text>
            </View>
        }
        <ImageBackground
          style={ styles.infoBg }
          source={ bgUrl }
        >
          {/* 消息 客服中心一期不予实现
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('Message')
            }}
            style={ styles.messageTouch }
            activeOpacity={0.4}

          >
            <Image
              source={ require('../../../assets/icon/user/message.png') }
              style={ styles.message }
            />
          </TouchableOpacity>
              */}
          {/* 头像 */}
          <TouchableOpacity
            onPress={() => {
              const { navigation } = this.props
              // navigation.navigate('OrderComment')
              navigation.navigate('AfterSale')
            }}
          >
            <Image
              style={ styles.avatar }
              source={ weixinAvatar === "" ?  defaultAvatar : { uri: weixinAvatar } }
            />
          </TouchableOpacity>
          {/* 详细信息 */}
          <View style={ styles.info } >
            <Text style={ styles.username } >
              { weixinNickname !== "" ? weixinNickname : '' }
            </Text>

            <View style={ styles.infoDetail } >
              <Text style={ styles.infoDetailText } >
                id: { userInfo.id }
              </Text>
            </View>

            <View style={ styles.infoDetail } >
              <Text style={ styles.infoDetailText } >
                注册时间: { registerTime.substr(0, 10) }
              </Text>
            </View>

          </View>
        </ImageBackground>
      </View>
    )
  }
}

// 样式中涉及运算的变量在这里初始化
const avatarSize = 70;

const styles = StyleSheet.create({
  infoBg: {
    height: 200,
    width: Layout.window.width,
  },
  messageTouch: {
    padding: 20,
    position: 'absolute',
    top: 30,
    right: 20,
  },
  message: {
    height: 20,
    width: 20,
  },
  avatar: {
    marginLeft: 10,
    marginTop: 55,
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
  },
  info: {
    position: 'absolute',
    left: 90,
    top: 60
  },
  username: {
    fontSize: Font.large,
    color: Color.white
  },
  infoDetail: {
    flexDirection: 'column',
    backgroundColor: Color.overlay,
    marginTop: Space.tiny,
    paddingLeft: Space.small,
    paddingTop: Space.mini,
    paddingBottom: Space.mini,
    borderRadius: Space.small,
    // 让文字标签的父标签贴合文字自身长度
    alignSelf: 'flex-start'
  },
  infoDetailText: {
    lineHeight: 15,
    paddingRight: Space.small,
    // overflow: 'hidden',
    fontSize: Font.tiny,
    color: Color.white,
  }

})

const mapStateToProps = state => {
  const { globalState } = state
  const { auth: { token } } = globalState
  return {
    token
  }
}

export default connect(mapStateToProps)(Info)
