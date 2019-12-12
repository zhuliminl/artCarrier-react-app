/*
 * Created by Saul at 2018/06/11
 *
 * 运费
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
  Animated,
  Easing,
  AlertIOS,
  Platform,
  Text,
  Alert
} from 'react-native'
import { Color, Font, Layout } from '../../../constants'

class Freight extends React.Component {

  render() {
    return(
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 5,
          backgroundColor: Color.white,
        }}
      >
        <Text
          style={{
            flex: 1,
          }}
        >
          运费
        </Text>
        <Text>
          {this.props.freightAmount}￥
        </Text>
      </View>
    )
  }
}

export default Freight;
