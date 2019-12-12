/*
 * Created by Saul at 2018/06/07
 *
 * 播放时间展示
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

class TimeDisplay extends React.Component {
  static defaultProps = {
    currentTime: '',
    duration: ''
  }

  render() {
    return(
      <View style={ styles.timeContainer }>
        <View style={ styles.timeCurrentContainer }>
          <Text style={ styles.timeText }>
            { this.props.currentTime }
          </Text>
        </View>
        <View style={ styles.timeDurationContainer }>
          <Text style={ styles.timeText }>
            { this.props.duration }
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  timeContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row'
  },
  timeCurrentContainer: {
    flex: 1
  },
  timeText: {
    color: Color.grey,
    fontSize: Font.tiny
  },
})

export default TimeDisplay;
