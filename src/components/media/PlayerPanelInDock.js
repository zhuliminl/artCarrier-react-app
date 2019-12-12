/*
 * Created by Saul at 2018/06/06
 *
 * 导航栏下的媒体中心的入口： 旋转的仪表板
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Animated,
  Easing
} from 'react-native'

// 面板尺寸
const panelSize = 50
// 暂停按钮
const pausedURL = require('../../assets/icon/media/paused.png')
const TIMES = 400

class PlayerPanelInDock extends React.Component {
  state = {
    angle: new Animated.Value(0)
  }

  static defaultProps = {
    // 默认暂停动画
    paused: true
  }

  componentDidMount = () => {
    this.animate()

    // 到一定的时间执行停止动画
    // this.angleTimer = setTimeout(() => {
      // console.log('停止动画')
      // this.stopAnimation()
      // clearTimeout(this.angleTimer)
    // }, 10000)

    // 根据外部的 props 来确定动画的状态
    const paused = this.props.paused
    if(paused) {
      this.stopAnimation()
    }
  }

  componentDidUpdate = () => {
    // console.log('Panel In Dock', this.props );
    const paused = this.props.paused
    if(paused) {
      return this.stopAnimation()
    }
    this.animate()
  }

  stopAnimation = () => {
    Animated.timing(
      this.state.angle
    ).stop()
  }

  animate = () => {
    this.state.angle.setValue(0)
    this.animation = Animated.timing(
      this.state.angle,
      {
        toValue: 360*TIMES,
        duration: 2400*TIMES,
        easing: Easing.linear
      }
    // ).start(this.animate)
    // 不循环动画。目前方案是设定一个超级长的执行周期，而不是让动画永远循环下去
    // 这样就能做到随时停止动画和启动的控制
    ).start()
  }


  render() {
    return(
      <Animated.View
        style={
          [
            styles.container,
            {
              transform: [
                {
                  rotate: this.state.angle.interpolate(
                    {
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg']
                    }
                  )
                },
              ]
            }
          ]
        }
      >
        <ImageBackground
          imageStyle={{ borderRadius: panelSize/2 }}
          style={ styles.mediaCover }
          source={{ uri: this.props.mediaCoverURL }}
        >
          {
            this.props.paused && <Image style={ styles.pausedIcon } source={ pausedURL } />
          }
        </ImageBackground>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'red'
  },
  mediaCover: {
    width: panelSize,
    height: panelSize,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pausedIcon: {
    marginLeft: 6,
    width: 20,
    height: 20,
    opacity: 0.9,
  }
})

const mapStateToProps = state => {
  const { mediaState } = state
  const currentTrack = mediaState.currentTrack || {}
  const paused = currentTrack.paused || false
  const mediaCoverURL = currentTrack.mediaCoverURL || false
  return {
    paused,
    mediaCoverURL
  }
}

export default connect(mapStateToProps)(PlayerPanelInDock);
