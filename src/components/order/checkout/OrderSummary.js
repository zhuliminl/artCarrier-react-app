
/*
 * Created by Saul at 2018/06/11
 *
 * 订单小结
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

class OrderSummary extends React.Component {

  render() {
    return(
      <View
        style={{
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
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
          订单小结
        </Text>
        <Text
          style={{
            color: Color.primary,
          }}
        >
          {this.props.priceAmount}￥
        </Text>
      </View>
    )
  }
}

export default OrderSummary;
