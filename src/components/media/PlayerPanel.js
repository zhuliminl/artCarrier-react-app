/*
 * Created by Saul at 2018/06/06
 *
 * 播放器面板
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  StatusBar,
  Animated,
  Easing,
  Alert,
  Platform
} from 'react-native'
import Orientation from 'react-native-orientation';
import { Layout, Color, GlobalStyle, Font } from '../../constants'
import PlayerHeader from './playerHeader'
import ProcessBar from './processBar'
import PlayControlPanel from './playControlPanel'
import PlayList from './playList'
import TimeDisplay from './timeDisplay'
import PlayerScreen from './playerScreen'

import { formatSecondsToNormalTime } from '../../utils/timeFormat'
import { switchTrack, togglePlay } from './reducer/actions'
import { AndroidBackHandler } from '../../utils/BackHandler.android'

class PlayerPanel extends React.Component {
  state = {
    currentTime : '',
    processSeek: '',
    duration: '',
    seekableDuration: '',
    ratio: 0, // 进度系数 0~1

    // 全屏状态交给局部管理
    // 全屏需要的状态
    isFullScreen: false,
    videoWidth: Layout.window.width - 30,
    videoHeight: 200
  }

  componentDidMount = () => {
    Orientation.lockToPortrait()
    Orientation.addOrientationListener(this.orientationDidChange)
  }

	orientationDidChange = (orientation) => {
    // 根据手机定向改变视频组件宽高
    console.log('=====>>>>>orientation', orientation);

    // 横屏播放
    if(orientation === 'LANDSCAPE') {
      this.setState({
        videoWidth: Layout.window.height,
        videoHeight: Layout.window.width,
        isFullScreen: true
      })
      return;
    }

    // 竖屏播放
    if(orientation === 'PORTRAIT') {
      this.setState({
        videoWidth: Layout.window.width - 30,
        videoHeight: 200,
        isFullScreen: false
      })
      return;
    }

	}


  handleFullScreen = () => {
    this.props.onStatusBarHidden(true)
    this.props.onTabBarShow(false)
    Orientation.lockToLandscape()
  }

  handleQuitFullScreen = () => {
    this.props.onStatusBarHidden(false)
    this.props.onTabBarShow(true)
    Orientation.lockToPortrait()
  }

  // 处理安卓全屏播放后的返回按钮事件
  handleBackPressInFullScreen = () => {
    console.log('=====>>>>>xxxxxxxxxxxxxxxxxxxxx', );
    const { isFullScreen } = this.state
    if(isFullScreen) {
      // 退出全屏
      this.handleQuitFullScreen()
      return true
    }
    return false
  }


  handleVideoLayout = () => {
    console.log('=====>>>>>video layout changed', );
  }

  handleOnProgress = (process) => {
    const { seekableDuration, currentTime } = process
    this.setState({
      ratio: currentTime / seekableDuration,
      currentTime: formatSecondsToNormalTime(currentTime),
      duration: formatSecondsToNormalTime(seekableDuration),
      seekableDuration
    })
  }

  handleRadioChange = (radio) => {
    const { seekableDuration } = this.state
    // 滑动控制到的确切时间
    const preciseTime = Math.floor(seekableDuration * radio )
    this.setState({ processSeek: preciseTime })
  }

  handleOnPause = () => {
    const { dispatch } = this.props
    dispatch(
      togglePlay()
    )
  }

  handleOnNext = () => {
    const { dispatch, currentTrack, trackList } = this.props
    const length = trackList.length
    const { trackIndex } = currentTrack
    if(trackIndex === length -1) {
      return Alert.alert('播完了，没有下一项')
    }
    const nextTrackIndex = trackIndex + 1
    dispatch(
      switchTrack(nextTrackIndex)
    )
    // console.log('下一曲', );
  }

  handleOnPrevious = () => {
    const { dispatch, currentTrack } = this.props
    const { trackIndex } = currentTrack
    if(trackIndex === 0) {
      return Alert.alert('没有上一项')
    }
    const previousTrackIndex = trackIndex - 1
    dispatch(
      switchTrack(previousTrackIndex)
    )
    // console.log('上一曲', );
  }

  handleOnPlayCurrent = (trackIndex) => {
    const { dispatch } = this.props
    dispatch(
      switchTrack(trackIndex)
    )
  }

  render() {
    const { currentTrack, trackList } = this.props
    const currenIndex = currentTrack.trackIndex || 0
    const {
      paused,
      isLoading,
      mediaURL,
      mediaCoverURL,
      chapterTitle,
      courseTitle
    } = currentTrack
    const { isFullScreen } = this.state
    const heightInPorTrait = Platform.OS === 'ios' ? (Layout.window.height - 50) : (Layout.window.height - 80)
    const heightInLanscape = Layout.window.height
    return(
      <AndroidBackHandler
        onBackPress={() => {
          this.handleBackPressInFullScreen()
        }}
      >
        <View
          style={{
            backgroundColor: Color.white,
            // backgroundColor: 'red',
            height: isFullScreen ? heightInLanscape : heightInPorTrait
          }}
        >
          {/* 顶部导航 */}
          {
            isFullScreen ? null :
              <PlayerHeader
                navigation={ this.props.navigation }
                onShareToWechat={ this.props.onShareToWechat }
                currentTrack={ this.props.currentTrack }
              />
          }
          <ScrollView>
            {/* 封面和播放屏幕 */}
            <PlayerScreen
              onVideoLayout={ this.handleVideoLayout }
              processSeek={ this.state.processSeek }
              isLoading={ isLoading }
              mediaURL={ mediaURL }
              mediaCoverURL={ mediaCoverURL }
              chapterTitle={ chapterTitle }
              courseTitle={ courseTitle }
              paused={ paused }
              onProgress={ this.handleOnProgress }
              onFullScreen={ this.handleFullScreen }
              onQuitFullScreen={ this.handleQuitFullScreen }
              videoWidth={ this.state.videoWidth }
              videoHeight={ this.state.videoHeight }
              isFullScreen={ isFullScreen }
            />
            {
              isFullScreen ? null :
                <View>
                  {/* 进度条 */}
                  <ProcessBar
                    onRadioChange={this.handleRadioChange}
                    ratio={ this.state.ratio }
                  />
                  {/* 时间提示 */}
                  <TimeDisplay
                    currentTime={ this.state.currentTime }
                    duration={ this.state.duration }
                  />
                  {/* 控制器 */}
                  <PlayControlPanel
                    paused={ paused }
                    onPause={ this.handleOnPause }
                    onPrevious={ this.handleOnPrevious }
                    onNext={ this.handleOnNext }
                  />
                  {/* 播放列表 */}
                  <PlayList
                    onPlayCurrent={ this.handleOnPlayCurrent }
                    currenIndex={ currenIndex }
                    trackList={ trackList }
                  />
                </View>

            }
          </ScrollView>
        </View>
      </AndroidBackHandler>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    height: Platform.OS === 'ios' ? (Layout.window.height - 50) : (Layout.window.height - 80)
  },
})

const mapStateToProps = state => {
  const { mediaState } = state
  const currentTrack = mediaState.currentTrack || {}
  const trackList = mediaState.trackList || []
  return {
    currentTrack,
    trackList
  }
}

export default connect(mapStateToProps)(PlayerPanel);
