/*
 * Created by Saul at 2018/06/26
 *
 * 待评价订单
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import { Color, Font } from '../../../constants'

class UnCommentOrder extends React.Component {

  render() {
    return(
      <View>
        <TouchableOpacity
          onPress={() => {
            const { navigation } = this.props
            navigation.navigate('OrderComment')
          }}
        >
          <Text>
            待评价
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default UnCommentOrder;
