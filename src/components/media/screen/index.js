/*
 * Created by Saul at 2018/06/05
 *
 * 媒体功能模块
 *
 */


import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native'
import { Layout, Color } from '../../../constants'
import PlayerPanel from '../PlayerPanel'
import * as WeChat from 'react-native-wechat';

class MediaScreen extends React.Component {
  state = {
    apiVersion: '',
    wxAppInstallUrl: '',
    isWXAppSupportApi: '',
    isWXAppInstalled: '',

    // UI 相关状态
    // 状态栏是否显示
    isStatusBarHidden: false,
    tabBarVisible: true

  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    return {
      header: null,
      tabBarVisible: params.tabBarVisible
    }
  }

  componentWillMount = () => {
    this.setNavigationParams()
  }

  setNavigationParams = () => {
    const { navigation } = this.props

    navigation.setParams({
      tabBarVisible: this.state.tabBarVisible
    })
  }

  openWXapp = async () => {
    // await WeChat.openWXApp()

    try {
      let result = await WeChat.shareToTimeline({
        type: 'text',
        title: 'web image',
        description: 'share web image to time line',
      });
    } catch (e) {
      console.log('=====>>>>>WXapp error', e);
      if (e instanceof WeChat.WechatError) {
        console.error(e.stack);
      } else {
        throw e;
      }
    }
  }


  componentDidMount = async () => {
    try {
      let registerApp = await WeChat.registerApp('wx7ffcb3b27a8ab7d7');
      console.log('=====>>>>>registerApp', registerApp);
      this.setState({
        apiVersion: await WeChat.getApiVersion(),
        // wxAppInstallUrl: await WeChat.getWXAppInstallUrl(),
        isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
        isWXAppInstalled: await WeChat.isWXAppInstalled()
      });
      console.log(this.state);
      console.log('=====>>>>>WeChat can do', WeChat);
    } catch (e) {
      console.error(e);
    }
  }

  // 分享到微信
  handleShareToWechat = async ({ type, title, description }) => {
    try {
      let result = await WeChat.shareToTimeline({
        type, title, description
      });
      console.log('=====>>>>>share result', result);
    } catch (e) {
      console.log('=====>>>>>WXapp error', e);
      if (e instanceof WeChat.WechatError) {
        console.error(e.stack);
      } else {
        throw e;
      }
    }

  }

  handleStatusBarHidden = (isHidden) => {
    this.setState({
      isStatusBarHidden: isHidden
    })
    // 底部导航的显示状态跟随顶部导航栏
    this.setState({
      tabBarVisible: false
    })
  }

  handlTabBarShow = (isVisible) => {
    const { navigation } = this.props
    navigation.setParams({
      tabBarVisible: isVisible
    })
  }


  render() {
    return(
      <View>
        {
          false ?
            <TouchableOpacity
              onPress={() => {
                this.openWXapp()
              }}
              style={{
                height: 200,
                width: 100,
                backgroundColor: 'red'
              }}
            >
              <Text>
                测试微信 sdk
              </Text>
            </TouchableOpacity>
            : null
        }
        <StatusBar
           hidden={this.state.isStatusBarHidden}
           backgroundColor={ Color.homeBgDark }
           barStyle="light-content"
         />
         <PlayerPanel
           navigation={ this.props.navigation }
           onShareToWechat={ this.handleShareToWechat }
           onStatusBarHidden={ this.handleStatusBarHidden }
           onTabBarShow={ this.handlTabBarShow }
         />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: Platform.OS === 'ios' ? (Layout.window.height - 55) : (Layout.window.height - 78),
  }
})


export default MediaScreen;

