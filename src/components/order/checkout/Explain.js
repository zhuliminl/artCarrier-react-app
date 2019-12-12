
/*
 * Created by Saul at 2018/06/11
 *
 * 因使用优惠券或者积分所产生的解释信息
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

class Explain extends React.Component {

  render() {
    const {
      fromPoint,
      fromCoupon
    } = this.props
    return(
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 5,
          backgroundColor: Color.white,
        }}
      >
        {
          fromCoupon !== "" && (
            <View>
              <Text>
                {fromCoupon}
              </Text>
            </View>
          )
        }
        {
          fromPoint !== "" && (
            <View>
              <Text>
                {fromPoint}
              </Text>
            </View>
          )
        }
      </View>
    )
  }
}

export default Explain;
