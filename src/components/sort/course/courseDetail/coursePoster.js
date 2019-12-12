/*
 * Created by Saul at 2018/05/29
 *
 * 课程详情的海报
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Color, Layout, Font } from '../../../../constants'
import LinearGradient from 'react-native-linear-gradient';

class CoursePoster extends React.Component {

  render() {
    return(
      <View>
        <ImageBackground
          source={{ uri: this.props.coursePosterURL } }
          style={ styles.posterContainer }
        >
          {/* 标题内容 */}
            <View style={ styles.courseTitleContainer }>
              <Text
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={ styles.courseTitleText }
              >
                { this.props.courseTitle }
              </Text>
            </View>
            {/* 渐变遮罩层 */}
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0,0,0, 100)']}
              style={styles.linearGradient}
            >
            </LinearGradient>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  linearGradient: {
      opacity: 0.8,
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
	},

  posterContainer: {
    width: Layout.window.width,
    height: Layout.window.height / 3,
  },
  courseTitleContainer: {
    zIndex: 100,
    position: 'absolute',
    bottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  courseTitleText: {
    fontSize: 20,
    color: Color.white
  }
})

export default CoursePoster;
