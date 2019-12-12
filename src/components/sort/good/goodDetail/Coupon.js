/*
 * Created by Saul at 2018/07/12
 *
 * 优惠券相关规则
 *
 */

import React from 'react';
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import {
  Font,
  Color,
  Space,
  Layout,
} from '../../../../constants';

class Coupon extends React.Component {

  render() {
    const { templateBase } = this.props
    return(
      <View
        style={{
          borderTopWidth: 0.5,
          borderColor: '#DDD',
          paddingVertical: 10,
          flexDirection: 'row',
        }}
      >
        <Text style={{ flex: 1, }}>
          是否允许使用优惠券
        </Text>
        <Text style={{ color: Color.grey, marginRight: 10, }}>
          {
            templateBase.is_use_coupon ? '允许' : '不允许'
          }
        </Text>
      </View>
    )
  }
}

export default Coupon;
