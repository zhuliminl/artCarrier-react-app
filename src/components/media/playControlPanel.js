/*
 * Created by Saul at 2018/06/07
 *
 * 播放控制面板
 *
 */

import React from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Animated,
  Easing
} from 'react-native'
import { Layout, Color, GlobalStyle, Font } from '../../constants'

class PlayControlPanel extends React.Component {
  static defaultProps = {
    onPause: () => {},
    onNext: () => {},
    onPrevious: () => {}
  }

  render() {
    const {
      paused,
      onPause,
      onNext,
      onPrevious
    } = this.props
    return(
      <View style={ styles.playControlContainer }>
        {/* 上一个轨迹 */}
        <TouchableOpacity
          onPress={() => {
            onPrevious()
          }}
          style={ styles.previousTrackButton }
        >
          <Image
            style={{
              width: 30,
              height: 30
            }}
            source={ require('../../assets/icon/media/previous_track.png') }
          />
        </TouchableOpacity>
        {/* 当前播放 */}
        <TouchableOpacity
          onPress={() => {
            onPause()
          }}
          style={ styles.pausedButton }
        >
          <Image
            style={{
              width: 60,
              height: 60
            }}
            source={
              paused ?
                  require('../../assets/icon/media/paused_red.png')
                : require('../../assets/icon/media/playing_red.png')
            }
          />
        </TouchableOpacity>
        {/* 下一个轨迹 */}
        <TouchableOpacity
          onPress={() => {
            onNext()
          }}
          style={ styles.previousTrackButton }
        >
          <Image
            style={{
              width: 30,
              height: 30
            }}
            source={ require('../../assets/icon/media/next_track.png') }
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  playControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 50,
  },
  pausedButton: {
    marginHorizontal: 20
  }
})


export default PlayControlPanel;
