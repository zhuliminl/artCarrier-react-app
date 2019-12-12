/*
 * Created by Saul at 2018/06/07
 *
 * 播放进度条
 *
 */

import React from 'react'
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Animated,
  Easing,
  PanResponder
} from 'react-native'
import { Layout, Color, GlobalStyle, Font } from '../../constants'


class ProcessBar extends React.Component {
  static defaultProps = {
    ratio: 0
  }

  // 设定被操纵的手势对象
  componentWillMount = () => {
    this.panResponder = PanResponder.create({

      // 要求成为响应者
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

      // 开始手势操作
      onPanResponderGrant: (event, gestureState) => {
        this.onStart(event, gestureState)
      },

      // 移动操作
      onPanResponderMove: (event, gestureState) => {
        this.onMove(event, gestureState)
      },

      // 释放手势
      onPanResponderRelease: (event, gestureState) => {
        this.onEnd(event, gestureState)
      }
    })
  }

  onStart = (e, g) => {
    // console.log('=====>>>>>onStart', );
  }

  onMove = (e, g) => {
    // console.log('=====>>>>>onMove', );
  }

  onEnd = (e, g) => {
    // console.log('=====>>>>>onEnd', g);
    const { moveX } = g
    const windowWidth = Layout.window.width
    const radio = moveX / windowWidth
    const { onRadioChange } = this.props
    onRadioChange(radio)
  }


  render() {
    const percent = this.props.ratio * 100 + '%'
    // console.log('bar render, props', this.props)
    return(
          <View style={{
            // 进度条容器
            marginTop: 20,
            paddingTop: 8,
            paddingBottom: 8,
            alignSelf: 'center',
            // backgroundColor: '#F5F6F7',
            // backgroundColor: Color.white,
            height: 20,
            width: Layout.window.width - 30,
            flexDirection: 'row'
          }}>

            <View style={{
              // 整个进度
              top: 8,
              position: 'absolute',
              backgroundColor: '#999',
              height: 2,
              width: '100%'
            }}>
            </View>
            <View
              style={{
                // 红色进度条
                backgroundColor: 'red',
                height: 2,
                // 这里是进度展示的挂载点
                width: percent
            }}>
            </View>
            {/* 试图创建一个透明的，触控面大的组件来供用户拖动 */}
            <View>
            </View>
              <View
              {...this.panResponder.panHandlers}
              style={{
                // 当前位置
                position: 'relative',
                borderStyle: 'solid',
                top: -5,
                height: 15,
                width: 15,
                // height: 55,
                // width: 55,
                borderRadius: 7.5,
                backgroundColor: '#EEE',
                elevation: 20,
            }}>
            </View>
          </View>
    )
  }
}

const styles = StyleSheet.create({
})

export default ProcessBar;
