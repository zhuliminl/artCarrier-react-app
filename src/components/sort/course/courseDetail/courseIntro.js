/*
 * Created by Saul at 2018/05/29
 *
 * 课程详情的简介
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Layout } from '../../../../constants'
import HTML from 'react-native-render-html'


class CourseIntro extends React.Component {

  render() {
    // console.log('course Intro', this.props)
    const data = this.props.data || {}
    const detailRTF = data.detailRTF || {}

    return(
      <View styles={{ flex: 1 }}>
        <HTML
          html={ detailRTF }
          imagesMaxWidth={ Layout.window.width }
          ignoredStyles={['display',]}
        />
      </View>
    )
  }
}

export default CourseIntro;
