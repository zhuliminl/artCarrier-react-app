/*
 * Created by Saul at 2018/06/07
 *
 * 播放器的屏幕
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
  Animated,
  Easing,
  AlertIOS,
  Platform,
  Text,
} from 'react-native'
import { Layout, Color, GlobalStyle, Font } from '../../constants'

import Video from 'react-native-video';


class PlayerScreen extends React.Component {
  static defaultProps = {
    paused: false,
    processSeek: '',
    onProgress: () => {}
  }

  componentWillReceiveProps(nextProps) {
    const { processSeek: processSeekBefore } = this.props
    const { processSeek: processSeekAfter } = nextProps
    if(processSeekAfter !== processSeekBefore) {
      // console.log('=====>>>>>开始定位到', );
      this.player.seek( processSeekAfter )
    }
  }

  render() {
    const {
      mediaCoverURL,
      mediaURL,
      chapterTitle,
      courseTitle
    } = this.props

    return(
      <View
        style={{
          flex: 1,
          // backgroundColor: 'blue'

        }}
      >
        <View
          onLayout={this.props.onVideoLayout}
          style={{
            height: this.props.isFullScreen ? null : 240,
            justifyContent: 'center',
            alignItems: 'center',
            shadowOpacity: 0.35,
            shadowRadius: 5,
            shadowColor: '#333',
            shadowOffset: { height: 10, width: 0 },
            // TODO: 部分机型不显示阴影
            elevation: 5,
            // borderRadius: 10,
          }}
        >
          {
            this.props.isFullScreen ?
              <TouchableOpacity
                onPress={this.props.onQuitFullScreen}
                style={{
                  // backgroundColor: 'red',
                  height: 60,
                  width: 60,
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  zIndex: 100,
                }}
              >
                <Image
                  source={ require('../../assets/icon/fullscreen_close.png') }
                  style={{
                    opacity: 0.4,
                    width: 30,
                    height: 30
                  }}
                />
              </TouchableOpacity>
              : null
          }
          <Video
            ref={(ref) => {
              this.player = ref
            }}
            source={{ uri: mediaURL }}
            resizeMode="cover"
            paused={ this.props.paused }
            onBuffer={() => {
              // console.log('正在缓冲，请给我一个加载页面')
            }}
            onLoadStart={() => {
              // console.log('媒体正在开始加载 ......')
            }}
            onLoad={() => {
              // console.log('媒体加载结束？ ......')
            }}
            onProgress={(process) => {
              this.props.onProgress(process)
            }}
            style={{
              // height: 200,
              // width: Layout.window.width - 30,

              height: this.props.videoHeight,
              width: this.props.videoWidth
            }}
          />
        </View>
        {/* 全屏 */}
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => {
            this.props.onFullScreen()
          }}
        >
          <Text style={{ textAlign: 'right' }}> 全屏 </Text>
        </TouchableOpacity>
        {
          this.props.isFullScreen ? null :
            <View>
              {/* 章节标题 */}
              <View style={ styles.chapterTitleContainer }>
                <Text style={ styles.chapterTitleText }> {chapterTitle} </Text>
              </View>
              {/* 所属课程 */}
              <View style={ styles.courseTitleContainer }>
                <Text style={ styles.courseTitleText }> {courseTitle} </Text>
              </View>
            </View>
        }
        {/* 测试全屏,安卓无法全屏 */}
        {/*
        <TouchableOpacity
          onPress={() => {
            console.log('=====>>>>>全屏', );
            this.player.presentFullscreenPlayer()
          }}
        >
          <Text>
            测试全屏
          </Text>
        </TouchableOpacity>
        */}
      </View>
    )
  }
}

const styles = StyleSheet.create({

  /*
  panelInnerContainer: {
    // height: 240,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowColor: '#333',
    shadowOffset: { height: 10, width: 0 },
    // TODO: 暂时不知道为什么安卓不显示阴影
    elevation: 5,
  },
  */

  mediaCover: {
    borderRadius: 4,
    width: Layout.window.width - 60,
    height: 200,

  },
  chapterTitleContainer: {
    marginTop: 20,
  },
  chapterTitleText: {
    fontSize: Font.large,
    color: Color.medium,
    textAlign: 'center'
  },
  courseTitleContainer: {
    marginTop: 10
  },
  courseTitleText: {
    fontSize: Font.small,
    color: Color.grey,
    textAlign: 'center'
  },


})

export default PlayerScreen;
